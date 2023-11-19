---
title: "Using Databases as an AI Engineer (feat. Qdrant)"
date: "2023-11-19"
template: "post"
draft: false
path: "/MLOps/23-11-19/"
description: "데이터 기반의 의사결정을 하거나, 새로운 AI 알고리즘이나 rule을 서비스에 추가하기 위해서, 여러 다양한 데이터를 가공하고, DB에 넣고, querying 할 필요가 있습니다. 따라서 본 포스팅에서는 기본적인 vector DB 사용법 부터 query 문, 시각화 방법 등, AI/Data Engineer로 일하며 필요한 기술들을 기록합니다."
category: "MLOps"
thumbnail: "mlops"
---

> 데이터 기반의 의사결정을 하거나, 새로운 AI 알고리즘이나 rule을 서비스에 추가하기 위해서, raw data, ETL data, embedding data등과 같이 여러 다양한 데이터를 가공하고, DB에 넣고, querying 할 필요가 있습니다. 따라서 본 포스팅에서는 기본적인 vector DB 사용법 부터 query 문, 시각화 방법 등, AI/Data Engineer로 일하며 필요한 기술들을 기록합니다.

### Qdrant

- Qdrant는 vector DB로 보기보다는 *vector search engine*으로 봐야 함
- Qdrant $\to$ Collection $\to$ Shard $\to$ Segment. 이 부분은 다른 search engine 들과 비교해보면 좋을듯
- Collections: points(vectors with a payload)의 집합
- Points: vector와 payload(optional)로 구성
- Payload: vector와 함께 저장 가능한 추가 정보
- Search: 기본적으로 dot, cos, euc similarity search 제공
- Index: 필터링 속도 향상을 위한 payload index와 vector search 속도 향상을 위한 vector index 존재

##### Vector Search with HNSW

HNSW는 벡터 검색 알고리즘 중 하나인데 qdrant의 작동을 이해하기 위해 중요합니다. NHN Forward [발표](https://www.youtube.com/watch?v=hCqF4tDPNBw)에서도 잘 설명해주고 있어 이를 참고 하였습니다.

- k-Nearest Neighbor: 검색 대상 벡터와 모든 벡터와의 거리를 계산하여 가장 가까운 k개를 리턴하는 방식
- Approximate Nearest Neighbor (e.g., ANNOY): Spotify에서 개발한 tree-based ANN 기법으로 정확도를 조금 줄이는 대신 검색 속도를 높임. 전체 벡터를 여러 공간으로 분할하여 tree 형태의 자료구조 만들어 검색 수행. 데이터 들어올 때 마다 자료구조 다시 만들어야 해서 데이터 추가시 빌드 비용 높음
- Hierarchical Navigable Small World: [Skip-list](https://en.wikipedia.org/wiki/Skip_list)와 Navigable small world 개념에 영향을 받은 방식
  - 아래 이미지의 오른쪽을 보면 이해가 쉬운데, 초록색 query에 대해서 빨간색 start point 부터 검색을 시작할 때, 한 번 nearest neighbor을 찾을 때 마다 깊은 layer로 내려간다고 생각하면 됨 (greedy search)
  - 데이터 추가가 쉽고, 데이터 경향성에 따라 성능 차이 있음. 클러스링 데이터 대해 응답속도 빠르고 재현율도 높음
- HNSW challenges: (1) 여전히 데이터 index 빌드 타임 소요 (2) 100% 정확도/재현율 보장하지 않음 (3) Sequetial read pattern을 가져서 병렬화 불가능. Qdrant는 이런 점들 보완하기 위해 quatization & oversampling 활용
- Filterable HNSW(payload-based refinement): post-filtering, pre-filtering이 비효율적이기 때문에 in-place filtering 방식으로 구현

<center><img src="../img/23-11-19-1.png"><p><i>Taken From, Yury A. Malkov, et al.</i></p></center>

##### Python qdrant client

1. Client initialization

```python
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct
from qdrant_client.http.models import Filter, FieldCondition, MatchValue
client = QdrantClient("localhost", port=6333)
```

2. Collection 생성

```python
client.create_collection(
    collection_name="test_collection",
    vectors_config=VectorParams(size=4, distance=Distance.DOT),
)
```

3. Vector 추가

```python
operation_info = client.upsert(
    collection_name="test_collection",
    wait=True,
    points=[
        PointStruct(id=1, vector=[0.05, 0.61, 0.76, 0.74], payload={"city": "Berlin"}),
        PointStruct(id=2, vector=[0.19, 0.81, 0.75, 0.11], payload={"city": "London"}),
        PointStruct(id=3, vector=[0.36, 0.55, 0.47, 0.94], payload={"city": "Moscow"}),
    ],
)
```

4. Query 실행

```python
# run a query without filter
search_result = client.search(
    collection_name="test_collection", query_vector=[0.2, 0.1, 0.9, 0.7], limit=2
)

# run a query with filter
search_result = client.search(
    collection_name="test_collection",
    query_vector=[0.2, 0.1, 0.9, 0.7],
    query_filter=Filter(must=[FieldCondition(key="city", match=MatchValue(value="London"))]),
    limit=2,
)
```

### SQL

##### Pymysql

##### Redshift 

##### Redash

### NoSQL

##### Pymongo

### References

- https://qdrant.tech/documentation/quick-start/
- [Qdrant: Getting Started with Qdrant](https://www.youtube.com/watch?v=lFMKUCNw5ac)
- [Qdrant: Image Classification with Qdrant Vector Semantic Search](https://www.youtube.com/watch?v=sNFmN16AM1o)
- [Qdrant: Open Source Vector Search Engine and Vector Database Andrey Vasnetsov](https://www.youtube.com/watch?v=lFMKUCNw5ac)
- [[NHN FORWARD 22] 대충? 거의 정확하다! 벡터 검색 엔진에 ANN HNSW 알고리즘 도입기 (feat. SWIG Golang)](https://www.youtube.com/watch?v=hCqF4tDPNBw)
- Yury A. Malkov, et al. "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs"

