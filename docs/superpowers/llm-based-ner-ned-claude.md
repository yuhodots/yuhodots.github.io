# 최신 LLM 기반 NER / NED 방법론: Find → Link → Add 파이프라인 관점의 실무 리서치 도시어

> 이 문서는 "문서에서 엔티티를 발굴하고(NER), 지식베이스의 기존 id에 연결하고(NED / entity linking), 매칭에 실패하면 새 엔티티를 추가하는(NIL detection / KB population)" 세 단계 파이프라인을 축으로, 2020년대 LLM 시대의 NER/NED 방법론을 실무 구현 관점에서 정리한 내부 리서치 노트다. 핵심 결론을 먼저 말하면 다음과 같다. (1) 인도메인 뉴스 벤치마크에서는 여전히 특화 모델(supervised encoder, GLiNER 같은 encoder span 모델)이 천장을 잡고 있고, frontier LLM 프롬프팅은 zero/few-shot·long-tail·라벨 없는 상황에서 빛난다. (2) LLM에게 character offset을 JSON으로 뱉으라고 하면 성능이 붕괴하므로(약 90 F1 → 약 29 F1), inline marker 혹은 surface string으로 받고 offset은 후처리에서 결정론적 string match로 복원해야 한다. (3) entity linking에서 raw LLM은 candidate 제약이나 retrieval 없이 canonical KB id를 신뢰성 있게 생성하지 못하므로, generative(GENRE 류 trie 제약) 혹은 retrieve-then-rerank(BLINK 류) 위에 LLM을 "어려운 케이스 라우팅/문맥 증강" 용도로 얹는 하이브리드가 실무의 지배적 패턴이다. (4) "새 엔티티 추가"는 별도 모듈이 아니라, link에 실패한 mention에 대해 적용하는 entity resolution / canonicalization 그 자체다.

---

### 1. 시작하는 글과 문제 정의

##### NER / NED 란 무엇인가

엔티티 인식(named entity recognition, NER)은 텍스트에서 사람·조직·장소·날짜 같은 의미 단위(엔티티 멘션, mention)의 경계(span)와 타입(type)을 찾아내는 작업이다. 엔티티 명확화(named entity disambiguation, NED) 혹은 엔티티 연결(entity linking, EL)은 그렇게 찾아낸 멘션을 지식베이스(knowledge base, KB)의 특정 엔티티 id에 결박하는 작업이다. 예를 들어 "Columbus"라는 멘션은 NER 단계에서 `LOC` 혹은 `PER`로 분류되고, NED 단계에서 Wikidata의 `Q16567`(오하이오주 콜럼버스 시) 또는 `Q7195`(크리스토퍼 콜럼버스) 같은 구체적 id로 연결된다.

##### Find → Link → Add: 본 문서의 중심 서사

실무에서 지식베이스를 텍스트로부터 채우는(KB population) 전체 파이프라인은 세 가지 연산으로 분해된다. 이 문서는 전적으로 이 세 연산을 축으로 구성되며, 개별 방법론은 해당 연산 아래에 배치한다.

```
(1) FIND   문서에서 엔티티 발굴 (NER)
            └ 멘션 span 검출 + 타입 분류
(2) LINK   KB의 기존 엔티티 id에 연결 (NED / Entity Linking)
            └ candidate generation → disambiguation
(3) ADD    매칭 실패 시 새 엔티티를 DB에 추가
            ├ DECIDE-NEW : NIL / out-of-KB 검출
            └ ADD        : canonicalization + 중복 없이 삽입 (entity resolution)
```

엔지니어 관점에서 가장 중요한 통찰은, "새 엔티티를 중복 없이 추가한다"는 것이 EL에 덧붙는 별개의 모듈이 아니라, **link에 실패한 멘션에 적용하는 entity resolution / canonicalization 그 자체**라는 점이다. 그래서 현장의 파이프라인은 사실 3단계가 아니라 4단계로 보는 편이 정확하다: FIND → LINK → DECIDE-NEW → ADD.

##### 왜 중요한가: 지식그래프 / RAG / 검색

이 파이프라인은 (a) 지식그래프(knowledge graph) 구축, (b) 검색 증강 생성(retrieval-augmented generation, RAG)에서 엔티티 단위로 근거를 결박해 환각을 줄이는 grounding, (c) 엔티티 기반 검색/추천의 공통 기반이다. 특히 GraphRAG처럼 그래프 구조를 활용한 RAG가 부상하면서, "텍스트 → 엔티티 → id → 그래프 트리플"로 이어지는 이 파이프라인의 각 단계 품질이 곧 다운스트림 시스템 품질을 좌우하게 됐다.

---

### 2. 과거에는 어떻게 했나 (대비용)

LLM 이전의 표준 파이프라인은 **단계화된 지도학습 컴포넌트의 연쇄**였다. NER 쪽은 손으로 만든 피처를 점진적으로 제거해온 역사이고, EL 쪽은 candidate generation → collective disambiguation의 2단계였다.

##### NER 계보: 피처 엔지니어링의 점진적 제거

| 방법 | 연도 | 아키텍처 | 핵심 | 한계 |
|------|------|----------|------|------|
| POS tagging (Stanford/Toutanova) | 2003 | feature-rich log-linear (maxent) | 품사·청크 경계를 NER의 입력 피처로 제공 | 고정 tagset, 오류가 다운스트림 전파, 도메인 이동에 취약 |
| Rule/Gazetteer (spaCy EntityRuler 등) | 2019* | 수작업 패턴 + 사전 lookup | 사전·정규식·shape 매칭, 학습 데이터 0 | 미관측 엔티티 일반화 불가, 유지보수가 스케일 안 됨 |
| Linear-chain CRF (Stanford NER) | 2005 | feature-engineered CRF + Viterbi | BIO 태그 시퀀스를 전역 일관성으로 디코딩 | 수작업 피처, 라벨셋 고정, 도메인 이동 시 성능 저하 |
| BiLSTM-CRF (Lample et al.) | 2016 | BiLSTM encoder + CRF | char-LSTM로 형태소/대소문자 포착, 피처 제거 | 라벨링 데이터 필요, 라벨셋 고정, 장거리 문맥 약함 |
| BERT fine-tuned NER | 2019 | Transformer encoder + token-classification head | 문맥 self-attention, 지도학습 천장 (CoNLL-2003 test F1 약 91.3) | 라벨셋이 fine-tune 시점에 고정, 도메인별 라벨링 필요 |

(*spaCy EntityRuler 컴포넌트는 spaCy v2.1(2019-03) 도입분. rule/gazetteer NER 기법 자체는 1990년대 MUC 시대로 거슬러 올라간다.)

이 계보의 공통 한계는 명확하다: **라벨셋이 학습 시점에 고정**되고, **대규모 라벨링 코퍼스에 의존**하며, **새 도메인/엔티티로의 전이가 취약**하고, **다단계 파이프라인이 오류를 전파**한다. LLM 기반 NER이 정확히 이 네 가지를 겨냥한다(지시 추종, zero/few-shot, open 라벨셋, 추출·연결 통합).

##### 고전 Entity Linking: 사전 spotting + collective disambiguation

| 시스템 | 연도 | KB | 메커니즘 | 한계 |
|--------|------|-----|----------|------|
| [TagMe](https://arxiv.org/abs/1006.3498) | 2010 | Wikipedia | anchor-text 사전으로 멘션 spotting, Wikipedia 링크그래프 relatedness 투표 + commonness prior로 collective disambiguation | 짧은 텍스트 특화, novel surface form 누락, out-of-KB 불가 |
| [DBpedia Spotlight](https://www.dbpedia-spotlight.org/) | 2011 | DBpedia | spot → select → disambiguate(문맥 유사도) → filter 4단계 REST | DBpedia 커버리지/스냅샷에 종속, over-linking |
| [AIDA](https://aclanthology.org/D11-1072/) | 2011 | YAGO2 | mention-entity 그래프에 prior + 문맥 유사도 + entity coherence를 dense-subgraph로 jointly 최적화 | YAGO/Wikipedia 한정, 그래프 최적화 지연, 상류 NER 오류 전파 |
| [Wikifier (JSI)](https://wikifier.org/info.html) | 2017 | Wikipedia/WikiData | anchor 매칭 + cosine 유사도 + PageRank 중요도 + entropy 휴리스틱, cross-lingual | Wikipedia 커버리지 한정, 휴리스틱 ambiguity 필터가 valid 멘션 누락 (UIUC Wikifier와 혼동 주의) |

##### 고전과 LLM 시대를 잇는 다리: BLINK와 GENRE

두 방법은 "고전 baseline"이면서 동시에 현대 EL의 두 패러다임(dense retrieval, generative)을 선구한 다리다. 자세한 메커니즘은 §4에서 다루지만, 위치를 미리 잡아두면 다음과 같다.

- [BLINK](https://aclanthology.org/2020.emnlp-main.519/) (Wu et al., EMNLP 2020): BERT bi-encoder로 엔티티 description을 dense 임베딩해 FAISS로 retrieval하고, cross-encoder로 rerank. 엔티티를 free-text description으로 표현하므로 미관측 엔티티에도 **zero-shot** 연결 가능 → 오늘날 RAG식 EL이 물려받은 dense retrieval 아이디어의 원형.
- [GENRE](https://arxiv.org/abs/2010.00904) (De Cao et al., ICLR 2021): EL을 entity 이름의 autoregressive 생성으로 재정의하고 prefix-trie로 제약 디코딩 → LLM 기반 EL의 generative/constrained-decoding 아이디어의 직접적 조상.

LLM으로 넘어가며 얻는 것은 유연성과 데이터 효율성이고, 잃는 것은 고전 스택의 값싼 CPU 지연·결정론·감사 가능성·하드 유효성 보장(trie/gazetteer-exact)이다. 그래서 실무에서는 규칙·사전 + constrained decoding + dense retrieval을 섞은 **하이브리드**가 여전히 흔하다.

---

### 3. (1) 엔티티 발굴 — LLM 기반 NER

NER을 LLM으로 한다는 것은 본질적으로 **시퀀스 라벨링 문제를 텍스트 생성 문제로 바꾸는 것**이며, 그 변환이 도입하는 실패 모드(환각, span offset 붕괴)와 싸우는 일이다. 먼저 가장 중요한 두 가지 엔지니어링 규칙을 못 박는다.

##### 가장 중요한 규칙 두 가지

1. **LLM에게 character offset을 요구하지 마라.** [Assessment of Generative NER (arXiv:2601.17898, 2026)](https://arxiv.org/abs/2601.17898)는 PEFT 튜닝된 open decoder LLM(LLaMA3.1-8B, Qwen2.5-7B 등)에서 출력 포맷을 비교했다. 이 논문이 실제로 테스트한 다섯 포맷은 **Inline Bracketed, Inline XML, Category-grouped JSON, Occurrence-based JSON, Offset-based JSON**이다. offset-based JSON은 약 29.66 F1로 붕괴하는 반면 inline bracketed는 약 90.69 F1로, 약 61점 격차가 난다. 이유는 "정밀한 character-offset 계산은 LLM의 텍스트 생성 본성에 맞지 않기" 때문이다. 따라서 신뢰 가능한 레시피는 **엔티티를 inline marker 혹은 surface string으로 받고, offset은 후처리에서 결정론적 string search로 복원**하는 것이다. (동일 문자열이 두 번 나타나는 중복 케이스는 명시적으로 처리해야 한다.)

2. **라벨 드리프트의 정체는 대부분 경계 오류가 아니라 wrong-TYPE 오류다.** 같은 Assessment 논문에서 LLM 오류의 38.2%가 wrong-type으로, 가장 큰 오류 범주였다. 원인은 "모델의 강한 사전학습 prior와 데이터셋 주석 가이드라인 간 충돌"이다. 처방은 경계 보정이 아니라, **프롬프트에 데이터셋별 타입 정의/가이드라인을 명시**하는 것이다.
   > 주의: 이 38.2% 수치는 오직 Assessment 논문(2601.17898)에 한정된다. 별개 논문인 Xie et al.(EMNLP 2023, 아래 zero-shot 항목)의 OntoNotes 4 오류 분석에서는 wrong-type이 24.32%이고 가장 큰 범주는 Completely-O가 56.90%다 — 두 논문의 수치를 섞으면 안 된다.

또한 같은 논문에서 LLaMA3.1-8B는 **inline bracketed 포맷**으로 CoNLL-2003 93.85 / OntoNotes 5.0 91.28 F1을 기록해 BERT-MRC(93.04 / 91.11)를 일반 도메인에서 능가했다. (inline XML로는 93.83 / 90.94. 논문 본문 산문이 이 수치를 한 곳에서 "inline XML"로 잘못 라벨링하지만, 표 기준 93.85/91.28은 inline-bracketed임에 주의.)

##### 프롬프팅 / In-Context Learning 방법론

**GPT-NER** — [arXiv:2304.10428](https://arxiv.org/abs/2304.10428) (2023). 아키텍처: prompt/in-context (decoder LLM) + hybrid retrieval. 시퀀스 라벨링을 생성으로 재구성한다. 문장과 하나의 타입을 주면 LLM이 문장을 다시 쓰면서 inline marker를 삽입한다.

```
입력 : Columbus is a city
출력 : @@Columbus## is a city      # @@ ## 가 해당 타입 엔티티를 감쌈
```

few-shot 데모는 entity-level kNN retriever로 선택한다. fine-tune된 NER 태깅 모델의 토큰 표현으로 datastore를 만들고, candidate 토큰이 이를 질의해 top-k 최근접 토큰에 붙은 문장을 데모로 쓴다(SimCSE 문장 단위 retrieval보다 우수 — 전체적으로 유사한 문장이 정작 관련 엔티티를 안 담을 수 있기 때문). 마지막에 self-verification으로 환각을 거른다: 추출된 각 span마다 "이 문장에서 단어 X는 {type} 엔티티인가? yes/no".

- **실무 비용(중요):** 백본은 GPT-3 text-davinci-003, temperature 0. **타입마다 별도 프롬프트**를 발행한다 — N-타입 스키마면 문장당 N번 호출 + candidate span당 verification 1회 추가. 18-타입 스키마에 verification까지면 문장당 18+ 호출이 된다. 데모는 최대 32-shot 이상으로 4096 토큰 창을 채운다. 출력은 `@@...##` 정규식으로 파싱하고 string search로 offset 복원.
- **강점:** 표준 영어 NER에서 fully-supervised baseline에 처음 도달한 프롬프팅 방법(CoNLL2003 90.91, OntoNotes5.0 82.20). inline-marker 출력으로 offset 산술 회피.
- **한계:** 타입당 fan-out + candidate당 verification으로 고비용·고지연. datastore 구축에 fine-tune된 encoder NER 모델 필요(순수 zero-shot 아님). self-verification은 1라운드 후처리에 그침.

**PromptNER** — [arXiv:2305.15444](https://arxiv.org/abs/2305.15444) (2023). 아키텍처: prompt/in-context (decoder LLM) + definition-guided CoT. few-shot 예시에 더해 자연어 **엔티티 타입 정의**를 요구한다. LLM은 candidate 엔티티 목록을 출력하되 각 줄에 (candidate, True/False 판정, 정의 부합 여부 설명)을 담는다(candidate별 chain-of-thought). ablation에서 설명(CoT) 제거 시 F1이 크게 떨어지므로 정당화는 장식이 아니라 load-bearing이다.

- **실무:** T5-Flan-11B(약함), GPT-3.5/text-davinci-003(강함), GPT-4(최강). 타입 정의 + 소수 예시를 작성하면 모델이 줄 단위 파싱 가능한 번호 목록을 반환하고, decision이 True인 줄이 최종 엔티티. 문장당 단일 호출(GPT-NER 같은 타입별 fan-out 없음)이나 candidate별 설명으로 출력 토큰이 늘어난다.
- **한계:** 손으로 쓴 타입 정의·예시 선택에 품질이 좌우됨. 모델 의존성 강함. full-data flat NER에서 GPT-3.5/4 절대 F1(예: CoNLL 약 78.6/83.5)은 여전히 supervised SOTA 아래.
- **혼동 주의:** 이름이 비슷한 Shen et al.의 'Prompt Locating and Typing for NER'([arXiv 2305.17104](https://arxiv.org/abs/2305.17104))와는 다른 논문이다.

**Zero-Shot NER with ChatGPT (Xie et al.)** — [arXiv:2310.10035](https://arxiv.org/abs/2310.10035), EMNLP 2023, [코드](https://github.com/Emma1066/Zero-Shot-NER-with-ChatGPT). 아키텍처: prompt/in-context (decoder LLM), zero-shot. 세 가지 적층 전술: (1) **Decomposed-QA** — 라벨당 하나의 서브문제로 분해해 한 번에 한 타입만 추출. (2) **Syntactic augmentation** — 모델이 먼저 구문 구조를 분석한 뒤 태깅하거나(syntactic prompting), HanLP 파서 출력(분절·POS·구성/의존 트리)을 주입(tool augmentation). (3) **Self-consistency**를 NER에 맞춘 2단계 다수결 — 여러 응답을 샘플링해 먼저 가장 일관된 mention을, 다음으로 가장 일관된 type을 투표.

- **실무:** ChatGPT(gpt-3.5-turbo급). **비용:** decomposed-QA가 라벨 수만큼 호출을 곱하고, self-consistency가 샘플 수만큼 다시 곱한다(예: 라벨 × 샘플 호출/문장). tool augmentation은 외부 파서(HanLP) 의존.
- **한계:** fan-out × self-consistency = 고비용/고지연. zero-shot 정확도는 여전히 supervised·few-shot ICL 아래. 라벨별 출력 병합 시 overlap/conflict 조정 필요.

**NER4all (context-rich prompting)** — [arXiv:2502.04351](https://arxiv.org/abs/2502.04351) (2025). 아키텍처: prompt/in-context. frontier LLM(GPT-4o, 'gpt4o-2024-08-06')에 persona + 역사적 문맥이 풍부한 지시를 주어 학습 없이 NER. 핵심 주장: 자연어로 제공된 도메인 문맥이 태스크별 학습을 대체하고, 소비자용 프론트엔드가 스크립팅/ML 스킬 요구를 없앤다.

- **실무:** 코드 스택 불필요 — 소비자용 LLM 프론트엔드의 자연어 프롬프트. 주석자/도메인 전문가(예: 역사학자)가 프로그래밍을 모르고, 타입 공간이 맞춤형이며, 볼륨이 낮아 호출당 API 비용을 감당할 수 있을 때 실용적.
- **결과:** 역사 텍스트 NER에서 GPT-4o가 Flair(F1 0.81→0.87, +7%)와 spaCy(0.50→0.87, +22%)를 능가. 단일 모델(GPT-4o)만 테스트됨.
- **한계:** 고볼륨에서 frontier-LLM API 비용/지연 경제성 나쁨. 프롬프트 장인성에 품질 의존, 호스팅 모델 버저닝 약함. 생성 span은 여전히 source offset 재정렬 필요.

##### 특화 모델 — encoder span 계열 (생성 LLM과 명확히 구분할 것)

여기서 가장 흔한 혼동을 못 박는다. **GLiNER 계열은 encoder-only span/token matcher이지 생성 디코더 LLM이 아니다.** 양방향 transformer encoder로 텍스트와 라벨을 같은 잠재공간에 임베딩하고, span 임베딩 대 label 임베딩 매칭으로 **병렬** 스코어링한다(autoregressive 디코딩 없음). 이것이 LLM 프롬프팅 대비 근본적으로 빠른 이유다.

**GLiNER** — [arXiv:2311.08526](https://arxiv.org/abs/2311.08526) / [NAACL 2024](https://aclanthology.org/2024.naacl-long.300/), [GitHub](https://github.com/urchade/GLiNER) (2023/2024). 아키텍처: **encoder-only span**. 추론 시 자연어 라벨을 주므로 고정 라벨셋 없는 open-type zero-shot NER.

```python
# pip install gliner
from gliner import GLiNER
model = GLiNER.from_pretrained("urchade/gliner_medium-v2.1")
ents = model.predict_entities(
    text, labels=["Person", "Award", "Date"], threshold=0.5
)  # [{'text': ..., 'label': ..., 'start': ..., 'end': ...}, ...]
```

- **실무:** HuggingFace `urchade/` 네임스페이스에 small/medium/large. 파라미터는 공식 모델카드 기준 small 166M / base·medium·multi 209M / large 459M(흔히 인용되는 "50M–300M"은 부정확하며 어느 쪽이든 500M 미만). CPU/소비자 하드웨어에서 효율적 추론, Apache-2.0, 자체 라벨로 fine-tune 가능, ONNX export로 엣지 배포 가능.
- **강점:** 자연어 라벨로 임의 타입 zero-shot, 단일 패스 병렬 추출, **실제 character offset을 반환**해 LLM span 재정렬 문제 회피, zero-shot 벤치마크에서 ChatGPT 및 fine-tune LLM 능가 보고.
- **한계:** base 모델은 NER 전용(관계 추출 없음), entity linking/KB grounding 없음, span 변형은 엔티티 길이 상한·임계값 튜닝 필요, 추론/넓은 세계지식이 필요한 작업은 frontier LLM 아래.

**GLiNER2** — [arXiv:2507.18546](https://arxiv.org/abs/2507.18546) (2025). 아키텍처: **encoder-only span**. GLiNER encoder를 통합 멀티태스크 IE 시스템(205M)으로 확장 — NER + 텍스트 분류(single/multi-label) + 계층적/중첩 구조 추출을 단일 encoder에서 선언적 스키마 인터페이스(`field_name::type::description`)로 구성. CPU 효율성·병렬 추출 유지, CC-BY-4.0.

- **결과:** CrossNER zero-shot 전체 F1 0.590 vs GPT-4o 0.599(거의 동급). 단, 텍스트 분류는 GPT-4o 아래(평균 0.72 vs 0.84). entity linking 없음.

**GLiNER multi-task** — [arXiv:2406.12925](https://arxiv.org/abs/2406.12925) (2024-06). 아키텍처: **encoder-only span**. open NER + 관계 추출 + 요약 + QA + open IE를 동일 span/label 매칭 패러다임으로, 단일 encoder에 주는 라벨/프롬프트를 바꿔 처리. GLiNER2의 전신. `knowledgator` 네임스페이스에서 gliner 라이브러리로 로드. 현재는 GLiNER2의 깔끔한 스키마 인터페이스로 대체되는 추세.

**NuNER** — [arXiv:2402.15343](https://arxiv.org/html/2402.15343v1) (2024). 아키텍처: **encoder-only span**. RoBERTa-base 125M(또는 large 355M)을 LLM-주석 데이터로 contrastive 사전학습(GPT-3.5가 약 1M C4 문장 라벨링 → 4.38M 엔티티 주석, 약 200k 고유 concept). **결정적으로 zero-shot이 아니다** — fine-tune을 전제로 한 concept-agnostic 표현 모델이며 BERT/RoBERTa의 drop-in 대체재다.

- **실무:** 사전학습 text encoder에 linear head를 붙여 타입당 1–64개 예시로 few-shot fine-tune. HuggingFace `numind/NuNER-v1.0`, `v2.0`. Few-NERD에서 SOTA, 125M–355M로 UniversalNER 7B–13B와 비슷한 전이(약 56× 작음) 주장.

**NuNER Zero** — [HuggingFace 모델카드](https://huggingface.co/numind/NuNER_Zero) (2024). 아키텍처: **encoder-only span**. GLiNER 아키텍처를 쓰되 span classifier가 아니라 **token classifier**여서 임의로 긴 엔티티 검출 가능. 진짜 zero-shot. NuNER 항목과 혼동 금지(NuNER=fine-tune 필요, NuNER Zero=zero-shot).

```python
# pip install gliner==0.1.12
from gliner import GLiNER
model = GLiNER.from_pretrained("numind/NuNerZero")
labels = [l.lower() for l in labels]  # 반드시 소문자화 — 안 하면 성능 저하
ents = model.predict_entities(text, labels)
```

- **변형:** NuNER Zero 4k(4k 토큰 long context, 약간 약함), [NuNER Zero-span](https://huggingface.co/numind/NuNER_Zero-span)(span 버전, 미세하게 우수하나 12 토큰 초과 엔티티 검출 불가). MIT. gliner_large-v2.1 대비 token-level F1 +3.1% 보고.

##### 특화 모델 — 생성/디코더 LLM 계열 (소형 distilled)

**UniversalNER (UniNER)** — [arXiv:2308.03279](https://arxiv.org/html/2308.03279v2) / ICLR 2024, [프로젝트](https://universal-ner.github.io/) (2023). 아키텍처: **generative/decoder-LLM**. ChatGPT를 LLaMA 7B/13B로 targeted distillation — ChatGPT가 Pile에서 약 50k 패시지를 라벨링해 45,889 input-output 쌍 / 240,725 엔티티 / 13,020 고유 타입을 만들고, 이를 대화형 instruction-tuning으로 LLaMA에 학습. 추론은 타입마다 "What describes {entity type} in the text?"로 질의하고 모델이 매칭 surface string의 JSON 리스트를 반환. 학습 시 negative sampling(부재 타입 질의에 `[]` 기대)으로 over-prediction 억제.

- **실무적 핵심 장점(API 대비):** 단일 로컬 fine-tuned 모델, 토큰당 API 비용 없음, 완전 self-host. 단 7B/13B이므로 GPU 권장(GLiNER과 달리). 타입당 한 번씩 디코드 패스가 필요(autoregressive). 출력 JSON 리스트는 offset 없음 → string search로 span 복원.
- **결과:** 43-데이터셋 벤치마크 zero-shot 평균 F1 UniNER-7B 41.7 / 13B 43.4 vs ChatGPT 34.9. Alpaca/Vicuna 대비 +30 F1 초과.
- **한계:** 대형 스키마는 여전히 타입당 fan-out, research-only 라이선스, ChatGPT teacher 편향 상속, surface-string 출력의 중복 모호성.

**NuExtract** — [NuMind 블로그](https://numind.ai/blog/nuextract-a-foundation-model-for-structured-extraction) / [GitHub](https://github.com/numindai/nuextract) (2024~). 아키텍처: **generative/decoder-LLM**. 스키마 기반 text-to-JSON 추출. 빈 JSON 템플릿(필드명 + 빈 값, `verbatim-string`/`date`/`number` 타입)과 문서를 주면 모델이 채운다. 원본(2024-06): tiny=Qwen1.5-0.5B, base=Phi-3-mini(3.8B), large=Phi-3-small(7B). NuExtract3로 진화: 4B vision-language reasoning 모델, image/PDF→Markdown, thinking/non-thinking 모드, vLLM OpenAI-호환 API, 최대 131,072 토큰 컨텍스트, 프롬프트당 최대 99 이미지. MIT.

- **강점:** template-in / JSON-out, 프롬프트 엔지니어링 불필요. tiny가 GPT-3.5 능가(약 100× 작음), large가 GPT-4o급 보고. NuExtract3는 vision + long context 추가.

**GNER (Generative NER)** — [GitHub](https://github.com/yyDing1/GNER) / [Findings of ACL 2024](https://aclanthology.org/2024.findings-acl.206/) / [arXiv:2402.16602](https://arxiv.org/abs/2402.16602) (2024). 아키텍처: **generative/decoder-LLM**. 생성 LLM을 fine-tune해 입력 텍스트에 inline 타입 태그를 붙여 출력하되, **negative instance(non-entity / O 라벨)를 생성 학습 타깃에 명시적으로 통합**해 미관측 타입/도메인 zero-shot 전이를 크게 개선. 백본은 Flan-T5(base 248M ~ xxl 11B)와 LLaMA-7B.

```python
# from transformers import AutoModelForCausalLM
# AutoModelForCausalLM.from_pretrained('dyyyyyyyy/GNER-LLaMA-7B')
# 출력 포맷: "word_1(label_1), word_2(label_2), ..."  → BIO 매핑
```

- **결과:** zero-shot 평균 약 66.1 F1(LLaMA-7B), 약 69.1 F1(T5-xxl). SoTA 대비 +8/+11 F1.
- **한계:** NER 전용(KB id 없음 → 별도 linking 필요), 전체 텍스트 생성이라 느리고 span 환각 가능.

##### 추론 기반 NER

**ReasoningNER (CoT + RL)** — [arXiv:2511.11978](https://arxiv.org/abs/2511.11978), AAAI 2026. 아키텍처: **generative/decoder-LLM**. 3단계: (1) DeepSeek-R1로 reasoning trace를 생성하고 구조적+의미적 일관성으로 필터링한 NER-CoT 데이터셋 구축, (2) 정답 전에 rationale를 출력하도록 SFT, (3) dual reward(entity F1 + schema adherence)로 GRPO 강화학습. "cognitive shortcutting"(추론 대신 패턴 매칭)을 겨냥.

- **결과(지도 설정, zero-shot 아님):** CoNLL-2003 94.4, OntoNotes 89.1(B2NER 92.6/84.3 대비). 1% 데이터 few-shot에서 CoNLL-2003 87.1.
- **한계:** CoT 데이터 생성 + RL 파이프라인이 무겁고, reasoning trace가 토큰/지연을 늘림. 논문 내 baseline/split이 달라 GPT-NER/GLiNER 수치와 직접 비교 불가.

##### structured output / constrained decoding (포맷 보장 레이어)

**Structured Output / Constrained Decoding** — [arXiv:2501.10868](https://arxiv.org/html/2501.10868v1) (2025). decoder LLM의 next-token 분포를 매 스텝 마스킹해 출력이 JSON 스키마/형식문법을 따르도록 강제한다. NER에서는 `[{text, type}, ...]` 같은 스키마를 정의. 여섯 프레임워크(Guidance, Outlines, Llamacpp, XGrammar — open; OpenAI, Gemini — closed) 벤치마크는 "constrained decoding이 프레임워크 무관하게 unconstrained 대비 더 높은 성능"을 내고 "unconstrained 대비 생성 50% 가속" 가능을 보고했다.

- **로컬:** Outlines/XGrammar via vLLM/SGLang/Ollama, Guidance·llama.cpp grammars. **클라우드:** OpenAI `response_format json_schema`(2024-08), Gemini `response_schema`. cross-provider 검증+재시도는 Instructor(Pydantic).
- **caveat:** 커버리지가 프레임워크별로 크게 다르고(최고가 최저의 2배 스키마 지원), Outlines는 복잡 스키마에서 40초+ 컴파일 오버헤드, XGrammar는 under-constrain(invalid 출력)할 수 있어 후처리 검증 여전히 필요.
- **NER-특화 함정:** character start/end **offset 필드를 요구하는 스키마는 성능이 형편없다** — surface string(또는 inline marker)을 선호하고 offset은 결정론적 string search로 복원하라.
> 정확성 단서: 인용된 단일 벤치마크 논문은 2025년 발표분이며, **NER이나 `{text,type}` 리스트 스키마를 직접 다루지 않고**(추론 태스크의 일반 JSON-Schema 제약을 평가) Instructor/Pydantic도 언급하지 않는다. 인용한 50% 가속·"프레임워크 무관 우위" 인용구는 정확하나, 그 위의 token-masking 메커니즘·Instructor-Pydantic 설명은 정확한 생태계 사실일 뿐 이 한 출처가 입증하는 것은 아니다.

##### spaCy-llm (NER 컴포넌트)

**spaCy-llm** — [docs](https://spacy.io/usage/large-language-models) / [GitHub](https://github.com/explosion/spacy-llm) (2023). LLM을 spaCy 파이프라인 컴포넌트로 래핑(`config.cfg`의 `[components.llm]`에 `@llm_tasks`로 `spacy.NER.v3`(CoT 사용) 지정). `generate_prompts()`가 Doc → 프롬프트, `parse_responses()`가 결과를 `doc.ents`로 기록. NED는 §4에서 다룬다. (참고: spacy-llm은 spaCy 코어로 "병합"되지 않으며, "향후 spaCy 버전에 자동 설치"되는 별도의 experimental 패키지로, minor 버전에서 breaking 변경 가능.)

##### LLM 기반 NER 방법 비교

| 방법 | 아키텍처 | zero-shot? | 호출/문장 | 배포 | offset 처리 |
|------|----------|-----------|-----------|------|-------------|
| GPT-NER | decoder + kNN retrieval | △ (datastore 필요) | N타입 + verification | API | inline marker → string search |
| PromptNER | decoder + CoT | ◯ (정의 작성) | 1 | API | list → string search |
| Xie et al. | decoder, zero-shot | ◯ | 라벨 × 샘플 | API | list 병합 |
| NER4all | decoder (GPT-4o) | ◯ | 1 | API | 생성 span 재정렬 |
| GLiNER / GLiNER2 | **encoder-only span** | ◯ | 1 (병렬) | **CPU** | **실제 offset 반환** |
| NuNER | encoder-only span | ✗ (fine-tune) | 1 | CPU | 실제 offset |
| NuNER Zero | encoder-only span (token) | ◯ | 1 | CPU | 실제 offset |
| UniversalNER | **generative/decoder** | ◯ | 타입당 1 | GPU | JSON string → search |
| NuExtract | generative/decoder | ◯ | 1 | GPU | template 채움 |
| GNER | generative/decoder | ◯ | 1 | GPU | inline 태그 → BIO |
| ReasoningNER | generative/decoder + RL | ✗ (지도/few-shot) | 1 (긴 CoT) | GPU | 생성 → 재정렬 |

---

### 4. (2) DB 연결 — LLM 기반 NED / Entity Linking

현대 EL은 **retrieve-then-rerank** 2단계 패턴이 지배적이고, 여기에 generative 패러다임과 LLM 증강 변형이 더해진다. 실무자가 실제로 구축하는 표준 파이프라인은 다음과 같다.

```
(2a) mention detection   : NER/span 모델 (spaCy, Flair, 또는 joint 모델의 자체 검출기)
(2b) candidate generation: alias/anchor 사전 lookup  ∪  dense bi-encoder retrieval (FAISS top-k)
(2c) disambiguation      : cross-encoder rerank  또는  LLM CoT over top-k (titles + descriptions)
(2d) NIL/threshold       : 점수 임계 또는 NIL candidate  → §5의 ADD 경로 트리거
```

##### Candidate generation — dense retrieval

**Dense-retrieval candidate generation (bi-encoder + ANN)** — [근거: BLINK, EMNLP 2020](https://aclanthology.org/2020.emnlp-main.519/). 아키텍처: dual-encoder/two-tower + ANN. (i) 각 KB 엔티티(이름 + description)와 (ii) 문맥 포함 멘션을 공유 임베딩 공간에 독립 인코딩. 엔티티 벡터는 오프라인 precompute해 FAISS/ANN 인덱스에 저장하고, 질의 시 멘션 벡터로 top-k를 inner-product/cosine으로 retrieval. 고전 alias/anchor 사전을 대체하거나 보강하는 high-recall 1단계.

- **실무:** BLINK bi-encoder, ReFinED description encoder, 또는 임의의 문장/패시지 encoder로 구현하고 FAISS로 인덱싱. **인덱스 선택이 핵심 손잡이:** `IndexFlatIP`=exact(스케일에서 느림), HNSW/IVF-PQ=approximate(sub-ms, 소폭 recall 손실). 실무 패턴: dense top-k와 alias 사전(Wikipedia anchor count)을 **union**해 인기 surface form 누락 방지. k(예: 10–100)는 recall vs rerank 비용으로 튜닝. description/KB 변경 시 re-embed·re-index.
- **강점:** 수천만 엔티티에서 ms급 retrieval, 새 엔티티는 description 임베딩 한 벡터 삽입으로 추가(zero-shot), 사전 매칭이 놓치는 패러프레이즈/문맥 포착.
- **한계:** sparse description의 long-tail recall 천장, approximate 인덱스의 recall-속도 트레이드오프, description 편집 시 stale → re-index, 단독으로는 under-disambiguate(rerank 필요).

##### Generative / Autoregressive EL

generative EL은 고정 임베딩 집합을 스코어링하거나(분류/bi-encoder) span을 추출하는(reader) 대신, encoder-decoder가 문맥을 **읽고** canonical entity 이름을 토큰 단위로 **생성**한다. 정의적 기교는 **prefix-trie constrained beam search**다.

```python
# HuggingFace 공통 패턴 (GENRE/mGENRE/GenIE)
# 1) 모든 canonical 이름을 모델과 동일한 BPE로 토큰화해 trie에 삽입 (보통 EOS 부착)
# 2) 디코드 시 콜백이 지금까지 토큰으로 trie를 걸어 valid 다음 토큰만 허용
model.generate(
    input_ids,
    num_beams=k,
    prefix_allowed_tokens_fn=lambda batch_id, sent: trie.get(sent.tolist()),
)
# 반환된 beam들이 곧 랭킹된 candidate
```

**GENRE** — [arXiv:2010.00904](https://arxiv.org/abs/2010.00904) / ICLR 2021, [GitHub](https://github.com/facebookresearch/GENRE). 아키텍처: **encoder-decoder (BART)**. 엔티티를 그 고유 canonical 이름(Wikipedia 제목)을 좌→우로 생성해 retrieval. trie로 제약해 실재하는 KB 엔티티만 생성. end-to-end EL은 입력을 inline markup으로 재생성. **제목이 곧 엔티티이므로 이름→id 변환이 직접적.**

- **강점:** 엔티티당 dense 벡터를 저장하는 bi-encoder 인덱스 대비 **메모리 발자국이 작음**(파라미터가 vocab에 비례, 엔티티 수가 아님). 멘션과 이름의 full cross-encoding. **새 엔티티는 trie에 이름만 추가하면 됨**(인덱스 재학습 불필요). 20+ 데이터셋에서 SOTA/경쟁력. KILT 페이지 retrieval에서 평균 +13.7 **R-precision** 포인트(average precision 아님에 주의).
- **한계:** autoregressive 디코딩이 단일 dot-product보다 느림(지연이 beam 폭·이름 길이에 비례), KB 변경 시 trie 재구축·재토큰화, gold 이름 생성이 어렵거나 near-duplicate 충돌 시 어려움(exposure bias), 영어/Wikipedia 중심.
- **라이선스 주의:** GENRE/mGENRE는 CC-BY-NC 4.0(non-commercial)이라 다수 제품에서 차단됨.

**mGENRE** — [TACL 2022](https://aclanthology.org/2022.tacl-1.16/) / [arXiv:2103.12528](https://arxiv.org/abs/2103.12528). 아키텍처: **encoder-decoder (mBART)**. 100+ 언어의 멘션에 대해 타깃 엔티티 이름을 생성하되 multilingual 이름 trie로 제약. 각 엔티티의 다국어 이름들이 하나의 Wikidata QID로 매핑되며, 디코딩된 (name, language) candidate를 name→QID 테이블로 해소하고 확률을 marginalize해 동치 이름들이 한 엔티티를 강화. zero-shot(미관측 언어)에서는 타깃 언어를 latent variable로 marginalize.

- **실무:** 동일 GENRE 레포. 큰 vector 인덱스 없이 대형 multilingual KB를 빠르게 검색. name↔QID 매핑 테이블 유지 필요.

**GenIE** — [arXiv:2112.08340](https://arxiv.org/abs/2112.08340) / NAACL 2022, [GitHub](https://github.com/epfl-dlab/GenIE). 아키텍처: **encoder-decoder (BART)**. closed IE의 첫 end-to-end autoregressive 정식화 — raw 텍스트를 읽고 (subject, relation, object) 트리플 집합을 텍스트 형태로 생성. **bi-level 제약:** high-level 구조 제약(유효 트리플 집합 디코드 보장) + low-level prefix trie 둘(엔티티 슬롯=valid KB 식별자만, relation 슬롯=valid relation 식별자만). 멘션→entity와 relation을 한 패스에 jointly 연결해 KG에 upsert할 트리플 산출. 단 사전정의 스키마에 한정(새 relation/entity는 trie 갱신 필요).

##### retrieve-then-rerank 및 joint EL

**BLINK** — [arXiv:1911.03814](https://arxiv.org/abs/1911.03814) / EMNLP 2020, [GitHub](https://github.com/facebookresearch/BLINK). 아키텍처: **retrieval+rerank**. Stage 1: bi-encoder가 멘션과 각 엔티티 description을 같은 dense 공간에 독립 임베딩, top-k를 NN 검색. Stage 2: cross-encoder가 멘션 문맥 + candidate description을 단일 BERT 입력에 concat해 jointly 스코어링. cross-encoder 정확도를 bi-encoder로 distill하면 'fast mode'.

- **실무:** 약 5.9M 엔티티 Wikipedia 덤프 위에 구축. `main_dense.py` 또는 라이브러리. 'fast mode'는 bi-encoder만. **전 엔티티 dense 인덱스 precompute·저장 필요**(generative가 회피하는 메모리 비용). EntQA·EntGPT의 candidate generator로 널리 재사용.
- **지연 단서(주의):** 초록의 "5.9M candidates in 2 ms"는 regime 미명시. 본문 5.2.3은 WikilinksNED에서 **exact 검색(FAISS IndexFlatIP) 9.2 ms/query**, approximate HNSW 1.4–2.6 ms/query를 보고. "2 ms"는 approximate HNSW에 가장 가깝지만 그렇게 라벨링되지 않았다 — 실제 사용하는 인덱스로 latency budget 확인할 것.
- **한계:** 좋은 description 필요, bi-encoder recall에 상한, cross-encoder rerank 지연, KB 변경 시 re-index.

**EntQA** — [arXiv:2110.02369](https://arxiv.org/abs/2110.02369), ICLR 2022. 아키텍처: retrieve-then-read(2단계의 두 번째는 cross-encoder reranker가 아니라 extractive reader). 통상의 mention-first 파이프라인을 QA식으로 뒤집는다: bi-encoder retriever가 KB에서 candidate 엔티티("질문")를 먼저 제안하고, cross-attention reader가 문서를 훑어 각 candidate에 "답하는" 멘션 span을 찾는다. **mention-candidate 사전이나 대규모 weak supervision 불필요.** BLINK retriever로 warm-start 가능. mention detection + disambiguation을 joint end-to-end로. 여전히 dense entity 인덱스 필요(메모리 비용), retrieve+read 2단계 지연.

**ReFinED** — [arXiv:2207.04108](https://arxiv.org/abs/2207.04108) / NAACL 2022 Industry, [GitHub](https://github.com/amazon-science/ReFinED). 아키텍처: **hybrid / encoder-only joint model (단일 transformer forward pass; retrieve+rerank 아님)**. 단일 transformer가 문서 전체를 처리해 mention detection + fine-grained typing(1000+ 타입) + disambiguation을 한 패스에 jointly 수행. 검출 멘션마다 (a) description bi-encoder 유사도 + (b) fine-grained type 호환성 + entity prior를 결합해 candidate 스코어링. per-candidate cross-encoder 패스가 없어 파이프라인 reranker보다 훨씬 빠름.

```python
from refined.inference.processor import Refined
refined = Refined.from_pretrained(model_name="wikipedia_model_with_numbers",
                                  entity_set="wikipedia")  # 약 6M, 또는 "wikidata" 약 33M
spans = refined.process_text("England won the FIFA World Cup in 1966.")
# Span: 멘션 텍스트, Wikidata ID + Wikipedia title, fine-grained types, top-k, 날짜 정규화
```

- **모델:** `wikipedia_model`(baseline), `wikipedia_model_with_numbers`(DATE/CARDINAL/MONEY/TIME 추가), `aida_model`(뉴스), `questions_model`(짧은 질문).
- **속도:** AIDA test(231 docs) V100 약 6.5s / T4 약 7.4s / CPU 약 29.7s. 경쟁 파이프라인 대비 60× 이상 빠름.
- **결과:** AIDA 약 87.4 F1, Wikipedia disambiguation 약 88.7 F1(baseline). LLMAEL·ARTER의 base linker로 흔히 사용.
- **한계:** 모듈식 retrieve+rerank 아님(custom reranker 교체 어려움), Wikidata set은 상당한 메모리, long-tail은 여전히 LLM 증강 이득.

##### LLM disambiguation / re-ranking (LLM을 linker가 아니라 헬퍼로)

2024–2025의 핵심 흐름은 LLM을 linker로 쓰지 않고, **어려운 케이스 라우팅** 또는 **문맥 증강**에 쓰는 것이다.

**EntGPT** — [arXiv:2402.06738](https://arxiv.org/html/2402.06738v1) (2024). 아키텍처: **prompt/in-context**. constrained decoding 없이 LLM을 KB에 연결. EntGPT-P(zero-shot 3단계): (1) prior + dense retrieval(BLINK)로 candidate 생성, (2) 프롬프팅으로 증강(멘션이 무엇을 가리키는지 LLM에 질의), (3) LLM이 candidate 집합에서 정답을 multiple-choice로 선택. EntGPT-I는 AIDA 유래 instruction/response 쌍으로 instruction-tune. 유효성은 trie가 아니라 retrieved candidate 목록 제한에서 나온다.

- **실무:** BLINK식 retrieval 후 candidate를 multiple-choice 프롬프트로 포맷. trie/특수 디코더 불필요 — 임의 chat/instruction LLM API. 비용 = candidate retrieval + 멘션당 1–2 LLM 호출. EntGPT-P가 vanilla GPT-3.5 대비 약 +7.0% micro-F1, EntGPT-I가 baseline 대비 약 +2.1% 보고.
- **한계:** 상류 candidate generator(BLINK)에 전적 의존(gold 미retrieval 시 실패), 멘션당 API 지연/비용, KB-id native 아님(candidate에서 선택).

**Fusion Entity Decoding** — [arXiv:2404.01626](https://arxiv.org/abs/2404.01626), NAACL 2024. 아키텍처: **retrieval+rerank**. GENRE의 토큰별 이름 spelling과 달리, candidate 엔티티(+ description)를 retrieval하고 fusion-in-decoder로 처리: encoder가 텍스트-candidate 상호작용으로 candidate별 표현을 만들고 decoder가 candidate 표현을 **fuse**해 정답 선택. 직관: 상세 description이 near-identical 이름을 구분하는 신호를 담는데, 순수 이름 생성은 이를 못 쓴다.

- **결과:** ZELDA에서 GENRE 대비 +1.5%, retriever/reader에 꽂으면 GERBIL end-to-end EL에서 EntQA 대비 +1.5% 보고. 이름 spelling 오류 모드 회피하나 candidate+description 다중 stream 인코딩으로 무거움, retriever recall에 종속.

**LLMAEL** — [arXiv:2407.04020](https://arxiv.org/abs/2407.04020) / CIKM 2025, [GitHub](https://github.com/THU-KEG/LLMAEL). 아키텍처: **hybrid**. 3단계: (1) 문맥 증강 — tuning-free LLM에게 원 문맥을 주고 멘션 중심 엔티티 description 생성, (2) 데이터 융합 — 생성된 description을 원 문맥에 concat(원문 멘션 offset 유지), (3) EL 실행 — 증강 문맥을 **변경하지 않은** 특화 EL 모델(BLINK/GENRE/ReFinED)에 투입. LLM은 long-tail 엔티티 세계지식을 공급할 뿐 linker 자체가 아님.

- **실무:** 기존 EL 모델에 볼트온 — 멘션당 LLM 1회 생성으로 추가 문맥 확보 후 concat, 평소대로 백본 실행. Llama-3-70b-Instruct/GPT-3.5-Turbo-Instruct/GLM-4 테스트. vanilla가 백본을 약 +1.2% 평균 개선, fine-tuned LLMAEL은 6 벤치마크 SOTA, ChatEL 같은 prior tuning-free-LLM EL 대비 약 +8.9% 보고.
- **한계:** 멘션당 LLM 1회 생성 지연/비용, 증강 텍스트의 노이즈/환각이 백본 오도 가능, 백본 candidate 공간에 종속.

**ARTER (Adaptive Routing and Targeted Entity Reasoning)** — [arXiv:2510.20098](https://arxiv.org/abs/2510.20098), EMNLP 2025 Industry. 아키텍처: **hybrid (router + 쉬운 케이스 fast linker + 어려운 케이스 LLM CoT reranker)**. ReFinED가 약 30개 랭킹 candidate 생성. Random Forest router가 약 10개 피처(context-entity 유사도, mention-entity 유사도, inter-candidate 유사도, top-candidate margin, score entropy, 경량 LLM confidence)로 각 멘션을 easy/hard 분류. easy는 ReFinED가 직접 연결, hard만 LLM reasoning 모듈로 보내 candidate에 대한 multiple-choice를 few-shot + CoT로 수행. **LLM은 자유 이름을 spelling하지 않고 candidate 목록에서 고른다(RAG식: retrieved KB description을 프롬프트에 투입).**

```
candidate gen (ReFinED, top-30 + Wikidata descriptions)
   → router 피처 계산 (임베딩 유사도 + 저렴한 LLM confidence probe)
   → Random Forest 게이트: easy → ReFinED 답 | hard → LLM multiple-choice CoT
```

- **결과(정확성 단서 적용):** MSNBC에서 ReFinED 대비 +4.47%. **6개 중 5개 데이터셋**에서 평균 +2.53%(ACE2004 +3.52, AIDA +2.46, MSNBC +4.47, AQUAINT +0.13, CWEB +2.09) — **WIKI는 −2.37%로 음수여서 +2.53% 평균에서 제외됨**. 6개 전체 평균은 약 +1.72%. 토큰은 input 약 57%, output 약 59% 절감(전체 결합 약 58.25%). LLM reranker는 **top-30** candidate를 받는다(top-10 아님).
- **한계:** router 구축/캘리브레이션 부담(hard를 easy로 오라우팅 시 오류), ReFinED candidate recall에 상한, hard 멘션 LLM 호출 지연.

##### mention → candidates → disambiguation 실무 파이프라인 정리

| 단계 | 권장 도구 | 비용/지연 | KB id native? |
|------|-----------|-----------|---------------|
| mention detection | spaCy/Flair NER, 또는 ReFinED 내장 검출기 | ms (CPU) | — |
| candidate generation | alias 사전 ∪ dense bi-encoder(FAISS) | ms (HNSW sub-ms) | 후보 id |
| disambiguation (기본) | cross-encoder rerank (BLINK) | O(k) BERT 패스 | ◯ |
| disambiguation (생성) | GENRE/mGENRE (trie 제약) | autoregressive 디코드 | ◯ (이름=id) |
| disambiguation (LLM) | ARTER 라우팅 / EntGPT multiple-choice / LLMAEL 증강 | 멘션당 LLM 호출 (라우팅 시 절감) | candidate에서 선택 |
| NIL/threshold | 점수 임계 또는 NIL candidate | — | → §5 ADD |

핵심 실무 규칙: **NED에서 LLM에게 맨몸의 KB id를 묻지 마라.** 출력 공간을 제약하라 — candidate를 retrieval(bi-encoder ANN, BLINK식)한 뒤 rerank하거나, 유효 식별자에 대한 constrained decoding(GENRE prefix trie)을 쓰면 엔티티 환각이 구조적으로 제거된다. 그리고 LLM은 candidate 집합에 정답이 **포함**돼 있어야만 고를 수 있으므로, candidate 단계의 recall@k를 최종 정확도와 별도로 측정하라.

---

### 5. (3) 새 엔티티 추가 — NIL detection / KB Population

§4의 off-the-shelf linker(ReFinED, BLINK, GENRE)는 FIND+LINK만 커버하며 **어느 것도 스스로 새 KB 엔티티를 만들지 못한다.** "새 엔티티를 중복 없이 추가"하는 일은 두 하위 단계로 나뉜다: DECIDE-NEW(이것이 새 것인가 판단)와 ADD(canonicalize + 중복 없이 삽입). 후자는 본질적으로 link에 실패한 멘션에 적용하는 **entity resolution**다.

##### DECIDE-NEW: NIL / out-of-KB 검출

**BLINKout** — [arXiv:2302.07189](https://arxiv.org/abs/2302.07189), CIKM 2023. 아키텍처: **encoder-only span**. BERT 기반 linker(BLINK식)에 명시적 NIL 엔티티 표현 + 분류 head + **synonym enhancement**를 추가해, 진짜 KB 매칭이 없는 멘션을 가장 가까운 오답에 강제 연결하는 대신 NIL로 라우팅. 이것이 add 파이프라인의 "새 것으로 판정" 게이트다. 임상 노트·생의학 문헌·Wikipedia 5개 데이터셋(UMLS/SNOMED CT/Wikidata)에서 평가.

- **실무 레시피:** bi/cross-encoder linker에 전용 NIL 클래스 + synonym 증강 candidate 집합을 추가해, NIL을 손튜닝 점수 임계가 아니라 학습된 결과로 만든다. flagged-NIL 멘션은 entity-resolution/canonicalization 단계로 넘겨 실제로 새 엔티티 생성.
- **한계:** out-of-KB 멘션을 검출하지만 그 자체로 중복 제거된 새 엔티티로 cluster/canonicalize하지는 않음. 특정 온톨로지에 튜닝됨.

**Learn to Not Link** — [Findings of ACL 2023](https://aclanthology.org/2023.findings-acl.690/) (Zhu et al.). NIL이 단일하지 않음을 보인다: **Missing Entity**(KB에 없는 진짜 엔티티 → ADD 트리거)와 **Non-Entity Phrase**(애초에 엔티티가 아닌 문자열 → ADD 하면 안 됨)로 나뉜다. bi/cross-encoder 실험에서 두 NIL 하위타입이 모두 학습 데이터에 표현돼야 NIL 예측 정확도가 달라진다. NEL 데이터셋([GitHub](https://github.com/solitaryzero/NIL_EL)) 제공.

- **엔지니어링 시사:** NIL 멘션을 새 엔티티로 자동 추가하기 전에 Missing-Entity vs Non-Entity-Phrase로 분류하라. **전자만 canonicalization에 진입**해야 KB가 비-엔티티로 오염되지 않는다.

##### ADD: canonicalization + 중복 없이 삽입 (entity resolution)

**EDC (Extract, Define, Canonicalize)** — [arXiv:2404.03868](https://arxiv.org/abs/2404.03868) / EMNLP 2024, [GitHub](https://github.com/clear-nus/edc). 아키텍처: **hybrid**. 3단계 LLM KG 구축: **EXTRACT**(LLM open IE로 schema-free 트리플) → **DEFINE**(추출된 각 relation/entity 타입에 자연어 정의 작성) → **CANONICALIZE**(정의를 sentence transformer로 임베딩, 각 요소마다 vector 유사도로 가장 가까운 기존 스키마 컴포넌트를 찾고 LLM이 병합 가능성 **검증**). 결정적으로, **non-transformable(병합 불가) 판정 요소는 새로운 것으로 canonical 스키마에 ADD**된다 — 고정 유사도 임계가 아니라 LLM 검증으로 게이트되는 decide-new + 중복 없는 삽입. fine-tuned E5-mistral-7b-instruct로 학습된 Schema Retriever가 관련 스키마를 RAG식 refinement 루프로 되먹임.

- **실무:** `python run.py`. 백엔드 gpt-3.5-turbo/gpt-4/Mistral-7B-Instruct, 기본 canonicalization embedder `intfloat/e5-mistral-7b-instruct`. 두 모드: 타깃 스키마에 정렬, 또는 빈 스키마에서 시작해 새 요소 발견 시 성장하는 self-canonicalize.
- **강점:** add-new-vs-merge를 명시적으로 모델링(병합 불가는 스키마 확장, 나머지는 병합 → 삽입 시 dedup), open 추출을 스키마에서 decouple, LLM 검증이 naive 임베딩 유사도의 over-merge 완화.
- **한계:** 공개된 수치 임계 없음(keep-vs-merge가 LLM 판단에 의존 → 재현성/비용 우려), LLM API 비용이 #요소 × refinement 반복에 비례.

**LLM-CER (In-context Clustering-based Entity Resolution)** — [arXiv:2506.02509](https://arxiv.org/html/2506.02509v1) (2025, SIGMOD/PACMMOD 2026 예정). 아키텍처: **prompt/in-context**. pairwise 매칭 대신 in-context **clustering**으로 entity resolution/dedup: LLM에게 레코드 **집합**을 한 프롬프트에 주고 cluster하라 지시 — 같은 cluster의 레코드는 같은 엔티티. Next Record Set Creation(NRS) 알고리즘이 임베딩 blocking(LSH/positional filtering/canopy) 후 잘 섞인 candidate 집합(크기 약 9, 다양성 약 4)을 구성. Misclustering Detection Guardrail(MDG)이 intra- vs inter-cluster 유사도 비교로 환각 cluster를 잡아 재생성하고, Cluster Merge(CMR)가 cluster를 집합 간 계층 병합(각 cluster를 새 레코드로 취급, anti-transitivity).

```
임베딩 → blocking(LSH/filtering/canopy) → NRS가 다양한 집합 구성
   → 집합당 LLM 1회 clustering → MDG guardrail → CMR 계층 병합
```

- **강점:** N 레코드를 1회 호출로 cluster해 O(N²) pairwise 프롬프트를 대체(약 5× 적은 API 호출). 명시적 환각 guardrail + 계층 병합. "각 엔티티를 정확히 한 번 추가"에 깔끔히 매핑.
- **결과:** 9개 실세계 데이터셋(Music 20K, Cora, Alaska 등)에서 최대 5× 적은 호출, 최대 150% 높은 정확도, 약 10% F-measure 이득. MDG는 약 10% 시간 오버헤드로 최대 약 75% F-measure 개선.
- **한계:** clustering 품질이 집합 크기·다양성·순서에 민감, 대형 코퍼스는 여전히 LLM 비용 종속(좋은 blocking 의존).

**LLM-empowered KG Construction (Survey)** — [arXiv:2510.20345](https://arxiv.org/abs/2510.20345) (2025). LLM 기반 KG 구축을 고전 3계층(ontology engineering, knowledge extraction, knowledge fusion)으로 조직하고, schema-based 패러다임(구조/일관성)과 schema-free 패러다임(유연성/발견, open IE 후 post-hoc canonicalization)을 대비. **knowledge fusion 계층에 dedup/canonicalization/entity-resolution이 위치.** schema-based(기존 id에 link) vs schema-free(emerging 엔티티 발견 + canonicalize)의 대비가 곧 link-vs-add 결정에 대응. 설계 공간 지도로 유용.

##### ADD 단계 설계 요약

| 패턴 | 메커니즘 | 비용 제어 | 환각 방어 |
|------|----------|-----------|-----------|
| EDC self-canonicalization | 임베딩 유사도 + LLM 검증, 병합 불가 → 새로 추가 | refinement 반복 제한 | LLM 검증이 over-merge 완화 |
| LLM-CER in-context clustering | 집합 1회 clustering = 삽입 시 dedup | blocking 후 약 5× 적은 호출 | MDG(intra vs inter) + CMR |

엔지니어링 통찰: 임베딩 retrieval(recall 지향, 저렴)과 LLM 검증(precision 지향, 비쌈)을 짝지어 distinct 엔티티를 over-merge하지 않게 하라. 현재 LLM-KBP 작업은 canonicalization 유사도에 instruction-tuned 문장 임베더(예: E5-mistral-7b-instruct)를 쓴다.

---

### 6. 통합 실무 아키텍처

##### end-to-end 도구

**REBEL** — [Findings of EMNLP 2021](https://aclanthology.org/2021.findings-emnlp.204/), [모델카드](https://huggingface.co/Babelscape/rebel-large). 아키텍처: **encoder-decoder (BART)**. 관계 추출을 텍스트 생성으로 재구성 — 트리플을 특수 토큰으로 선형화(`<triplet> subject <subj> object <obj> relation`)해 단일 시퀀스로 출력. 200+ relation 타입을 한 패스에. NED는 아님(canonical id 연결 없음).

```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tok = AutoTokenizer.from_pretrained("Babelscape/rebel-large")
model = AutoModelForSeq2SeqLM.from_pretrained("Babelscape/rebel-large")
out = model.generate(**inputs, num_beams=3, num_return_sequences=3)
# 특수 토큰을 skip하지 말고 decode → extract_triplets()로 {'head','type','tail'} 복원
```

- self-host(API 비용 없음), 그래프 엣지에 직접 매핑. 고정 relation 인벤토리(새 relation은 fine-tune), BART 컨텍스트 짧음(chunk 필요), entity disambiguation 없음.

**LangChain LLMGraphTransformer** — [소스](https://github.com/langchain-ai/langchain-experimental/blob/main/libs/experimental/langchain_experimental/graph_transformers/llm.py) (2024). 아키텍처: **generative/decoder-LLM**. chat LLM(structured-output/function-calling 선호)에게 각 Document에서 엔티티=node, relation=edge를 추출하도록 프롬프트. `allowed_nodes`/`allowed_relationships`로 스키마 제약, `node_properties`/`relationship_properties`로 속성. `strict_mode=True`로 off-schema 필터, `ignore_tool_usage=True`로 JSON 파싱 fallback. NED 아님(node `id`가 surface string이지 canonical id 아님).

```python
from langchain_experimental.graph_transformers import LLMGraphTransformer
t = LLMGraphTransformer(llm=..., allowed_nodes=["Person","Organization"],
                        allowed_relationships=["WORKS_AT"])
graph_docs = t.convert_to_graph_documents(documents)  # async: aconvert_to_...
```

- **운영 주의:** langchain-experimental은 2026-05-26 아카이브됨 — 프로덕션 의존 전 현재 패키지 홈 확인. entity resolution 없음(surface form당 중복 node 흔함).

**LlamaIndex PropertyGraphIndex** — [docs](https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/) (2024). 아키텍처: **hybrid**. (구 KnowledgeGraphIndex를 대체) pluggable `kg_extractors`로 labeled property graph 추출 + graph/vector retrieval. `SimpleLLMPathExtractor`(기본, 자유형 단일-hop path), `SchemaLLMPathExtractor`(Pydantic/Literal 스키마 + `strict=True` structured output 강제), `DynamicLLMPathExtractor`(타입 가이드 typed path), `ImplicitPathExtractor`(LLM 불필요, 기존 `node.relationships` 읽음). NED 아님.

```python
from llama_index.core import PropertyGraphIndex
from llama_index.core.indices.property_graph import SchemaLLMPathExtractor
index = PropertyGraphIndex.from_documents(documents, kg_extractors=[
    SchemaLLMPathExtractor(llm=llm, possible_entities=Literal["PERSON","PLACE"],
        possible_relations=Literal["PART_OF","HAS"], strict=True,
        max_triplets_per_chunk=10, num_workers=4)])
```

**Microsoft GraphRAG** — [docs](https://microsoft.github.io/graphrag/index/default_dataflow/), [get started](https://microsoft.github.io/graphrag/get_started/) (2024). 아키텍처: **generative/decoder-LLM**. 각 TextUnit에 LLM으로 엔티티(title/type/description)·relation(source/target/description) 추출, **gleaning**으로 재프롬프트해 누락 엔티티 포착. title+type 공유 엔티티와 source+target 공유 relation을 description 배열로 병합 후 LLM 요약. **Hierarchical Leiden** 알고리즘으로 community clustering, community report 생성·요약해 global/local 질의 응답. canonical-id NED는 아니나 title+type로 cross-chunk 병합.

```bash
python -m pip install graphrag
graphrag init                      # .env, settings.yaml, input/ 생성
graphrag index                     # parquet 출력
graphrag query "question"          # global search (또는 --method local)
```

- **주의:** 문서가 명시하듯 "LLM 자원을 많이 소비" — 작은 데이터·저렴한 모델로 시작. 병합은 exact title+type만(의미적 disambiguation/KB linking 아님).

**spaCy-llm (NED)** — [docs](https://spacy.io/usage/large-language-models). 여기 도구 중 **유일하게 canonical KB id로의 진짜 disambiguation을 한다.** `spacy.EntityLinker.v1` + `spacy.CandidateSelector.v1`이 spaCy `KnowledgeBase`로 candidate id를 제안하고 LLM이 disambiguate. NED를 하려면 채워진 KnowledgeBase + candidate generation 함수 필요. 출력은 표준 `doc.ents` / `kb_id_`.

##### structured output 강제 레이어

| 도구 | 메커니즘 | 적용 배포 | 보장 |
|------|----------|-----------|------|
| [Instructor](https://python.useinstructor.com/) | Pydantic `response_model` 전달, JSON schema/function calling, `ValidationError` 시 `max_retries`까지 에러 피드백 재프롬프트. provider-agnostic(15+) | **호스팅 API**(logit 접근 없음) | 사후 검증+재시도(token-level 아님) |
| [Outlines](https://github.com/dottxt-ai/outlines) | guided generation을 vocab 위 FSM 상태 전이로 정식화, regex/JSON schema/CFG로 매 스텝 invalid 토큰 마스킹. 평균 토큰당 O(1) 비용 | **self-host open 모델**(vLLM/TGI/SGLang) | 생성 중 구조 보장 |

- Instructor: `client = instructor.from_provider("openai/gpt-...")`, `res = client.chat.completions.create(response_model=list[Entity], max_retries=3, ...)` → 검증된 타입 객체. 재시도가 지연/토큰 비용 추가, decoding을 token-level로 제약하지 않으므로 재시도 전엔 malformed 가능.
- Outlines: 저자는 Brandon T. Willard와 Rémi Louf(Normal Computing). [arXiv:2307.09702](https://arxiv.org/abs/2307.09702)의 "O(1) 평균" 표현은 초록이 아니라 본문(Introduction, Section 3)에 있다(초록은 "adds little overhead"만 언급). FSM/regex는 무한 재귀를 표현 못하므로 재귀 JSON 스키마는 깊이를 한정하거나 에러([issue #330](https://github.com/dottxt-ai/outlines/issues/330)) — 단 이는 2023-10 시점의 GitHub issue이며 이후 dotjson 엔진이 스키마 지원을 개선했다.
- 공통 caveat: **구조를 보장할 뿐 span/type 정확성은 보장하지 않는다.** 스키마-valid 응답에도 환각/오타입 엔티티가 통과하므로 verification/voting 레이어를 다운스트림에 둬라.

##### 권장 end-to-end 파이프라인 (텍스트 다이어그램)

```
텍스트
  │
  ▼  (1) FIND ─ NER
  │   ├ 고볼륨·저지연·CPU·프라이빗  → GLiNER / NuNER Zero (실제 offset 반환)
  │   ├ 라벨 없음·long-tail·맞춤 타입 → frontier LLM 프롬프팅 (inline marker, NOT offset)
  │   └ self-host JSON·중첩 스키마    → UniversalNER / NuExtract
  │       ↑ structured output: Outlines(open) / Instructor(API), offset은 string search 복원
  │
  ▼  (2) LINK ─ NED
  │   ├ candidate gen : alias 사전 ∪ dense bi-encoder(FAISS HNSW)   [BLINK / ReFinED]
  │   ├ disambiguation: cross-encoder(BLINK) | generative trie(GENRE) | joint 1-pass(ReFinED)
  │   └ LLM 증강      : LLMAEL 문맥 증강 (저렴한 long-tail 이득)
  │                     ARTER 라우팅 (easy→ReFinED, hard→LLM CoT over top-30)
  │
  ▼  (3) DECIDE-NEW ─ NIL 검출
  │   ├ 학습된 NIL 결과 (BLINKout: NIL 클래스 + synonym)  > 손튜닝 임계
  │   └ Missing-Entity vs Non-Entity-Phrase 분류 (Learn to Not Link)
  │       └ Missing-Entity만 다음 단계로
  │
  ▼  (3) ADD ─ canonicalize + 중복 없이 삽입 (entity resolution)
  │   ├ canonicalize-or-create : 임베딩 유사도 + LLM 검증, 병합불가→새로 추가 (EDC)
  │   └ in-context clustering  : blocking 후 집합 1회 cluster = dedup 삽입 (LLM-CER)
  │
  ▼  그래프 DB (Neo4j / Nebula / Memgraph) ─ 트리플 upsert
      (관계 추출: REBEL / LLMGraphTransformer / PropertyGraphIndex)
      (global/thematic QA가 필요할 때만 GraphRAG community 레이어)
```

실무 핵심: 대부분의 "knowledge graph" 도구(LLMGraphTransformer, PropertyGraphIndex, GraphRAG, REBEL)는 NER + 관계 추출 + KB-population(그래프 빌드)을 하지 **NED는 안 한다**(기본적으로 canonical id 연결 없음). 진짜 NED가 필요하면 spaCy-llm의 CandidateSelector+KnowledgeBase 패턴을 쓰거나, 추출기 위에 별도 linker/KB 단계를 볼트온해야 한다. 그래프 추출기는 surface form당 별도 node를 만드므로 entity resolution(string + 임베딩 매칭, 또는 KB linking)이 통상 빠진 조각이다.

---

### 7. 평가 및 운영 트레이드오프

##### 데이터셋 / 지표

| 벤치마크 | 대상 | 특징 | 주의 |
|----------|------|------|------|
| CoNLL-2003 | NER (영어 뉴스) | flat NER 표준, PER/ORG/LOC/MISC | split·라벨 스킴·eval 스크립트가 논문마다 다름 |
| OntoNotes 5.0 | NER (다장르) | 18 타입 | CoNLL-2012 split 등 변형 다수 |
| AIDA-CoNLL | EL (뉴스) | collective disambiguation 표준(AIDA에서 유래) | 뉴스/Wiki 도메인 편향 |
| [ZELDA](https://aclanthology.org/2023.eacl-main.151/) | NED (disambiguation) | train + 9 eval split의 entity vocab·candidate list 통일, macro-avg accuracy | gold 멘션 가정(mention detection 미측정), Wikipedia 중심 |
| [KILT](https://github.com/facebookresearch/KILT) | EL + slot filling 등 5 태스크 | 단일 Wikipedia 스냅샷(2019-08-01, 5.9M), **provenance(근거 페이지) 요구** | 고정 2019 스냅샷(stale), Wikipedia 한정 |

> 경고: 여기 인용된 cross-paper F1 수치는 리더보드가 아니다. GPT-NER(90.91/82.20), ReasoningNER(94.4/89.1), supervised baseline(94.6/92.07)은 서로 다른 논문·split·라벨 스킴·eval 스크립트에서 나온 값으로 apples-to-apples가 아니다. 자기 데이터/split으로 직접 재평가하라. span 평가는 strict span+type-exact F1을 선호하고 offset 매칭 정책(exact vs relaxed/overlap)을 명시하라. EL은 mention detection과 disambiguation 두 실패 모드를 분리 벤치마크하라.

##### LLM 강점과 약점 (NER/NED 관점)

| 측면 | LLM 강점 | LLM 약점 |
|------|----------|----------|
| 데이터 효율성 | zero/few-shot, 라벨링 불필요 | 인도메인 뉴스에서 supervised/encoder가 천장 |
| 유연성 | open 라벨셋, 지시 추종, 맞춤 타입 | wrong-type 드리프트(사전학습 prior vs 주석 가이드라인 충돌) |
| span | inline marker는 강함 | **offset JSB 붕괴**(약 90→29 F1), 생성 span 재정렬 오류 |
| 환각 | verification/voting으로 완화 | NULL 입력을 과신해 엔티티로 라벨링; EL에서 candidate 제약 없이 canonical id 신뢰 불가 |
| 비용/지연 | — | API 비용/지연(fan-out × self-consistency로 폭증) |

cost/latency 격차는 크다. 인접한 fixed-label 텍스트 분류 태스크의 공개 수치로 방향을 잡으면, LLM 프롬프팅이 fine-tuned encoder 대비 추론 비용 25–381×, p50 지연 3–10×였다(포화 벤치마크에서 정확도 차이는 ≤1.6 F1). 이는 NER에 방향적으로 전이된다 → **LLM은 어려운 tail에만 예약**하라.

##### 언제 LLM vs 특화 모델 vs 하이브리드

- **소형 특화 모델 (GLiNER / NuNER Zero / fine-tuned encoder):** 고볼륨, 고정·중간 규모 타입셋, 지연/비용 민감 서빙. zero-shot NER에서 ChatGPT 및 7–13B instruction-tuned LLM을 능가 보고(GLiNER 60.9 vs 47.5 F1, OOD suite). 실제 offset 반환으로 LLM span 재정렬 문제 회피. CPU/ONNX로 엣지 가능. **대부분의 프로덕션 NER의 기본값.**
- **frontier LLM:** 라벨 0, 맞춤/long-tail 타입, 저볼륨, 지저분한 OOD 텍스트(NER4all: GPT-4o가 historical text에서 spaCy/Flair +7–22 F1).
- **distillation (UniversalNER식):** open 타입에 LLM 품질이 필요하나 소형 모델 비용으로 — teacher를 능가하는 self-hostable student 가능(ChatGPT 대비 +7–9 F1).
- **entity LINKING:** 항상 KB에 대한 retrieval/candidate generation으로 ground(BLINK/GENRE 패턴). raw LLM은 candidate 제약 없이 canonical id를 신뢰성 있게 못 낸다 — GENRE는 prefix-trie, BLINK는 retrieve-then-rerank로 해결.
- **하이브리드(지배적 패턴):** 소형 모델이 고볼륨 common case를, frontier LLM이 어려운/모호한 tail을 처리하고, EL은 KB candidate generation으로 ground. ARTER식 easy/hard 라우팅으로 정확도의 대부분을 약 58% 적은 토큰으로 포착.

##### 라이선스 / 운영 체크리스트

- 라이선스: **GENRE/mGENRE = CC-BY-NC 4.0(non-commercial, 다수 제품 차단)**, GLiNER = Apache-2.0, NuNER Zero·NuExtract = MIT, GLiNER2 = CC-BY-4.0, UniversalNER = research-only.
- 서빙: GLiNER은 CPU 동작 + ONNX export로 저지연/엣지 → 고볼륨 NER에서 LLM API 대신 선택되는 주된 이유. frontier LLM은 저신뢰 span의 escalation 경로로.
- langchain-experimental(LLMGraphTransformer 홈) 2026-05-26 아카이브 → 의존 전 현재 패키지 확인.

---

### 8. 정리 및 참고자료

##### 핵심 요약

1. **파이프라인은 4단계로 보라:** FIND(NER) → LINK(NED/EL) → DECIDE-NEW(NIL 검출) → ADD(canonicalize + dedup-insert). off-the-shelf linker(ReFinED/BLINK/GENRE)는 FIND+LINK만 하고 DECIDE-NEW·ADD는 직접 볼트온해야 한다.
2. **NER 황금률:** LLM에게 character offset을 요구하지 마라(offset JSON 붕괴 약 29 F1 vs inline 약 90 F1). inline marker/surface string으로 받고 offset은 string search로 복원. 라벨 드리프트는 주로 wrong-type이니 프롬프트에 타입 정의를 넣어 잡아라.
3. **encoder span ≠ 생성 LLM:** GLiNER/GLiNER2/NuNER(Zero)/BLINKout은 encoder-only span(병렬, CPU, 실제 offset). UniversalNER/NuExtract/GNER/GPT-NER/PromptNER는 생성 decoder. GENRE/mGENRE/GenIE/REBEL은 encoder-decoder. NuNER(fine-tune 필요) vs NuNER Zero(zero-shot) 구분.
4. **NED에서 raw LLM에게 맨몸 KB id를 묻지 마라:** generative trie 제약(GENRE) 또는 retrieve-then-rerank(BLINK)로 출력 공간을 제약해 엔티티 환각을 구조적으로 제거. LLM은 라우팅(ARTER)·문맥 증강(LLMAEL)·candidate 선택(EntGPT)으로.
5. **ADD = entity resolution:** canonicalize-or-create(EDC) 또는 in-context clustering(LLM-CER). blocking 먼저, 집합 단위 cluster로 비용 절감, intra-vs-inter 유사도 guardrail로 환각 방어.
6. **프로덕션 기본값:** 고볼륨 NER은 GLiNER, EL 백본은 ReFinED, 그 위에 LLMAEL/ARTER를 long-tail/어려운 tail에 얹는 하이브리드.

##### 참고 링크

**고전 baseline**
- [Stanford POS Tagger (Toutanova et al. 2003)](https://nlp.stanford.edu/software/tagger.html) · [spaCy rule-based matching](https://spacy.io/usage/rule-based-matching) · [Stanford CRF-NER (Finkel et al. 2005)](https://nlp.stanford.edu/software/CRF-NER.html) · [BiLSTM-CRF (Lample et al. 2016)](https://arxiv.org/abs/1603.01360) · [bert-base-NER](https://huggingface.co/dslim/bert-base-NER)
- [TagMe](https://arxiv.org/abs/1006.3498) · [DBpedia Spotlight](https://www.dbpedia-spotlight.org/) · [AIDA (Hoffart et al. 2011)](https://aclanthology.org/D11-1072/) · [Wikifier (JSI)](https://wikifier.org/info.html)

**(1) NER**
- [GPT-NER](https://arxiv.org/abs/2304.10428) · [PromptNER](https://arxiv.org/abs/2305.15444) · [Zero-Shot NER with ChatGPT (Xie et al., EMNLP 2023)](https://arxiv.org/abs/2310.10035) ([코드](https://github.com/Emma1066/Zero-Shot-NER-with-ChatGPT))
- [GLiNER (NAACL 2024)](https://aclanthology.org/2024.naacl-long.300/) ([arXiv](https://arxiv.org/abs/2311.08526), [GitHub](https://github.com/urchade/GLiNER)) · [GLiNER2](https://arxiv.org/abs/2507.18546) · [GLiNER multi-task](https://arxiv.org/abs/2406.12925)
- [NuNER](https://arxiv.org/html/2402.15343v1) · [NuNER Zero](https://huggingface.co/numind/NuNER_Zero) · [NuExtract (NuMind)](https://numind.ai/blog/nuextract-a-foundation-model-for-structured-extraction) ([GitHub](https://github.com/numindai/nuextract))
- [UniversalNER (ICLR 2024)](https://arxiv.org/html/2308.03279v2) ([프로젝트](https://universal-ner.github.io/)) · [GNER (Findings of ACL 2024)](https://aclanthology.org/2024.findings-acl.206/) ([arXiv](https://arxiv.org/abs/2402.16602), [GitHub](https://github.com/yyDing1/GNER))
- [ReasoningNER (AAAI 2026)](https://arxiv.org/abs/2511.11978) · [NER4all](https://arxiv.org/abs/2502.04351) · [Structured Output Benchmark](https://arxiv.org/html/2501.10868v1) · [Assessment of Generative NER](https://arxiv.org/abs/2601.17898)

**(2) NED / EL**
- [GENRE (ICLR 2021)](https://arxiv.org/abs/2010.00904) ([GitHub](https://github.com/facebookresearch/GENRE)) · [mGENRE (TACL 2022)](https://aclanthology.org/2022.tacl-1.16/) · [GenIE (NAACL 2022)](https://arxiv.org/abs/2112.08340) ([GitHub](https://github.com/epfl-dlab/GenIE))
- [BLINK (EMNLP 2020)](https://aclanthology.org/2020.emnlp-main.519/) ([GitHub](https://github.com/facebookresearch/BLINK)) · [EntQA (ICLR 2022)](https://arxiv.org/abs/2110.02369) · [ReFinED (NAACL 2022)](https://arxiv.org/abs/2207.04108) ([GitHub](https://github.com/amazon-science/ReFinED))
- [EntGPT](https://arxiv.org/html/2402.06738v1) · [Fusion Entity Decoding (NAACL 2024)](https://arxiv.org/abs/2404.01626) · [LLMAEL (CIKM 2025)](https://arxiv.org/abs/2407.04020) ([GitHub](https://github.com/THU-KEG/LLMAEL)) · [ARTER (EMNLP 2025)](https://arxiv.org/abs/2510.20098)

**(3) NIL / KB Population**
- [BLINKout (CIKM 2023)](https://arxiv.org/abs/2302.07189) · [Learn to Not Link (Findings of ACL 2023)](https://aclanthology.org/2023.findings-acl.690/) · [EDC (EMNLP 2024)](https://arxiv.org/abs/2404.03868) ([GitHub](https://github.com/clear-nus/edc))
- [LLM-CER](https://arxiv.org/html/2506.02509v1) · [LLM-empowered KG Construction Survey](https://arxiv.org/abs/2510.20345)

**통합 도구 / 평가**
- [REBEL (EMNLP 2021)](https://aclanthology.org/2021.findings-emnlp.204/) · [LLMGraphTransformer](https://github.com/langchain-ai/langchain-experimental/blob/main/libs/experimental/langchain_experimental/graph_transformers/llm.py) · [LlamaIndex PropertyGraphIndex](https://developers.llamaindex.ai/python/framework/module_guides/indexing/lpg_index_guide/) · [GraphRAG](https://microsoft.github.io/graphrag/get_started/)
- [spaCy-llm](https://spacy.io/usage/large-language-models) · [Instructor](https://python.useinstructor.com/) · [Outlines](https://github.com/dottxt-ai/outlines) ([논문](https://arxiv.org/abs/2307.09702))
- [ZELDA (EACL 2023)](https://aclanthology.org/2023.eacl-main.151/) · [KILT](https://github.com/facebookresearch/KILT) ([논문](https://arxiv.org/abs/2009.02252))
