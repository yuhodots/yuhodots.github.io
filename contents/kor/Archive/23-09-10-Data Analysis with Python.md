---
title: "Data Analysis with Python"
date: "2023-09-10"
template: "post"
draft: true
path: "/cheatsheet/23-09-10/"
description: "작성중"
category: "Cheat Sheet"
---

> 작성중

### EDA

##### pandas

- groupby
- head, tail
- iloc,
- isna, isnull, iszero
- value_counts()

### Vizualization

##### matplot.lib

- subplot
- plot
- axis 등에 대한 설명
- plot( kind='area', stakced=True)

### Database

- GitHub / career / sql 폴더 readme 참고하기

##### MySQL

```
SELECT 보고싶은 칼럼 FROM table명 
		WHERE 조건 
		GROUP BY 묶는 기준 
		ORDER BY 정렬 기준 
		LIKE 문자열 조건 
		LIMIT 보고싶은 갯수
				OFFSET 앞에서부터 ~개 빼고
				...;
```



##### pymysql



##### MongoDB



##### pymongo



### ETL

##### boto3



##### RedShift

- result: pandas.DataFrame = cursor.fetch_dataframe()
- commit 해야되나 말아야 하나에 대한 내용
- https://docs.aws.amazon.com/ko_kr/redshift/latest/mgmt/python-connect-examples.html
