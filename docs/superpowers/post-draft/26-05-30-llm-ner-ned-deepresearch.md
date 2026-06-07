# **대규모 언어 모델(LLM) 기반 개체명 인식(NER) 및 개체명 연결(NED) 방법론의 기술적 진화와 동적 지식 베이스 구축 파이프라인 심층 분석**

## **정보 추출 패러다임의 근본적 전환 및 도입**

현대의 방대한 비정형 텍스트 데이터로부터 유의미한 지식을 추출하고 이를 기계가 이해할 수 있는 구조화된 지식 베이스(Knowledge Base, KB)로 변환하는 과정은 컴퓨터 과학 및 자연어 처리(NLP) 분야의 가장 핵심적인 과제 중 하나이다. 이러한 정보 추출 파이프라인의 기저에는 텍스트 내에서 특정 의미를 지닌 명사구의 경계를 식별하는 개체명 인식(Named Entity Recognition, NER)과, 추출된 개체를 데이터베이스 내의 고유한 식별자(ID)와 매핑하는 개체명 연결(Named Entity Disambiguation/Linking, NED 또는 EL) 기술이 자리 잡고 있다.1 전통적인 정보 추출 패러다임에서 최근 대규모 언어 모델(LLM) 기반의 패러다임으로 전환되면서, 단순히 문서 내에서 엔티티를 찾고(NER) 기존 지식 베이스에 연결하는 것(NED)을 넘어, 데이터베이스에 존재하지 않는 새로운 엔티티(Out-of-Knowledge-Base, OOKB)를 스스로 식별하고 이를 동적으로 추가하여 지식 그래프를 자율적으로 확장하는 기술적 완성도에 도달하고 있다.3
과거의 고전적인 정보 추출 파이프라인은 주로 품사 태깅(POS tagging), 은닉 마르코프 모델(HMM), 조건부 무작위장(CRF), 그리고 양방향 장단기 메모리 신경망(BiLSTM-CRF)과 같은 순차적 시퀀스 라벨링(Sequence Labeling) 기법에 절대적으로 의존하였다.5 이러한 고전적 방법론들은 각 토큰(Token)의 형태소적 특징과 제한된 주변 윈도우(Window) 내의 문맥만을 고려하여 엔티티의 확률을 계산하는 방식이었다. 비록 이러한 모델들이 연산 자원이 적게 들고 닫힌 도메인(Closed-domain)에서는 높은 속도와 정확도를 보여주었으나, 근본적인 한계를 내포하고 있었다. 첫째, 새로운 도메인이나 새로운 유형의 개체명 스키마(Schema)를 추가하고자 할 때마다 막대한 비용을 들여 수작업 라벨링 데이터를 구축하고 모델을 처음부터 다시 학습시켜야 했다.6 둘째, 개체명 인식과 개체명 연결 모델이 엄격하게 분리되어 있어, 앞선 NER 단계에서 발생한 추출 오류나 누락이 후속 NED 단계로 그대로 전파(Error Propagation)되어 전체 시스템의 성능을 돌이킬 수 없이 훼손시키는 파이프라인 병목 현상이 발생하였다.7
그러나 트랜스포머(Transformer) 아키텍처에 기반한 대규모 언어 모델(LLM)의 등장은 정보 추출의 방법론을 뿌리째 뒤흔들었다. LLM은 수천억 개의 매개변수 속에 방대한 세계 지식(World Knowledge)과 언어의 복잡한 문맥적 뉘앙스를 암묵적으로 압축하고 있다.9 이로 인해, 별도의 파인튜닝(Fine-tuning)이나 형태소 분석 도구의 도움 없이도, 자연어 형태의 프롬프트(Prompt) 지시문만으로 제로샷(Zero-shot) 또는 퓨샷(Few-shot) 환경에서 복잡한 중첩 개체명(Nested Named Entities)이나 분리된 개체명(Non-continued Named Entities)을 유연하게 발굴할 수 있는 능력을 입증하였다.6 본 보고서는 이러한 패러다임 전환의 연장선상에서, 최신 LLM 기반의 NER 및 NED 처리 방식, 이들을 결합한 엔드투엔드(End-to-End) 아키텍처, 그리고 기존 데이터베이스에 없는 신규 엔티티를 동적으로 식별하고 통합하는 최첨단 방법론을 깊이 있게 조망한다.

## **생성형 대규모 언어 모델을 활용한 개체명 발굴(NER) 기술의 고도화**

LLM을 활용하여 문서 내에서 엔티티를 발굴하는 방식은 토큰의 클래스를 예측하는 전통적 분류 문제에서 벗어나, 조건부 텍스트 생성(Conditional Text Generation)이라는 전혀 새로운 문법으로 재정의되었다.12 이는 모델이 텍스트의 거시적인 문맥을 완전히 이해한 상태에서, 요구되는 정보만을 선택적으로 재구성하여 출력함을 의미한다. 이를 구현하기 위해서는 프롬프트 설계의 고도화, 구조화된 출력의 강제, 그리고 효율적인 모델 미세조정이라는 세 가지 기술적 축이 유기적으로 맞물려야 한다.

### **프롬프트 엔지니어링의 진화와 연쇄적 추론(Chain-of-Thought) 메커니즘**

단순히 "이 문서에서 사람 이름을 추출하라"는 직관적인 프롬프트는 복잡한 산업 도메인에서 심각한 환각(Hallucination) 현상이나 누락을 유발한다.12 모델의 역량을 온전히 끌어내기 위해 연구자들은 프롬프트 엔지니어링(Prompt Engineering)을 체계적인 방법론으로 격상시켰다. 가장 널리 사용되는 기법 중 하나는 연쇄적 추론(Chain-of-Thought, CoT)을 NER 태스크에 접목하는 것이다.9
프롬프트 내에 "Let's think step-by-step(단계별로 생각해보자)"이라는 지시어를 삽입하거나 명시적인 추론 단계를 제공하면, LLM은 텍스트 내의 숨겨진 엔티티를 찾을 때 단순히 문자열 패턴을 매칭하는 것이 아니라 주변 문맥을 바탕으로 논리적 근거를 먼저 전개한다.15 예를 들어, 임상 기록 텍스트에서 비정상적인 검사 수치(예: "백혈구 수치가 40이다")를 추출할 때, 단순 추출 모델은 수치만을 가져오거나 이를 놓칠 수 있다. 반면 CoT가 적용된 모델은 "해당 수치가 백혈구 수치를 나타내며, 이는 정상 범위를 벗어난 이상 징후이므로 대상 엔티티로 적합하다"는 중간 추론 과정을 생성함으로써 복잡하고 얽힌 개념들을 정확히 분리해 낸다.9
이와 더불어, 태스크를 여러 개의 논리적 단위로 쪼개는 프롬프트 체이닝(Prompt Chaining) 기법이 활용된다. 단일 프롬프트로 모든 것을 처리하면 모델의 주의력(Attention)이 분산되어 성능이 저하될 수 있다. 따라서 프롬프트 체이닝은 첫 번째 LLM 호출에서 문서의 핵심 주제와 모든 후보 명사구를 광범위하게 식별하고, 두 번째 호출에서 해당 명사구들이 사전에 정의된 엔티티 스키마의 기준에 부합하는지 엄격히 교차 검증(Self-validation)하도록 설계된다.15 이러한 방식은 텍스트 내에서 엔티티를 찾고 그 경계를 명확히 하는 NER의 본질적인 어려움을 극복하는 강력한 수단이 된다.

### **제어 가능한 추출 및 JSON 스키마를 활용한 구조화된 디코딩**

LLM이 생성하는 결과물은 기본적으로 자유 형태의 자연어 텍스트이므로, 이를 소프트웨어 파이프라인이나 데이터베이스 시스템에 통합하기 위해서는 또 다른 형태의 텍스트 파싱(Text parsing)이나 복잡한 정규 표현식(Regular expressions)이 요구된다는 치명적인 한계가 있었다.14 텍스트 형식이 조금만 달라져도 정규 표현식이 작동하지 않아 전체 시스템이 멈추는 상황이 빈번하게 발생하였다.16
이러한 "구조화되지 않은 텍스트의 저주"를 해결하기 위해 산업계에서는 JSON 스키마(JSON Schema)와 Pydantic과 같은 데이터 검증 라이브러리를 LLM 호출의 필수 요소로 도입하였다.17 이 접근법은 LLM에게 단순히 정답을 요구하는 것을 넘어, 응답의 형태적 구조(Topology) 자체를 강제(Constrained output)하는 기술이다. 개발자는 추출하고자 하는 엔티티의 명세(예: 첫 번째 엔티티의 이름, 엔티티의 특성, 관계의 동사형 등)를 Pydantic 클래스를 통해 엄격하게 정의하고, 이를 LLM의 API(예: OpenAI의 구조화된 출력 모드)에 직접 전달한다.16
시스템은 프롬프트의 지시문에 명시적 제약 조건(예: "오직 유효한 JSON 포맷만을 반환할 것, 부가적인 설명은 제외할 것")을 부여하며, 언어 모델은 디코딩 단계에서 정의된 JSON 스키마의 문법적 허용 범위를 벗어나는 토큰의 확률을 원천적으로 차단한다.16 만약 모델의 출력이 스키마 검증에 실패할 경우, 자가 치유(Self-healing) 로직을 통해 오류 내용을 모델에 다시 주입하여 스스로 수정을 요구하는 프롬프트 재호출(Reprompt)이 이루어진다.21 이 기술적 도약 덕분에 NER 단계에서 식별된 엔티티들은 일체의 후처리나 파싱 과정 없이 완전하게 타입이 지정된(Typed) 객체로 반환되며, 이는 후속 작업인 개체명 연결(NED)을 위한 완벽한 입력 데이터로 기능하게 된다.16

### **명령어 미세조정(Instruction Tuning)과 효율적 경량화(QLoRA) 메커니즘**

프롬프트 엔지니어링만으로는 극도로 전문화된 도메인(예: 복잡한 의료 텍스트, 다국어 법률 문서)에서의 NER 성능 한계를 완전히 극복하기 어렵다. 또한 API 호출 비용이나 데이터 보안 문제로 인해 자체적인 로컬 LLM을 운용해야 하는 수요가 급증함에 따라, 비교적 작은 규모의 모델(7B\~13B 파라미터)을 정보 추출의 대가로 탈바꿈시키는 명령어 미세조정(Instruction Tuning) 및 지도 미세조정(Supervised Fine-Tuning, SFT)이 핵심 기술로 자리 잡았다.22
명령어 미세조정은 모델이 단순히 다음 단어를 예측하는 방식에서 벗어나, 사용자가 부여한 지시문(Instruction)의 의도를 파악하고 그에 정렬된(Aligned) 형태로 응답하도록 가중치를 재편하는 과정이다.23 이를 위해 "지시(Instruction)", "입력(Optional Input: 추출 대상 문서)", "예상 출력(Anticipated Output: 추출된 엔티티 리스트)"의 3단 구조로 구성된 대규모 고품질 데이터셋이 구축되어 모델에 주입된다.22
이러한 미세조정을 상용 하드웨어 환경에서 효율적으로 수행하기 위해 QLoRA(Quantized Low-Rank Adaptation) 기술이 표준으로 자리 잡고 있다.24 QLoRA는 수백억 개의 가중치를 가진 사전 학습된 베이스 모델을 4-bit 정밀도(예: 4-bit NormalFloat)로 양자화(Quantization)하여 GPU 메모리에 고정(Freeze)시킨다.24 나아가 양자화 상수를 다시 양자화하는 이중 양자화(Double Quantization) 기법과 메모리 스파이크를 방지하기 위해 GPU와 CPU 램 사이를 오가는 페이징 옵티마이저(Paged optimizers) 기술을 결합하여 메모리 풋프린트를 극단적으로 줄인다.24 모델 학습은 전체 가중치가 아닌, 베이스 모델 위에 덧씌워진 매우 작은 크기의 어댑터 행렬(Adapter Matrices)만을 16-bit로 업데이트하는 방식으로 진행된다.26
이 과정에서 랭크(Rank, ![][image1]) 하이퍼파라미터의 선택이 성능을 좌우한다. 일반적인 단일 추출 작업에는 ![][image2] 혹은 ![][image3] 수준이 적합하지만, 여러 복잡한 논리가 얽힌 다층적 엔티티 추출 및 관계 분석 태스크에서는 ![][image4] 또는 ![][image5] 이상의 고차원 랭크를 부여하여 모델의 수용력(Capacity)을 비약적으로 확장시킨다.24 이러한 혁신을 통해 자원이 한정된 환경에서도 고도의 NER 전용 LLM을 자체적으로 확보할 수 있게 되었다.

### **제로샷 정보 추출의 패러다임 전환: GLiNER의 양방향 트랜스포머 아키텍처**

생성형 LLM이 개체명 인식에서 탁월한 유연성을 제공하지만, 자기회귀적(Autoregressive) 특성으로 인해 문서를 한 단어씩 순차적으로 생성해야 하므로 지연 시간(Latency)이 매우 길고 처리량이 낮다는 본질적인 결함이 존재한다.6 이를 극복하기 위해 제안된 혁신적인 방법론이 GLiNER(Generalist and Lightweight Model for Named Entity Recognition) 아키텍처이다.6
GLiNER는 전통적인 BERT 계열의 양방향 트랜스포머(Bidirectional Transformer)의 고속 병렬 처리 이점과 LLM의 제로샷 추출 능력을 결합한 범용 경량 모델이다.6 기존의 인코더 모델들이 사전에 정의된 고정된 숫자의 개체 유형(예: 사람, 조직, 장소 등)만을 식별할 수 있었던 반면, GLiNER는 입력 프롬프트를 통해 추출하고자 하는 엔티티의 유형을 동적으로 전달받는다.6
기술의 핵심은 GLiNER Bi-encoder 구조에서 텍스트의 인코딩과 라벨(엔티티 유형)의 인코딩을 두 개의 독립적인 트랜스포머 경로로 완벽히 분리했다는 점이다.29 텍스트 내의 단어 임베딩(Span representations)과 찾고자 하는 엔티티 라벨의 임베딩은 각각 독립적으로 생성된 후 후기 상호작용(Late interaction) 또는 유사도 계산을 통해 정렬(Alignment)된다.29 이 분리형 구조가 가지는 압도적인 이점은 엔티티 라벨 임베딩을 시스템 기동 시 단 한 번 사전에 계산(Precomputation)하여 캐싱할 수 있다는 것이다.30 그 결과, 시스템은 추출해야 할 개체 유형이 10개에서 1,000개로 늘어나더라도 추론 속도 저하가 거의 발생하지 않으며(벤치마크 상 약 5.2%의 성능 하락에 불과), 기존 LLM과는 비교할 수 없는 엄청난 속도로 문서를 스캔하여 동시에 무제한의 엔티티를 병렬 추출해낸다.27 GLiNER는 값비싼 API 호출 비용과 느린 속도라는 LLM의 맹점을 완벽히 보완하며 자원이 제한된 산업 환경에서의 궁극적인 대안으로 각광받고 있다.6

| 평가 기준              | 고전적 시퀀스 라벨링 NER (BiLSTM-CRF, BERT)           | 생성형 LLM 프롬프팅 기반 NER (GPT-4, Llama)               | GLiNER (범용 경량 양방향 NER 아키텍처)                       |
| :--------------------- | :---------------------------------------------------- | :-------------------------------------------------------- | :----------------------------------------------------------- |
| **작동 원리**          | 윈도우 기반 토큰 단위 시퀀스 분류                     | 자기회귀적 토큰 예측 기반 자연어 생성                     | 독립적 텍스트-라벨 양방향 인코딩 및 토폴로지 매칭            |
| **추출 대상의 확장성** | 고정된 스키마. 새로운 개체 추가 시 대규모 재학습 필수 | 프롬프트 수정만으로 즉각적인 무제한 제로샷/퓨샷 추출 가능 | 프롬프트로 입력된 무제한의 개체명을 단일 패스로 식별         |
| **속도 및 동시성**     | 극도로 빠름 (병렬 처리 최적화)                        | 매우 느림 (순차적 디코딩 병목 발생)                       | 빠름 (라벨 임베딩 사전 캐싱 및 비동기적 병렬 추출)           |
| **시스템 구축 제약**   | 특정 도메인 맞춤형 대규모 라벨링 데이터 확보 필수     | 막대한 모델 호스팅 자원, API 사용에 따른 막대한 운용 비용 | 비교적 적은 연산량, 라벨링 불필요, 로컬 오프라인 운용 최적화 |

## **문맥의 모호성 해소: LLM 기반 개체명 연결(NED) 기술의 비약적 발전**

텍스트 내에서 추출된 표면적 멘션(Surface form)은 문맥에 따라 전혀 다른 대상(예: "Apple"이 식음료인지 거대 기술 기업인지)을 지칭할 수 있으므로, 이를 사전에 구축된 지식 베이스(예: 위키데이터, 내부 DB) 내의 정확한 식별자(ID)와 매핑하여 모호성을 해소하는 개체명 연결(NED) 기술이 필수적이다.33 기존의 NED 기술은 희소 어휘 검색(BM25)이나 밀집 벡터 검색(Dense Retrieval)을 통해 후보군을 추려낸 뒤 교차 인코더(Cross-encoder)로 재순위를 매기는 방식이었으나, 학습 데이터가 부족한 롱테일(Long-tail) 엔티티의 식별에서 처참한 성능을 보였다.33 최신 NED 방법론은 LLM의 방대한 배경지식을 적극 차용하여 이러한 한계를 무너뜨리고 있다.

### **문맥 증강(Context Augmentation) 메커니즘과 지식 주입: LLMaEL**

첫 번째 혁신적 접근은 LLM을 직접적인 검색 도구로 사용하기보다는, 기존 검색 시스템의 한계를 보완하는 "지식의 샘(Context Augmenter)"으로 활용하는 문맥 증강 기법이다. 이를 대표하는 아키텍처가 LLMaEL(LLM-Augmented Entity Linking)이다.33 기존의 NED 모델들은 희소한 엔티티에 대해 문맥 정보가 부족하면 후보 간의 우선순위를 정확히 결정하지 못한다.33 반면 LLM은 방대한 사전 학습 데이터로 인해 희귀한 용어나 비주류 엔티티에 대해서도 높은 수준의 배경지식을 보유하고 있다.33
LLMaEL 프레임워크에서, 모델은 입력 텍스트와 멘션 M을 제공받은 뒤 해당 엔티티가 지칭할 가능성이 높은 구체적이고 중심적인 설명문(Mention-centered descriptions)을 생성하도록 지시받는다.33 즉, 멘션에 대한 풍부한 서사적 맥락을 LLM이 상상력을 발휘하여 증강해 주는 것이다. 이렇게 풍성해진 부가 텍스트는 다시 고전적인 링킹 모델(예: BLINK, ReFinED)의 추가 입력 피처(Feature)로 주입된다.33 이 플러그 앤 플레이(Plug-and-play) 방식은 LLM을 직접 파인튜닝하는 막대한 비용을 회피하면서도, LLM 특유의 환각성을 제어하고 롱테일 엔티티에 대한 연결 정확도를 최상위 수준(SOTA)으로 끌어올리는 극적인 효과를 입증하였다.33

### **적응형 라우팅(Adaptive Routing)을 통한 컴퓨팅 자원의 지능적 배분: ARTER**

LLM을 NED 과정에 접목할 때 발생하는 가장 큰 장애물은 컴퓨팅 비용과 응답 지연(Latency)이다.34 모든 단일 멘션을 판별하기 위해 수백억 파라미터의 LLM을 호출하는 것은 상용 서비스 관점에서 심각한 낭비이다. 애플(Apple)의 연구진은 이러한 비효율을 해소하기 위해 ARTER(Adaptive Routing and Targeted Entity Reasoning)라는 구조적 파이프라인을 제안하였다.34
ARTER의 핵심 설계 철학은 문맥의 난이도에 따라 처리 경로를 지능적으로 분기(Routing)하는 것이다.34 시스템은 멘션이 추출되면, 임베딩 기반의 유사도와 경량화된 언어 모델의 신호를 조합하여 해당 멘션이 단독으로 해결 가능한 '쉬운 케이스(Easy cases)'인지, 아니면 문맥의 얽힘이 심해 고도의 추론이 필요한 '어려운 케이스(Hard cases)'인지 일차적으로 분류한다.34 의미가 뚜렷하여 모호성이 적은 쉬운 케이스는 계산 비용이 지극히 낮은 경량 엔티티 링커(예: ReFinED)로 라우팅되어 즉각적으로 DB ID와 매핑된다.34 반면, 고도의 의미론적 판단이 필요한 소수의 어려운 케이스에 한해서만 고비용의 LLM 기반 집중 추론(Targeted Reasoning) 프로세스로 선별적 라우팅이 이루어진다.34 이 정교한 전략적 결합을 통해 ARTER 파이프라인은 모든 멘션에 LLM을 적용한 시스템과 대등한 높은 링킹 정확도를 유지하면서도, 소비되는 LLM 토큰의 양을 절반 수준으로 격감시켜 효율성 측면에서 중대한 진보를 이루었다.34

### **생성형 개체명 연결(Generative EL) 패러다임과 GENRE**

분류(Classification)나 검색(Retrieval) 중심이었던 NED 기술은 자연어 생성(Natural Language Generation)의 영역으로 완전히 흡수되고 있다. GENRE(Generative Entity Retrieval)로 대변되는 생성형 개체명 연결 모델들은 NED 태스크를 시퀀스-투-시퀀스(Sequence-to-sequence) 방식의 변환 작업으로 완전히 재정의하였다.12 이 패러다임 하에서 LLM은 문서 내의 문맥을 읽고 해당 멘션에 상응하는 지식 베이스 내의 '정확한 엔티티 이름'이나 '식별자 문자열'을 한 글자씩 스스로 생성(Autoregressive Generation)해 낸다.22
이러한 생성형 접근법은 엔티티 간의 어휘적 구조와 문맥적 뉘앙스를 심층적으로 포착할 수 있다는 장점이 있지만, 치명적인 약점을 수반한다. 언어 모델 본연의 상상력으로 인해 지식 베이스(DB) 내부에는 존재하지도 않는 그럴듯한 엔티티 이름을 임의로 만들어내어 맵핑에 실패하는 환각(Hallucination) 현상이 그것이다.12 링킹의 대상이 되는 DB 식별자는 수백만 개에 달하므로, 모델이 임의의 텍스트를 생성하도록 방치할 경우 정확한 매칭은 거의 불가능에 가깝다.

### **극단적 하드웨어 최적화: 제한적 디코딩(Constrained Decoding)과 STATIC**

생성형 EL의 환각 문제를 해결하고 모델이 반드시 사전에 존재하는 엔티티 식별자만을 생성하도록 강제하는 기술이 바로 제한적 디코딩(Constrained Decoding) 및 제한적 빔 탐색(Constrained Beam Search)이다.38 이 기술은 지식 베이스에 포함된 모든 유효한 엔티티 문자열을 기반으로 거대한 접두사 트리(Prefix Trie) 자료구조를 사전에 구축하는 것에서 출발한다.38 모델이 예측의 매 단계(Step)에서 다음 토큰을 생성할 때, 시스템은 트리 위에서의 현재 위치를 파악하여 그 노드에서 파생될 수 있는 유효한 자식 토큰들의 집합만을 허용하고 나머지 토큰들의 확률은 강제로 마스킹(Masking)하여 0으로 만든다.38 이를 통해 언어 모델은 오직 DB 내부에 존재하는 완벽한 엔티티 이름만을 조립하게 된다.
그러나 이론적으로 완벽한 이 접두사 트리는 산업계 규모로 스케일링될 때 치명적인 성능 병목을 야기한다. 대용량 언어 모델은 GPU나 TPU 상에서 초고속 벡터 연산을 수행하지만, 트리 구조를 탐색하는 로직은 불규칙적(Irregular tree traversals)이어서 CPU에서 수행되어야 하므로 두 하드웨어 간의 지속적인 동기화(Synchronization locks)와 데이터 전송 지연(PCIe transfer overhead)이 발생한다.44 실제로 수백만 개의 아이템을 대상으로 할 경우 이 지연 시간은 수십 밀리초(ms)에 달해 실시간 서비스에 적용하기 불가능했다.45
최근 구글(Google) 연구진이 발표한 STATIC(Sparse Transition Matrix-Accelerated Trie Index for Constrained Decoding) 알고리즘은 이 병목을 완벽히 파괴한 혁신적 돌파구이다.44 STATIC은 깊고 복잡한 트리의 노드 구조를 압축 희소 행렬(Compressed Sparse Row, CSR Matrix) 형태의 거대한 2차원 평면으로 평탄화(Flattening)한다.44 트리가 정적 행렬로 변환됨에 따라, 제한적 디코딩의 마스킹 연산은 GPU와 TPU 내부에서 완벽하게 벡터화된 희소 행렬 곱 연산(Vectorized sparse matrix operations)으로 처리될 수 있다.44 벤치마크 결과, 기존 CPU 기반 트리 탐색 방식이 스텝당 31.3ms의 극심한 지연을 초래했던 반면, STATIC은 불과 0.033ms의 추가 지연만을 발생시키며 최대 948배의 경이로운 속도 향상을 이룩하였다.44 이는 전체 추론 시간의 0.25% 수준에 불과하며, 바야흐로 생성형 검색(Generative Retrieval)과 제한적 디코딩 기술이 대규모 산업 서비스 환경(Production-scale)에 본격적으로 배포될 수 있는 길을 열어젖힌 쾌거이다.45

| 제약 디코딩 기술                | 핵심 원리 및 작동 메커니즘                                         | 하드웨어 처리 주체              | 지연 시간(Overhead) 특징                          | 상용화 스케일         |
| :------------------------------ | :----------------------------------------------------------------- | :------------------------------ | :------------------------------------------------ | :-------------------- |
| **순수 생성 (Unconstrained)**   | 언어 모델의 자기회귀적 토큰 예측에 전적으로 의존                   | GPU/TPU 단독                    | 오버헤드 없음, 단 링킹 환각(Hallucination) 심각   | 불가능                |
| **고전적 Trie 제약 (CPU Trie)** | 지식 베이스의 모든 단어를 접두사 트리로 구성하여 유효 경로만 허용  | CPU 연산 후 GPU와 동기화 (PCIe) | 매우 느림 (수십 ms/step), 병목 현상 극심          | 학술적 목적 한정      |
| **STATIC (희소 행렬 가속)**     | 트리를 압축 희소 행렬(CSR Matrix)로 평탄화하여 벡터 행렬 연산 수행 | GPU/TPU 내부 완전 벡터화 처리   | 극단적으로 낮음 (0.033ms/step), 추론의 0.25% 점유 | 대형 산업 서비스 환경 |

## **모듈형 통합과 엔드투엔드(End-to-End) 정보 추출 파이프라인**

앞서 서술한 NER과 NED는 본질적으로 상호 보완적인 과제임에도 불구하고 전통적으로 분리된 파이프라인 구조를 가졌다. 그러나 이러한 분절된 시스템 구조는 앞 단계(NER)에서 발생한 오탐지(False Positive)나 누락(False Negative)이 뒷 단계(NED)의 링킹 오류로 증폭되어 전체 시스템의 신뢰성을 저해하는 치명적인 오류 전파(Error Propagation) 현상의 원흉이었다.7 최근의 기술적 지향점은 LLM의 다중 추론 능력을 극대화하여 문서를 입력하면 단번에 추출과 맵핑을 완료하는 조인트(Joint) 추출 및 엔드투엔드(End-to-End) 파이프라인으로 귀결되고 있다.2

### **무학습 도메인 적응형 파이프라인: LELA 프레임워크**

대규모 언어 모델의 유연성을 파이프라인 전체를 오케스트레이션하는 지휘자로 격상시킨 대표적인 아키텍처가 LELA(An End-to-end LLM-based Entity Linking Framework)이다.47 LELA 프레임워크의 가장 두드러진 특징은 복잡한 도메인(예: 법률, 의료, 특허)에 시스템을 적용할 때 어떠한 별도의 미세조정(Fine-tuning)이나 재학습 과정이 필요 없는 완전한 제로샷 도메인 적응(Zero-shot domain adaptation) 능력을 갖췄다는 점이다.49
LELA는 거친 단계에서 세밀한 단계로 이어지는(Coarse-to-fine) 견고한 3단계 파이프라인 모듈로 구성된다.49 첫째, 자체적인 NER 컴포넌트(LLM 프롬프팅 또는 경량 모델 활용)가 문서 전체를 훑어 엔티티 멘션을 광범위하게 포착한다(Mentions Extraction). 둘째, 형태소 및 밀집 검색 도구(BM25, FAISS, RapidFuzz 등)를 활용해 거대 지식 베이스로부터 모호성을 띨 수 있는 다수의 후보 엔티티군(Candidate Entities)을 1차적으로 추려낸다.50 마지막 단계에서 LLM은 멘션이 포함된 원본 텍스트의 미세한 문맥적 단서들과 후보 엔티티들의 속성을 깊이 있게 교차 검증(Reranking & Selection)하여 가장 완벽히 일치하는 단일 개체를 최종 결정한다.49 이 과정은 모든 컴포넌트가 플러그인(Plug-in) 형태로 결합되어 있어, 도메인 특화 데이터베이스나 새로운 검색 엔진으로의 교체가 소스 코드 수정 없이도 매끄럽게 이루어지는 탁월한 유연성을 제공한다.50

### **학술적 자원 한계의 극복과 단일 순방향 전달: ReLiK 아키텍처**

막대한 API 비용이나 대용량 GPU 인프라를 동원할 수 없는 제한적인 환경(Academic Budget)에서도 고속의 엔드투엔드 정보 추출을 가능하게 하는 돌파구가 바로 ReLiK(Retrieve and LinK) 아키텍처이다.52 파이프라인 오류 전파를 근원적으로 차단하기 위해 ReLiK은 최신 기계독해(Machine Reading Comprehension) 분야에서 널리 쓰이는 리트리버-리더(Retriever-Reader) 패러다임을 정보 추출 태스크에 독창적으로 이식하였다.54
작동 메커니즘의 첫 단계에서 검색기(Retriever) 모듈은 입력 텍스트의 전반적인 의미 벡터를 바탕으로, 해당 문서 내에 등장할 가능성이 있는 후보 엔티티들이나 관계성 정보(Relations)를 지식 베이스로부터 초고속으로 일괄 스크랩해 온다.54 이후 판독기(Reader) 모듈은 원본 텍스트와 검색된 방대한 후보군들을 별도로 처리하지 않고, 이들을 하나로 이어 붙인 혁신적인 통합 입력 표현 방식(Innovative input representation)을 채택하여 모델 내부에 동시 투입한다.54 그 결과, 모델은 단 한 번의 순방향 신경망 전달(Single forward pass)만으로 문서 내의 다양한 멘션 경계를 식별함과 동시에, 입력으로 주어졌던 수많은 후보 엔티티들을 즉각적으로 병렬 맵핑(Simultaneously extracts)해낸다.54 이는 계산 과정을 극적으로 압축할 뿐만 아니라, NER과 NED가 완전히 결합된 형태의 추출(Joint Information Extraction)을 실현하여 기존 파이프라인의 오차 누적률을 획기적으로 낮춘다.55

### **상용 수준의 대규모 고속 처리 아키텍처: GLinker 및 Spacy-LLM**

학술적 벤치마크를 넘어 수천만 건의 문서를 지연 없이 처리해야 하는 실제 산업 환경에서는 앞서 언급된 GLiNER를 링킹 시스템에 내재화한 GLinker 아키텍처가 독보적인 성능을 발휘한다.57 개체명 연결은 멘션 추출, 다단계 데이터베이스 검색, 그리고 딥러닝 기반의 재랭킹이 수없이 교차되는 복잡한 작업이다. GLinker 프레임워크는 이러한 병목을 타개하기 위해 단방향 비순환 그래프(Directed Acyclic Graph, DAG) 기반의 확장 가능한 비동기 실행 엔진을 도입하였다.32
GLinker 파이프라인의 L1 계층에서는 GLiNER 모델을 이용해 멘션을 추출하며, 이어지는 L2 계층에서는 초고속 인메모리 데이터베이스인 Redis부터 Elasticsearch, 그리고 PostgreSQL로 이어지는 다중 계층 캐싱 시스템(Multi-layer caching)을 통과하며 DB 내의 후보를 입체적으로 검색해낸다.30 검색된 후보들은 L3 계층에서 양방향 인코더 구조(Bi-encoder)를 통해 미리 사전 계산되어(Precomputation) 메모리에 등재된 엔티티 임베딩들과 순식간에 정렬(Alignment)되어 모호성이 완벽히 해소된다.30 이처럼 고도로 파이프라인화된 구조 덕분에, GLinker는 새로운 지식 베이스가 구축되거나 실시간으로 업데이트되는 동적인 상용 환경에서도 단 한 번의 시스템 중단이나 재학습 없이 문서의 비정형 텍스트를 구조화된 엔티티 지식으로 쏟아낸다.30
또한 전통과 안정성을 자랑하는 산업 표준 자연어 처리 라이브러리인 spaCy 역시 시대적 흐름에 부합하여 spacy-llm 컴포넌트를 정식으로 도입하였다.59 spacy-llm의 EntityLinker.v1 모듈은 기존의 정규식 기반이나 통계적 컴포넌트와 최신 LLM 프롬프팅 기술을 심리스하게 하이브리드 결합하는 데 중점을 둔다.59 시스템은 일차적으로 내부 모듈을 통해 신뢰도 높은 후보군을 제안하고, 최종 결정의 순간에만 LLM의 지능을 호출하여 가장 논리적인 개체를 픽(Pick)하게 함으로써 안정성을 극대화한다.59 더불어 LLM이 반환하는 엔티티의 경계가 원본 텍스트의 토큰 경계와 미세하게 엇갈리는 현상을 보정하기 위한 정렬 모드(Alignment mode: "strict", "contract", "expand") 메커니즘을 내장하여 예측 결과물이 시스템 하위 로직에서 충돌 없이 유유히 흐르도록 보장한다.60

## **미등록 개체(OOKB/NIL) 식별과 동적 지식 그래프의 자가 증식형 확장**

지금까지 논의된 파이프라인은 문서 내의 엔티티를 찾아내어 기존에 완성되어 있는 고정된 데이터베이스의 ID에 연결하는 것에 초점을 맞추었다. 그러나 현실 세계의 정보는 멈춰 있지 않다. 의생명과학 논문, 일일 금융 보고서, 소셜 미디어 트렌드와 같이 분초를 다투며 매일 새로운 신조어, 약어, 미지의 기업이나 질병이 쏟아져 나오는 동적인 도메인에서는 어떠한 거대한 지식 베이스조차도 세상의 모든 엔티티를 포괄할 수 없다.4
따라서 차세대 정보 추출 파이프라인의 최종 완성형은 기존 DB에 존재하지 않는 새로운 엔티티(Out-of-Knowledge-Base, OOKB)를 식별하고, 이를 스스로 판단하여 데이터베이스에 새로운 노드로 등재시킴으로써 지식 베이스를 자율적으로 진화시키는 메커니즘을 갖추는 것이다. 이를 위해 시스템은 연결 실패를 단순한 에러로 취급하지 않고, 해당 멘션을 '미등록 개체(NIL)'로 능동적으로 예측(NIL Prediction)하고 분류하는 심층적인 지능을 획득해야 한다.63

### **NIL 엔티티의 명시적 모델링과 심층 의미론적 분석: BLINKout 및 NILINKER**

초창기의 개체명 연결 시스템들은 검색된 후보 엔티티들과 추출된 멘션 간의 코사인 유사도(Cosine Similarity)나 확률 점수가 사전 설정된 특정 임계값(Threshold)에 미달할 경우 일괄적으로 NIL 개체로 퉁쳐서 거부하는 단순 회피 방식을 취했다.4 그러나 임계값 조절은 도메인이나 텍스트 특성에 따라 지나치게 민감하게 반응하여, 실제로 DB에 존재하는 엔티티임에도 이름의 변형이 심할 경우 튕겨 내어버리는 오탐지 확률이 매우 높았다.4
이를 구조적으로 해결하기 위해 제안된 최신 연구들이 BLINKout 프레임워크와 NILINKER 모델이다.4 BLINKout은 단순한 점수 거부를 넘어서, 지식 베이스의 아키텍처 내부에 가상의 'NIL 엔티티' 노드를 명시적으로 모델링하여 배치한다.4 그리고 풍부한 문맥 정보와 사전 동의어 확장(Synonym Enhancement)을 동원한 딥러닝 인코더가, 현재의 멘션이 기존 KB 엔티티 중 하나에 할당되는 것이 합리적인지 아니면 NIL 노드라는 거대한 불확실성 공간에 속하는 것이 문맥상 타당한지를 다중 클래스 분류 문제 차원에서 심층적으로 판별(Classification)하게끔 유도한다.4
학습에 필요한 미등록 개체 데이터(OOKB Datasets)가 태생적으로 희소하다는 딜레마를 해결하기 위해, BLINKout은 기존의 완벽히 매핑된 인-지식(in-KB) 데이터셋에서 의도적으로 특정 엔티티 가지를 쳐내거나(KB Pruning), 구버전의 온톨로지 버전을 고의로 할당하는(KB Versioning) 기발한 전략을 활용한다.4 이러한 자동적 노이즈 생성을 통해 모델은 가혹한 훈련 환경 속에서 진정한 미등록 개체의 패턴을 강건하게 학습해낸다.4
나아가 의생명(Biomedical) 분야와 같이 NIL 엔티티의 출현 빈도가 극단적으로 높은 환경에 대응하기 위한 NILINKER 시스템은 어텐션 신경망(Attention Mechanism)을 활용해 그 개념적 범주를 좁힌다.63 이 모델은 추출된 NIL 멘션이 완전히 고립된 단어인지 확인하기 위해, 타겟 지식 베이스(예: ChEBI, CTD-Anatomy) 전반을 훑어 NIL 개체의 '일부분의 의미'라도 대변할 수 있는(Partially represent) 최상위 K개의 관련 개념 노드들을 선별해낸다.63 이 과정을 통해 시스템은 이것이 완전히 새로운 화합물인지, 기존 화합물의 파생물인지 그 뉘앙스를 추적할 수 있으며, 관련 연구를 돕는 방대한 규모의 EvaNIL 벤치마크 데이터셋 배포를 통해 알고리즘의 정교함을 고도화하고 있다.63

### **GraphRAG와 동적 지식 그래프 구축(Dynamic KG Construction)의 융합**

식별된 NIL 엔티티들은 단순히 누락된 데이터로 폐기되는 것이 아니라, 진화하는 시스템의 신경망을 확장하는 시발점(Seed)이 되어야 한다. 지속적으로 쏟아지는 문서를 실시간으로 파싱하며 새롭게 발견된 엔티티들과 그들 간의 논리적 연결성을 지식 그래프 상에 쉼 없이 편입시키는 과정을 동적 지식 그래프 구축(Dynamic Knowledge Graph Construction)이라고 칭한다.69 이 분야에서 가장 각광받고 있는 최첨단 패러다임이 바로 대규모 언어 모델 중심의 GraphRAG(Graph Retrieval-Augmented Generation) 시스템이다.72
GraphRAG 파이프라인에서 LLM은 새로운 문서가 인입될 때마다, 고도의 프롬프팅과 Pydantic 스키마 가이드를 바탕으로 주어, 관계성, 목적어(Subject-Relation-Object)로 구성된 트리플렛(Triplets)을 치밀하게 추출해낸다.17 이때 기존 DB에 성공적으로 맵핑된 엔티티들 사이에는 관계를 나타내는 엣지(Edge)나 가중치가 보강되는 반면, 앞서 OOKB/NIL 예측 메커니즘에 의해 미등록 개체로 명확히 판명된 멘션들은 지식 베이스 내의 텅 빈 공간에 새로운 노드(New Node)로 즉각 인스턴스화(Instantiation)되어 자리를 잡는다.72
이러한 동적 삽입(Dynamic Insertion)은 전통적인 그래프 처리처럼 시스템을 중단시키고 전체 데이터베이스 인덱스를 완전히 처음부터 다시 구축(Rebuilding)해야 하는 엄청난 낭비 없이, 증분 형태의 업데이트(Incremental updates) 기술을 기반으로 즉각적으로 이루어지므로 실시간 정보 수용성이 극대화된다.72 이를 기반으로 구축된 지식 그래프는 시간이 흐를수록 더 깊어지고 넓어지는 자기 성장형 구조를 띤다.70

### **개체 분해능(Entity Resolution)과 커뮤니티 요약을 통한 데이터 무결성 확보**

하지만 시스템이 미지의 엔티티를 무분별하게 새로운 노드로 생성하도록 방치할 경우, 지식 그래프는 순식간에 구조적 붕괴와 지식 파편화 현상을 맞이하게 된다.73 일례로 동일한 기업체가 문서 작성자에 따라 "Joe's Building Company", "Joe's Bldg Inc.", 혹은 "Joe's LLC" 등으로 제각각 표기되었을 경우, 시스템은 표면적 문자열의 이질성 때문에 이들을 모두 각각의 개별 NIL 개체로 간주하여 수십 개의 잉여 노드를 양산해버릴 수 있다.73
이러한 치명적인 데이터 쓰레기 양산(Garbage In, Garbage Out) 현상을 억제하고 지식 그래프의 절대적 무결성을 수호하기 위해, 시스템의 최후방에는 정교한 개체 분해능(Entity Resolution) 파이프라인이 필수적으로 결합된다.72 개체 분해능 단계에서는 단순히 정규 표현식으로 문자열을 비교하는 수준을 넘어, LLM의 지능을 대대적으로 투입하여 새롭게 삽입될 엔티티와 기존 노드들 간의 의미론적 유사도, 동일 문서 내에 존재하는 타 엔티티들과의 주제적 일관성(Topical coherence), 그리고 그래프 상의 위상적 연결성(Topological similarity)을 다차원적으로 평가한다.72 이러한 교차 검증을 통해 파편화된 다수의 노드들이 실제 현실 세계(Real-world entities)에서 동일한 대상을 지칭함이 밝혀지면, 이들을 하나의 견고한 마스터 노드로 병합(Disambiguation & Merging)하여 그래프를 압축한다.72
이러한 데이터 정화 과정이 완료되면, 거대해진 지식 그래프의 구조적 복잡성을 체계적으로 관리하기 위해 Leiden 알고리즘과 같은 고등 커뮤니티 탐지(Community Detection) 기술이 적용된다.74 이 알고리즘은 밀집되게 연결된 엔티티들을 하나의 군집화된 계층형 커뮤니티(Hierarchical Communities)로 묶어내며, LLM은 각 커뮤니티 내의 주요 엔티티와 얽힌 관계들을 종합하여 거시적인 시각의 커뮤니티 리포트(Community Summaries)를 동적으로 생성해낸다.74 결국, 비정형 텍스트에서 시작된 한낱 모호한 명사구들은 정교한 NER과 NED 메커니즘을 거쳐 단단한 연결성을 지닌 마디가 되며, 지속적인 노드 병합과 커뮤니티 군집화를 거쳐 시스템 전반을 아우르는 살아 움직이는 통찰력의 결정체로 거듭나게 되는 것이다.69

## **결론**

현대의 비정형 데이터 홍수 속에서 의미를 추출하고 지식을 체계화하는 과정은 과거의 고립되고 정적인 방법론에서 벗어나, 대규모 언어 모델(LLM)을 심장으로 하는 유기적인 정보 파이프라인으로 진화하였다. 본 분석에서 살펴본 바와 같이, 개체명 발굴(NER) 태스크는 프롬프트 엔지니어링의 연쇄적 추론(CoT) 메커니즘과 Pydantic을 활용한 엄격한 스키마 기반 구조화된 디코딩을 통해 텍스트 파싱의 난맥상을 완벽히 해소하였다. 더불어 명령어 미세조정(QLoRA)을 통한 경량화 기법과, 텍스트와 라벨 인코더를 분리하여 지연 시간을 극복한 GLiNER의 양방향 트랜스포머 아키텍처는 산업 현장에서 즉시 투입 가능한 제로샷 병렬 추출의 새로운 표준을 정립하였다.
이어진 개체명 연결(NED) 태스크에서는 단순 벡터 검색의 한계를 돌파하기 위해 LLMaEL과 같은 문맥 증강 기법이 롱테일 엔티티 식별의 빈틈을 메우고 있으며, ARTER 프레임워크는 라우팅 최적화를 통해 막대한 LLM 토큰 소모를 방지하는 경제성을 확보하였다. 나아가 GENRE와 같이 언어 모델이 엔티티 이름을 직접 생성해내는 혁신적인 패러다임은, STATIC 알고리즘과 같은 극단적인 하드웨어 가속 기반의 제약적 트리 평탄화 기술과 결합하여 상용 규모(Production-scale)에서도 응답 지연 없는 무결점의 연결 정확도를 실현해 내고 있다.
이러한 개별 모듈의 비약적 발전은 LELA, ReLiK, GLinker 등의 아키텍처를 통해 엔드투엔드(End-to-End) 파이프라인으로 융합되며, 분절된 시스템이 낳았던 치명적인 오차 전파 문제를 원천적으로 종식시켰다. 더욱 결정적인 것은, 시스템이 기존 데이터베이스에 없는 미지의 세계(OOKB/NIL)를 직면했을 때 BLINKout 등의 모델링을 통해 새로운 개체를 스스로 식별하고, GraphRAG 패러다임 아래 엄격한 개체 분해능(Entity Resolution)과 커뮤니티 탐지를 거쳐 동적 지식 그래프의 확장을 실시간으로 이루어낸다는 점이다. 이는 곧, 단순한 정보 검색과 연결을 넘어 세상의 변화하는 지식을 스스로 학습하고 자가 증식하는 차세대 지능형 지식 생태계의 도래를 명백히 시사하고 있다.

#### **참고 자료**

1. A survey on recent advances in Named Entity Recognition \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2401.10825v1](https://arxiv.org/html/2401.10825v1)
2. End-to-End Neural Entity Linking \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/K18-1050/](https://aclanthology.org/K18-1050/)
3. LLM Wiki \- GitHub Gist, 5월 30, 2026에 액세스, [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
4. Reveal the Unknown: Out-of-Knowledge-Base Mention Discovery with Entity Linking, 5월 30, 2026에 액세스, [https://www.cs.ox.ac.uk/people/ian.horrocks/Publications/download/2023/DongC0L023.pdf](https://www.cs.ox.ac.uk/people/ian.horrocks/Publications/download/2023/DongC0L023.pdf)
5. Few-shot clinical entity recognition in English, French and Spanish: masked language models outperform generative model prompting \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2024.findings-emnlp.400/](https://aclanthology.org/2024.findings-emnlp.400/)
6. GLiNER: Generalist Model for Named Entity Recognition using Bidirectional Transformer \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2024.naacl-long.300.pdf](https://aclanthology.org/2024.naacl-long.300.pdf)
7. End-to-end named entity recognition and relation extraction using pre-trained language models | OpenReview, 5월 30, 2026에 액세스, [https://openreview.net/forum?id=rkgqm0VKwB](https://openreview.net/forum?id=rkgqm0VKwB)
8. \[1912.13415\] End-to-end Named Entity Recognition and Relation Extraction using Pre-trained Language Models \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/1912.13415](https://arxiv.org/abs/1912.13415)
9. Improving large language models for clinical named entity recognition via prompt engineering \- PMC, 5월 30, 2026에 액세스, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11339492/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11339492/)
10. Combining the tasks of entity linking and relation extraction using a unified neural network model, 5월 30, 2026에 액세스, [https://rrlinguistics.ru/en/journal/article/3676/](https://rrlinguistics.ru/en/journal/article/3676/)
11. Recent Advances in Named Entity Recognition: A Comprehensive Survey and Comparative Study \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2401.10825v3](https://arxiv.org/html/2401.10825v3)
12. Instructed Language Models with Retrievers Are Powerful Entity Linkers \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2023.emnlp-main.139.pdf](https://aclanthology.org/2023.emnlp-main.139.pdf)
13. Large Language Models for Few-Shot Named Entity Recognition \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/1810.06818v3](https://arxiv.org/html/1810.06818v3)
14. Fine-Tuning LLMs with LoRA and QLoRA: From Confusion to (Kinda) Working Results | by Deepesh Sharma | Medium, 5월 30, 2026에 액세스, [https://medium.com/@dsh.2065/fine-tuning-llms-with-lora-and-qlora-from-confusion-to-kinda-working-results-89b348bcce71](https://medium.com/@dsh.2065/fine-tuning-llms-with-lora-and-qlora-from-confusion-to-kinda-working-results-89b348bcce71)
15. Prompt Engineering for Named Entity Recognition (NER) \- DS With Mac, 5월 30, 2026에 액세스, [https://dswithmac.com/posts/prompt-eng-ner/](https://dswithmac.com/posts/prompt-eng-ner/)
16. Stop Parsing JSON by Hand: Structured LLM Outputs With Pydantic \- DEV Community, 5월 30, 2026에 액세스, [https://dev.to/klement_gunndu/stop-parsing-json-by-hand-structured-llm-outputs-with-pydantic-1pg0](https://dev.to/klement_gunndu/stop-parsing-json-by-hand-structured-llm-outputs-with-pydantic-1pg0)
17. Building Dynamic Knowledge Graphs Using Open Source LLMs | by FS Ndzomga \- Medium, 5월 30, 2026에 액세스, [https://medium.com/thoughts-on-machine-learning/building-dynamic-knowledge-graphs-using-open-source-llms-06a870e1bc4f](https://medium.com/thoughts-on-machine-learning/building-dynamic-knowledge-graphs-using-open-source-llms-06a870e1bc4f)
18. Reliable JSON from Any LLM: Pydantic \+ Zod Patterns for 2026 \- TECHSY, 5월 30, 2026에 액세스, [https://techsy.io/en/blog/llm-structured-outputs-guide](https://techsy.io/en/blog/llm-structured-outputs-guide)
19. How to Use Pydantic for LLMs: Schema, Validation & Prompts, 5월 30, 2026에 액세스, [https://pydantic.dev/articles/llm-intro](https://pydantic.dev/articles/llm-intro)
20. LLM-as-a-Judge Prompt Engineering Guide \- Galileo Docs, 5월 30, 2026에 액세스, [https://docs.galileo.ai/concepts/metrics/custom-metrics/prompt-engineering](https://docs.galileo.ai/concepts/metrics/custom-metrics/prompt-engineering)
21. JSON prompting for LLMs \- IBM Developer, 5월 30, 2026에 액세스, [https://developer.ibm.com/articles/json-prompting-llms/](https://developer.ibm.com/articles/json-prompting-llms/)
22. EntGPT: Entity Linking with Generative Large Language Models \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2402.06738v2](https://arxiv.org/html/2402.06738v2)
23. Instruction Tuning for Large Language Models: A Survey \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2308.10792v9](https://arxiv.org/html/2308.10792v9)
24. LLM Fine-tuning Complete Guide: Master LoRA, QLoRA, RLHF, and DPO, 5월 30, 2026에 액세스, [https://www.youngju.dev/blog/llm/2026-03-17-llm-finetuning-complete-guide.en](https://www.youngju.dev/blog/llm/2026-03-17-llm-finetuning-complete-guide.en)
25. Fine-tuning an LLM using QLoRA in AWS GovCloud (US) | AWS Public Sector Blog, 5월 30, 2026에 액세스, [https://aws.amazon.com/blogs/publicsector/fine-tuning-an-llm-using-qlora-in-aws-govcloud-us/](https://aws.amazon.com/blogs/publicsector/fine-tuning-an-llm-using-qlora-in-aws-govcloud-us/)
26. LLM Fine-tuning: Techniques for Adapting Language Models \- Daily Dose of Data Science, 5월 30, 2026에 액세스, [https://www.dailydoseofds.com/llmops-crash-course-part-12/](https://www.dailydoseofds.com/llmops-crash-course-part-12/)
27. GLiNER: A Zero-Shot NER that outperforms ChatGPT and traditional NER models, 5월 30, 2026에 액세스, [https://netraneupane.medium.com/gliner-zero-shot-ner-outperforming-chatgpt-and-traditional-ner-models-1f4aae0f9eef](https://netraneupane.medium.com/gliner-zero-shot-ner-outperforming-chatgpt-and-traditional-ner-models-1f4aae0f9eef)
28. urchade/GLiNER: Generalist and Lightweight Model for Named Entity Recognition (Extract any entity types from texts) \- GitHub, 5월 30, 2026에 액세스, [https://github.com/urchade/GLiNER](https://github.com/urchade/GLiNER)
29. Meet the new zero-shot NER architecture | by Knowledgator Engineering | Medium, 5월 30, 2026에 액세스, [https://blog.knowledgator.com/meet-the-new-zero-shot-ner-architecture-30ffc2cb1ee0](https://blog.knowledgator.com/meet-the-new-zero-shot-ner-architecture-30ffc2cb1ee0)
30. GLinker — modular zero-shot entity linking system | by Knowledgator Engineering | Medium, 5월 30, 2026에 액세스, [https://blog.knowledgator.com/glinker-modular-zero-shot-entity-linking-system-078c9c436203](https://blog.knowledgator.com/glinker-modular-zero-shot-entity-linking-system-078c9c436203)
31. \[2311.08526\] GLiNER: Generalist Model for Named Entity Recognition using Bidirectional Transformer \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2311.08526](https://arxiv.org/abs/2311.08526)
32. GLiNKER \- Entity Linking Framework \+ GLiNER \- The Generalist Information Extraction Model. \- YouTube, 5월 30, 2026에 액세스, [https://www.youtube.com/watch?v=gOdt_o6SnHo](https://www.youtube.com/watch?v=gOdt_o6SnHo)
33. LLMaEL: Large Language Models are Good Context Augmenters for Entity Linking \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2407.04020v1](https://arxiv.org/html/2407.04020v1)
34. Leveraging the Power of Large Language Models in Entity Linking via Adaptive Routing and Targeted Reasoning \- Apple Machine Learning Research, 5월 30, 2026에 액세스, [https://machinelearning.apple.com/research/leveraging-power](https://machinelearning.apple.com/research/leveraging-power)
35. Harnessing Deep LLM Participation for Robust Entity Linking \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2511.14181v1](https://arxiv.org/html/2511.14181v1)
36. An Entity Linking Agent for Question Answering \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2508.03865](https://arxiv.org/html/2508.03865)
37. LLMAEL: Large Language Models are Good Context Augmenters for Entity Linking. \- GitHub, 5월 30, 2026에 액세스, [https://github.com/THU-KEG/LLMAEL](https://github.com/THU-KEG/LLMAEL)
38. Generative Multimodal Entity Linking \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2306.12725v4](https://arxiv.org/html/2306.12725v4)
39. Autoregressive Entity Retrieval \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/pdf/2010.00904](https://arxiv.org/pdf/2010.00904)
40. Autoregressive Entity Retrieval \- OpenReview, 5월 30, 2026에 액세스, [https://openreview.net/forum?id=5k8F6UU39V](https://openreview.net/forum?id=5k8F6UU39V)
41. Multilingual Autoregressive Entity Linking | Transactions of the Association for Computational Linguistics \- MIT Press Direct, 5월 30, 2026에 액세스, [https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00460/110051/Multilingual-Autoregressive-Entity-Linking](https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00460/110051/Multilingual-Autoregressive-Entity-Linking)
42. ICML Poster Flexible and Efficient Grammar-Constrained Decoding, 5월 30, 2026에 액세스, [https://icml.cc/virtual/2025/poster/45613](https://icml.cc/virtual/2025/poster/45613)
43. Retrieval-Constrained Decoding Reveals Underestimated Parametric Knowledge in Language Models \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2509.23417v1](https://arxiv.org/html/2509.23417v1)
44. \[2602.22647\] Vectorizing the Trie: Efficient Constrained Decoding for LLM-based Generative Retrieval on Accelerators \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2602.22647](https://arxiv.org/abs/2602.22647)
45. Vectorizing the Trie: Efficient Constrained Decoding for LLM-based Generative Retrieval on Accelerators \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2602.22647v1](https://arxiv.org/html/2602.22647v1)
46. Vectorizing the Trie: Efficient Constrained Decoding for LLM-based Generative Retrieval on Accelerators \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/pdf/2602.22647](https://arxiv.org/pdf/2602.22647)
47. LELA: an LLM-based Entity Linking Approach with Zero-Shot Domain Adaptation \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/pdf/2601.05192](https://arxiv.org/pdf/2601.05192)
48. \[2605.26956\] LELA: An End-to-end LLM-based Entity Linking Framework with Zero-shot Domain Adaptation \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2605.26956](https://arxiv.org/abs/2605.26956)
49. LELA: Zero-Shot Entity Linking Method | PDF | Accuracy And Precision \- Scribd, 5월 30, 2026에 액세스, [https://www.scribd.com/document/978500277/Lela](https://www.scribd.com/document/978500277/Lela)
50. LELA: An End-to-end LLM-based Entity Linking Framework with Zero-shot Domain Adaptation \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/pdf/2605.26956](https://arxiv.org/pdf/2605.26956)
51. LELA: an LLM-based Entity Linking Approach with Zero-Shot Domain Adaptation \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2601.05192v1](https://arxiv.org/html/2601.05192v1)
52. Decoding on Graphs: Faithful and Sound Reasoning on Knowledge Graphs through Generation of Well-Formed Chains \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2025.acl-long.1186.pdf](https://aclanthology.org/2025.acl-long.1186.pdf)
53. ReLiK: Retrieve and LinK, Fast and Accurate Entity Linking and Relation Extraction on an Academic Budget \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2024.findings-acl.839/](https://aclanthology.org/2024.findings-acl.839/)
54. ReLiK: Retrieve and LinK, Fast and Accurate Entity Linking and Relation Extraction on an Academic Budget \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2024.findings-acl.839.pdf](https://aclanthology.org/2024.findings-acl.839.pdf)
55. ReLiK: Retrieve and LinK, Fast and Accurate Entity Linking and Relation Extraction on an Academic Budget \[Quick Review\] \- Liner, 5월 30, 2026에 액세스, [https://liner.com/review/relik-retrieve-and-link-fast-and-accurate-entity-linking-and](https://liner.com/review/relik-retrieve-and-link-fast-and-accurate-entity-linking-and)
56. \[2408.00103\] ReLiK: Retrieve and LinK, Fast and Accurate Entity Linking and Relation Extraction on an Academic Budget \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2408.00103](https://arxiv.org/abs/2408.00103)
57. The Million-Label NER: Breaking Scale Barriers with GLiNER bi-encoder \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2602.18487v1](https://arxiv.org/html/2602.18487v1)
58. Knowledgator/GLinker: Efficient and scalable zero-shot entity linking \- GitHub, 5월 30, 2026에 액세스, [https://github.com/Knowledgator/GLinker](https://github.com/Knowledgator/GLinker)
59. Large Language Models · spaCy API Documentation, 5월 30, 2026에 액세스, [https://spacy.io/api/large-language-models](https://spacy.io/api/large-language-models)
60. explosion/spacy-llm: Integrating LLMs into structured NLP pipelines \- GitHub, 5월 30, 2026에 액세스, [https://github.com/explosion/spacy-llm](https://github.com/explosion/spacy-llm)
61. Large Language Models · spaCy Usage Documentation, 5월 30, 2026에 액세스, [https://spacy.io/usage/large-language-models](https://spacy.io/usage/large-language-models)
62. spacy-llm: Integrating LLMs into structured NLP pipelines \- PyPI, 5월 30, 2026에 액세스, [https://pypi.org/project/spacy-llm/0.2.1/](https://pypi.org/project/spacy-llm/0.2.1/)
63. NILINKER: Attention-based approach to NIL Entity Linking \- PubMed, 5월 30, 2026에 액세스, [https://pubmed.ncbi.nlm.nih.gov/35811025/](https://pubmed.ncbi.nlm.nih.gov/35811025/)
64. Find the Funding: Entity Linking with Incomplete Funding Knowledge Bases, 5월 30, 2026에 액세스, [https://aclanthology.org/2022.coling-1.168/](https://aclanthology.org/2022.coling-1.168/)
65. Learn to Not Link: Exploring NIL Prediction in Entity Linking \- ACL Anthology, 5월 30, 2026에 액세스, [https://aclanthology.org/2023.findings-acl.690/](https://aclanthology.org/2023.findings-acl.690/)
66. \[2305.15725\] Learn to Not Link: Exploring NIL Prediction in Entity Linking \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2305.15725](https://arxiv.org/abs/2305.15725)
67. BLINKout: Out-of-KB Mention Discovery \- GitHub, 5월 30, 2026에 액세스, [https://github.com/KRR-Oxford/BLINKout](https://github.com/KRR-Oxford/BLINKout)
68. Reveal the Unknown: Out-of-Knowledge-Base Mention Discovery with Entity Linking \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/abs/2302.07189](https://arxiv.org/abs/2302.07189)
69. The construction and refined extraction techniques of knowledge graph based on large language models \- PMC, 5월 30, 2026에 액세스, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12960662/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12960662/)
70. Beyond Static Question Banks: Dynamic Knowledge Expansion via LLM-Automated Graph Construction and Adaptive Generation \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2602.00020v1](https://arxiv.org/html/2602.00020v1)
71. Insights, Techniques, and Evaluation for LLM-Driven Knowledge Graphs | NVIDIA Technical Blog, 5월 30, 2026에 액세스, [https://developer.nvidia.com/blog/insights-techniques-and-evaluation-for-llm-driven-knowledge-graphs/](https://developer.nvidia.com/blog/insights-techniques-and-evaluation-for-llm-driven-knowledge-graphs/)
72. How Would Microsoft GraphRAG Work Alongside a Graph Database? \- Memgraph, 5월 30, 2026에 액세스, [https://memgraph.com/blog/how-microsoft-graphrag-works-with-graph-databases](https://memgraph.com/blog/how-microsoft-graphrag-works-with-graph-databases)
73. GraphRag & Why Knowledge Graphs Need Entity Resolution \- Senzing, 5월 30, 2026에 액세스, [https://senzing.com/knowledge-graphs-graphrag/](https://senzing.com/knowledge-graphs-graphrag/)
74. GraphRAG auto-tuning provides rapid adaptation to new domains \- Microsoft Research, 5월 30, 2026에 액세스, [https://www.microsoft.com/en-us/research/blog/graphrag-auto-tuning-provides-rapid-adaptation-to-new-domains/](https://www.microsoft.com/en-us/research/blog/graphrag-auto-tuning-provides-rapid-adaptation-to-new-domains/)
75. A Knowledge Graph Entity Disambiguation Method Based on Entity-Relationship Embedding and Graph Structure Embedding \- PMC, 5월 30, 2026에 액세스, [https://pmc.ncbi.nlm.nih.gov/articles/PMC8486511/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8486511/)
76. Building Knowledge Graphs Processing Infrastructure and Named Entity Linking Klang, Marcus \- Lund University Publications, 5월 30, 2026에 액세스, [https://lup.lub.lu.se/search/files/69709434/Marcus_Corrected_PhD_Thesis.pdf](https://lup.lub.lu.se/search/files/69709434/Marcus_Corrected_PhD_Thesis.pdf)
77. Entity Insertion in Multilingual Linked Corpora: The Case of Wikipedia \- arXiv, 5월 30, 2026에 액세스, [https://arxiv.org/html/2410.04254v1](https://arxiv.org/html/2410.04254v1)
78. Improving Entity Linking by Introducing Knowledge Graph Structure Information \- MDPI, 5월 30, 2026에 액세스, [https://www.mdpi.com/2076-3417/12/5/2702](https://www.mdpi.com/2076-3417/12/5/2702)
79. Enhancing Entity Linking and Disambiguation | by Eleventh Hour Enthusiast | Medium, 5월 30, 2026에 액세스, [https://medium.com/@EleventhHourEnthusiast/enhancing-entity-linking-and-disambiguation-39db28b02456](https://medium.com/@EleventhHourEnthusiast/enhancing-entity-linking-and-disambiguation-39db28b02456)
80. Lexical Graph with Extracted Entities and Community Summaries \- GraphRAG, 5월 30, 2026에 액세스, [https://graphrag.com/reference/knowledge-graph/lexical-graph-extracted-entities-community-summaries/](https://graphrag.com/reference/knowledge-graph/lexical-graph-extracted-entities-community-summaries/)
