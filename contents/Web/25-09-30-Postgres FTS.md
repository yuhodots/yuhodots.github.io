---
title: "PostgreSQL Full-Text Search"
date: "2025-09-30"
template: "post"
draft: false
path: "/backend/25-09-30/"
description: "어떤 종류의 데이터든 대용량의 데이터를 다루다보면 언제나 한번쯤은 '검색'과 관련된 업무를 하게 됩니다. 검색을 구현하는 방법은 여러 가지가 있지만 그 중에서 가장 간단하게 검색을 구현하는 방법은 postgres와 같은 DB에 문서를 넣고, postgres에 쿼리를 날리는 방식으로 검색을 구현하는..."
category: "BackEnd"
thumbnail: "postgres"
---

> 이 글은 PostgreSQL Full-Text Search의 핵심 개념을 이해하기 위해 작성되었습니다. Gemini deep research를 사용하여 1차 정리한 뒤에, 해당 내용을 직접 훑으며 어색한 부분을 2차 가공한 결과물입니다.

어떤 종류의 데이터든 대용량의 데이터를 다루다보면 언제나 한번쯤은 '검색'과 관련된 업무를 하게 됩니다. 검색을 구현하는 방법은 여러 가지가 있지만 그 중에서 가장 간단하게 검색을 구현하는 방법은 postgres와 같은 DB에 문서를 넣고, postgres에 쿼리를 날리는 방식으로 검색을 구현하는 것입니다.

이 때 가장 간단하게 사용해볼 수 있는 쿼리문이 LIKE 문이지만 이는 곧 성능과 기능의 한계에 부딪히게 됩니다. 특히 단순히 특정 문자열을 포함하는지 아닌지를 판단하는 것 뿐만 아니라, 수많은 결과 중에서 가장 관련성 높은 문서를 먼저 보여주는 정교한 기능은 단순한 문자열 비교만으로는 불가능합니다.

이러한 문제를 해결하기 위해 많은 프로젝트가 Elasticsearch와 같은 별도의 검색 엔진을 도입하지만, 이는 인프라 복잡성, 데이터 동기화, 운영 비용 증가라는 새로운 과제를 안겨줍니다. 하지만 postgres에는 이미 내장된 full-text search(FTS) 기능이 있어서 굳이 ES를 도입하지 않아고 기본적인 검색과 랭킹을 쉽게 구현할 수 있습니다. 따라서 이러한 postgres의 native FTS에 대해 아래에서 자세히 살펴보겠습니다.

### Limitations of ‘LIKE’

많은 개발자가 데이터베이스에서 텍스트 검색을 구현할 때 가장 먼저 떠올리는 것은 `LIKE` 또는 `ILIKE` 연산자입니다. 이들은 특정 패턴과 일치하는 문자열을 찾는 데 유용하지만, 현대적인 검색 기능의 요구사항을 충족시키기에는 여러 가지 근본적인 한계를 가지고 있습니다. FTS이 왜 필요한지를 이해하려면, 먼저 `LIKE`의 한계를 명확히 알아야 합니다.

##### 언어적 맥락의 부재

`LIKE` 연산자는 텍스트를 단순한 문자열의 나열로 취급할 뿐, 그 안에 담긴 언어적 의미를 전혀 이해하지 못합니다. 예를 들어, 사용자가 'search'라는 단어로 검색했다고 가정해 봅시다. 단순 `LIKE '%search%'` 쿼리는 'searches', 'searching', 'searched'와 같이 동일한 어원에서 파생된 단어들을 전혀 찾아내지 못합니다. FTS는 이러한 단어들을 'search'라는 동일한 **어휘소(lexeme)**로 정규화하여 처리함으로써 이 문제를 해결합니다.

##### Stop Words로 인한 검색 노이즈

모든 언어에는 'a', 'the', 'is', 'in' (한국어의 경우 '은', '는', '이', '가' 등)과 같이 매우 흔하게 등장하지만 검색 결과의 변별력을 높이는 데는 거의 기여하지 못하는 단어들이 있습니다. 이러한 단어들을 **불용어(stop words)**라고 합니다. `LIKE`는 이러한 불용어들을 다른 단어들과 똑같이 취급하기 때문에 불필요한 노이즈를 발생시킵니다. 반면, FTS는 설정된 사전에 따라 이러한 불용어들을 처리 과정에서 자동으로 제거하여 핵심적인 단어에만 집중할 수 있게 해줍니다.

##### Relevancy 개념의 부재

`LIKE` 쿼리는 단순히 패턴이 일치하는지 여부(true/false)만을 반환합니다. 어떤 문서가 다른 문서보다 검색어와 '더 관련이 높은지' 판단할 수 있는 기준이 전혀 없습니다. 검색 결과는 테이블에 저장된 순서나 다른 컬럼에 따라 정렬될 뿐입니다. FTS는 검색어가 문서에 얼마나 자주 등장하는지 등을 계산하여 각 문서의 관련성 점수를 매기고, 이를 기준으로 결과를 정렬하는 **랭킹(Ranking)** 기능을 제공합니다.

##### 검색 성능 저하

`LIKE`의 가장 치명적인 단점은 성능입니다. 특히 `LIKE '%...%'`와 같이 패턴이 와일드카드(%)로 시작하는 쿼리는 데이터베이스의 표준 인덱스(B-Tree 인덱스)를 전혀 활용할 수 없습니다. 그 결과, 데이터베이스는 테이블의 모든 행을 처음부터 끝까지 하나씩 스캔해야 하는 **Full Table Scan**을 수행하게 됩니다. 이는 데이터가 몇만 건만 되어도 검색 속도가 급격히 느려지는 원인이 됩니다.

### Full-Text Search?

결론적으로, postgres의 full-text search는 `LIKE`가 가진 모든 한계를 극복하기 위해 설계된 시스템입니다. FTS는 단순히 문자열을 비교하는 것을 넘어, 다음과 같은 과정을 통해 지능적인 검색을 수행합니다:

- **전처리(Preprocessing)**: 텍스트를 검색에 최적화된 자료 구조로 미리 변환합니다.
- **언어 처리(Linguistic Processing)**: 어간 추출, 불용어 제거 등 언어적 규칙을 적용하여 단어를 정규화합니다.
- **랭킹(Ranking)**: 검색어와의 관련성을 계산하여 결과를 정렬합니다.
- **인덱싱(Indexing)**: 고속 검색을 위해 특화된 인덱스 구조를 사용합니다.

`LIKE`가 텍스트를 문자 단위로 보는 반면, FTS는 텍스트를 의미를 가진 어휘소(lexeme) 단위로 분석합니다. 'searching'과 'searched'가 모두 'search'라는 근본 개념에서 파생되었음을 이해하는 것이 FTS가 제공하는 지능적인 검색 경험의 핵심입니다.

### DataType: tsvector와 tsquery

PostgreSQL 전체 텍스트 검색의 모든 기능은 두 가지 핵심 데이터 타입, `tsvector`와 `tsquery`를 중심으로 구축됩니다. 간단히 말해, **`tsvector`는 검색 대상이 되는 '문서'**를 나타내고, **`tsquery`는 사용자가 입력한 '검색어'**를 나타냅니다.

##### tsvector

`tsvector`는 일반 텍스트(문서)를 검색에 최적화된 형태로 가공한 결과물입니다. 원본 텍스트를 그대로 저장하는 것이 아니라, 검색에 필요한 핵심 정보만을 담고 있는 특별한 자료 구조입니다. 이 변환 과정은 `to_tsvector` 함수를 통해 이루어집니다.

`tsvector`의 각 어휘소에는 `A`, `B`, `C`, `D` 네 단계의 가중치를 부여할 수 있습니다 (`A`가 가장 높음). 이는 문서 내에서 제목과 본문처럼 특정 부분의 중요도를 다르게 설정하여 랭킹에 영향을 주기 위해 사용됩니다. `setweight` 함수를 사용하면 이 기능을 구현할 수 있습니다.

```sql
SELECT
  setweight(to_tsvector('english', 'My Important Title'), 'A') ||
  setweight(to_tsvector('english', 'This is the long body text...'), 'D');
```

##### to_tsvector

`to_tsvector` 함수는 내부적으로 다음과 같은 정교한 파이프라인을 거쳐 텍스트를 `tsvector`로 변환합니다.

1. **파싱(Parsing)**: 입력된 텍스트를 공백, 구두점 등을 기준으로 잘라내어 **토큰(token)**으로 분리합니다.
2. **사전 처리(Dictionary Processing)**: 각 토큰은 설정된 사전을 통과하며 어근을 찾고(어간 추출), stop words를 제거하는 등 언어적 정규화를 수행합니다.
3. **어휘소(Lexeme)로 변환**: 정규화 과정을 거친 결과물을 **어휘소(lexeme)**라고 합니다.
4. **결과 구조**: 최종적으로 `tsvector`는 중복이 제거되고 알파벳순으로 정렬된 어휘소 목록과 원본 문서에서의 위치 정보를 함께 저장합니다.

예를 들어, 다음 쿼리를 실행해 보겠습니다.

```sql
SELECT to_tsvector('english', 'I refuse to take an order refusing.');
```

결과는 다음과 같습니다.

```
'order':5 'refus':2,6 'take':4
```

- stop words인 'I', 'to', 'an'은 제거되었습니다.
- 'refuse'와 'refusing'은 모두 'refus'라는 어휘소로 정규화되었습니다.
- 'refus'는 원본 텍스트에서 2번째와 6번째 단어였음을 위치 정보 `(2,6)`을 통해 알 수 있습니다.

##### tsquery

`tsquery`는 사용자의 검색어를 파싱하고 정규화하여, `tsvector`와 비교할 수 있는 형태로 만든 데이터 타입입니다. `tsquery`는 하나 이상의 어휘소와 boolean 연산자의 조합으로 구성됩니다.

##### Operators

- **`&` (AND)**: 두 어휘소가 모두 존재해야 함. (`'darth' & 'vader'`)
- **`|` (OR)**: 두 어휘소 중 하나 이상 존재해야 함. (`'luke' | 'leia'`)
- **`!` (NOT)**: 특정 어휘소가 존재하지 않아야 함. (`'darth' & !'father'`)
- **`<->` (FOLLOWED BY)**: 두 어휘소가 순서대로 인접하게 나타나야 함 (구문 검색). (`'luke' <-> 'skywalker'`)
- **`:\*` (Prefix Match)**: 특정 접두사로 시작하는 모든 어휘소를 찾음. (`'skywalk:*'`)

##### Functions

- **`to_tsquery(text)`**: 입력 텍스트에 이미 `&`, `|` 같은 연산자가 포함되어 있다고 가정하고 파싱합니다.
- **`plainto_tsquery(text)`**: 일반 텍스트를 입력받아 모든 단어 사이에 `&` (AND) 연산자를 삽입합니다. 가장 단순하고 안전한 방식입니다.
- **`websearch_to_tsquery(text)`**: 웹 검색 엔진 문법을 일부 이해하여 공백을 `&`로, `-`를 `!`로, 따옴표로 묶인 구문을 `<->`로 변환합니다. 사용자 검색창에 가장 적합합니다.

##### '@@' Operator

`tsvector`와 `tsquery`가 준비되었다면, `@@` 매칭 연산자를 사용하여 문서가 검색어와 일치하는지 확인합니다. `tsvector @@ tsquery` 구문은 `tsvector`가 `tsquery`의 조건을 만족하면 `true`를 반환합니다.

전체적인 검색 쿼리는 다음과 같습니다.

```sql
SELECT title
FROM movies
WHERE to_tsvector('english', title || ' ' || plot) @@ websearch_to_tsquery('english', 'darth vader');
```

이 구조 덕분에, 다음에 살펴볼 GIN 인덱스를 통해 검색 속도를 극적으로 향상시킬 수 있습니다.

### GIN Index

PostgreSQL FTS의 강력한 기능을 실제로 사용하기 위해서는 반드시 인덱스를 생성해야 합니다. PostgreSQL은 FTS를 위해 특별히 설계된 GIN(Generalized Inverted Index)이라는 강력한 인덱스 타입을 제공합니다. '역 인덱스(inverted index)'는 책의 '찾아보기'와 같습니다. 특정 단어가 어느 페이지에 있는지 바로 알려주듯이, GIN 인덱스는 특정 어휘소가 어떤 행에 포함되어 있는지 즉시 찾아줍니다.

##### GIN 인덱스의 내부 구조

GIN 인덱스는 내부적으로 `(key, posting list)` 쌍의 집합을 저장합니다.

- **Key (키)**: 검색 대상이 되는 최소 단위, 즉 '어휘소(lexeme)'입니다.
- **Posting List (포스팅 목록)**: 해당 키(어휘소)를 포함하고 있는 모든 행(row)의 ID 목록입니다.

##### GIN 인덱스가 효율적인 이유

`'darth' & 'vader'`라는 `tsquery`를 처리할 때, GIN 인덱스는 다음과 같이 동작합니다.

1. 인덱스에서 'darth' 키를 찾아 포스팅 목록(예: `[row1, row5, row10]`)을 가져옵니다.
2. 인덱스에서 'vader' 키를 찾아 포스팅 목록(예: `[row5, row12, row20]`)을 가져옵니다.
3. 두 포스팅 목록의 교집합(intersection)인 `[row5]`를 계산합니다.
4. 데이터베이스는 이제 테이블 전체를 스캔할 필요 없이, 단지 `row5` 행 하나만 읽어오면 됩니다.

이처럼 GIN 인덱스는 대규모 테이블 스캔을 매우 효율적인 집합 연산으로 대체하여 검색 속도를 획기적으로 개선합니다.

##### GIN vs. GiST

PostgreSQL에는 GIN 외에 FTS에 사용할 수 있는 GiST 인덱스도 있습니다.

- **검색 속도**: GIN이 GiST보다 일반적으로 약 3배 더 빠릅니다.
- **업데이트 속도**: GIN은 업데이트가 GiST보다 느립니다. (최신 버전에서는 완화됨)
- **인덱스 크기**: GIN이 GiST보다 일반적으로 더 큽니다.

결론적으로, 검색이 빈번하고 데이터 업데이트가 상대적으로 적은 대부분의 FTS 워크로드에서는 **GIN 인덱스**가 월등히 나은 선택입니다.

##### GIN 인덱스 구축 가이드

관리의 용이성을 위해 `tsvector` 데이터를 저장할 전용 컬럼을 추가하는 것이 좋습니다.

```sql
ALTER TABLE movies ADD COLUMN search_vector tsvector;
```

`coalesce` 함수를 사용하여 `NULL` 컬럼을 안전하게 처리하며 기존 데이터를 채웁니다.

```sql
UPDATE movies SET search_vector =
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(plot, ''));
```

새로 만든 `search_vector` 컬럼 위에 GIN 인덱스를 생성합니다.

```sql
CREATE INDEX movies_search_idx ON movies USING GIN (search_vector);
```

데이터가 변경될 때마다 `search_vector` 컬럼이 자동으로 갱신되도록 트리거를 설정하는 것이 best practice 입니다.

```sql
CREATE OR REPLACE FUNCTION movies_search_vector_update() RETURNS trigger AS $$
BEGIN
    new.search_vector :=
        to_tsvector('pg_catalog.english', coalesce(new.title, '') || ' ' || coalesce(new.plot, ''));
    return new;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON movies FOR EACH ROW EXECUTE PROCEDURE movies_search_vector_update();
```

이제 `movies` 테이블에 대한 모든 변경 사항이 자동으로 `search_vector`에 반영되고, GIN 인덱스는 항상 최신 상태를 유지하게 됩니다.

### Ranking: ts\_rank와 ts\_rank\_cd

검색 결과 중에서 사용자가 가장 원할 만한, 즉 '가장 관련성 높은' 문서를 맨 위에 보여주는 것이 중요합니다. PostgreSQL FTS는 이를 위한 정교한 랭킹 함수를 제공합니다.

- **`ts_rank(tsvector, tsquery)`**: 주로 **용어 빈도(Term Frequency, TF)**를 고려합니다. 검색어가 문서에 얼마나 자주 등장하는지를 기반으로 점수를 매깁니다.
- **`ts_rank_cd(tsvector, tsquery)`**: **커버 밀도(Cover Density, CD)** 개념을 사용합니다. 용어 빈도뿐만 아니라, 검색어들이 문서 내에서 서로 **얼마나 가깝게 위치하는지(근접성, proximity)**를 함께 고려하여 더 품질 높은 랭킹 결과를 제공하는 경향이 있습니다.

`SELECT` 절에서 랭킹 점수를 계산하고, `ORDER BY` 절에서 이 점수를 기준으로 내림차순 정렬하면 됩니다.

```sql
SELECT
    title,
    plot,
    ts_rank_cd(search_vector, websearch_to_tsquery('english', 'darth vader')) as rank
FROM movies
WHERE search_vector @@ websearch_to_tsquery('english', 'darth vader')
ORDER BY rank DESC
LIMIT 10;
```

##### normalization 옵션을 이용한 랭킹 미세 조정

`ts_rank`와 `ts_rank_cd` 함수는 세 번째 인자로 정수 값을 받는 `normalization` 옵션을 제공합니다. 이 옵션은 문서의 길이를 고려하여 랭킹 알고리즘을 미세 조정하는 데 사용됩니다. 예를 들어, 이 옵션을 사용하면 내용이 긴 문서가 단순히 단어가 많다는 이유만으로 짧고 핵심적인 문서보다 높은 순위를 차지하는 문제를 보정할 수 있습니다.

| 플래그 값  | 설명                                    | 랭킹에 미치는 영향                             |
| ---------- | --------------------------------------- | ---------------------------------------------- |
| 0 (기본값) | 문서 길이를 무시합니다.                 | 긴 문서가 유리할 수 있습니다.                  |
| 1          | 순위를 `1 + log(문서 길이)`로 나눕니다. | 일반적으로 사용하기 좋은 균형 잡힌 옵션입니다. |
| 2          | 순위를 문서 길이로 나눕니다.            | 짧고 간결한 문서를 선호할 때 효과적입니다.     |
| 8          | 순위를 문서 내 고유 단어 수로 나눕니다. | 주제가 많고 장황할수록 순위를 감소시킵니다.    |

```sql
SELECT title, ts_rank_cd(search_vector, query, 1) as rank
...
```

##### PostgreSQL 랭킹의 구조적 특징과 한계

Elasticsearch와 같은 전문 검색 엔진은 '용어 빈도(TF)'뿐만 아니라 '역문서 빈도(Inverse Document Frequency, IDF)'라는 개념을 사용합니다. IDF는 특정 단어가 전체 문서 집합에서 얼마나 희귀하게 등장하는지를 나타내는 지표로, 희귀한 단어가 포함된 문서에 더 높은 가중치를 줍니다.

PostgreSQL의 `ts_rank` 함수는 이러한 전역적인 통계 정보(global statistics)에 접근하지 않고, 오직 현재 처리 중인 단일 문서의 정보만을 보고 점수를 계산합니다. 이는 데이터베이스와의 긴밀한 통합과 아키텍처 단순화를 위해 선택한 중요한 설계적 트레이드오프입니다. 이 구조적 차이가 PostgreSQL FTS와 Elasticsearch 간의 가장 근본적인 차이점 중 하나입니다.

### Postgres FTS vs. ElasticSearch

| 측면               | PostgreSQL FTS                                               | Elasticsearch                                                |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **인프라 복잡성**  | **낮음**: 기존 PostgreSQL 활용, 추가 관리 부담 없음.         | **높음**: 별도 클러스터 구축 및 운영 필요, 비용 증가.        |
| **데이터 동기화**  | **불필요**: 완벽한 실시간 데이터 일관성 보장.                | **필수**: 데이터 동기화 필요, '거의 실시간(near real-time)' 일관성. |
| **데이터 일관성**  | **강력함 (ACID)**: 트랜잭션과 완벽하게 일치.                 | **최종적/문서 단위**: 트랜잭션 무결성 미지원.                |
| **확장성**         | **수직적 확장**: 서버 사양 증설. 읽기 복제본으로 부하 분산 가능. | **수평적 확장**: 샤딩을 통해 대규모 수평 확장 지원.          |
| **랭킹 알고리즘**  | **ts\_rank, ts\_rank\_cd**: 전역 IDF 개념 없음.              | **BM25 (기본값)**: 더 우수한 확률론적 모델, 고품질 기본 관련성. |
| **고급 기능**      | **DIY (직접 구현)**: 오타 허용(Fuzziness), 집계 등은 직접 구현 필요. | **내장 기능**: Fuzziness, 강력한 집계/패싯(Faceting) 등 내장. |
| **생태계 및 강점** | **관계형 데이터의 힘**: JOIN, 제약 조건 등 모든 SQL 기능과 완벽 통합. | **검색 및 분석의 강자**: 문서 지향적, 복잡한 집계, 로그 분석에 최적화. |

기존 CRUD 중심 애플리케이션에 검색 기능을 '추가'하는 경우 (예: 관리자 페이지 검색)에는 PostgreSQL FTS가 더 적합합니다. 운영 복잡성이 극적으로 줄어들어 단순하고, 검색 결과가 실제 데이터와 100% 일치하며, 아주 복잡한 기능이 필수는 아닌 경우에 충분한 성능과 기능을 제공합니다.

검색 기능 자체가 서비스의 '핵심'인 경우(예: 이커머스 플랫폼)엔 Elasticsearch가 더 적합("Postgres + ES" 아키텍처)합니다. 이런 경우엔 BM25, Fuzziness, 패싯 내비게이션 등은 포기할 수 없는 필수 기능이며, 수억 건 이상의 데이터와 수평적 확장이 반드시 필요할 때 유일한 대안이고, 복잡한 데이터 집계 및 분석 기능이 요구될 때 강력합니다.

### Conclusion

PostgreSQL FTS는 단순히 LIKE의 대안을 넘어, 수많은 애플리케이션의 검색 요구사항을 충분히 만족시킬 수 있는 강력하고 완성도 높은 솔루션입니다. 핵심 강점은 단순성, 데이터 일관성, 그리고 기존 데이터베이스와의 완벽한 통합에 있습니다.

대부분의 프로젝트에 권장하는 접근 방식은 기본적으로 PostgreSQL FTS를 먼저 선택하는 것입니다. 분산 검색 클러스터 운영의 복잡성과 비용은 결코 가볍지 않습니다. 이미 잘 알고 있는 PostgreSQL 안에서 트랜잭션의 보호를 받으며 검색 기능을 구현할 수 있다는 것은 엄청난 장점입니다. 따라서 PostgreSQL FTS로 시작하여 그 기능을 최대한 활용해 보시는 것을 추천드립니다. 그러다가 프로젝트가 성장하여 다음과 같은 명확한 한계점에 도달했을 때, 비로소 다음 단계를 고민해도 늦지 않습니다.

- 성능적 한계: 특정 검색 쿼리의 응답 시간이 비즈니스 요구사항을 지속적으로 초과하는가?
- 기능적 한계: 오타 자동 보정이나 동적인 패싯과 같은 고급 기능이 비즈니스 성공에 결정적인 요소가 되었는가?
- 확장성 한계: 단일 PostgreSQL 마스터의 한계를 넘어 수평적 확장이 반드시 필요한 규모에 도달했는가?

이러한 질문에 '예'라고 답할 수 있을 때, Elasticsearch와 같은 전문 검색 엔진 도입을 고려하시는 것을 추천드립니다. 기술 선택은 여정과 같습니다. 이미 쉽게 도입할 수 있는 강력한 도구인 PostgreSQL FTS를 먼저 숙지하는 것이 좋습니다. 이는 여러분의 애플리케이션을 빠르고 견고하게 만들어 줄 것이며, 진정으로 더 큰 규모의 도전이 필요해졌을 때 다음 단계로 나아갈 수 있는 튼튼한 기반이 되어줄 것이라 생각합니다.
