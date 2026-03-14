---
title: "Data Analysis with Python"
date: "2023-09-10"
template: "post"
draft: true
path: "/cheatsheet/23-09-10/"
description: "Work in progress"
category: "Cheat Sheet"
---

> Work in progress

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
- Description of axis, etc.
- plot( kind='area', stacked=True)

### Database

- Refer to the GitHub / career / sql folder README

##### MySQL

```
SELECT columns_to_view FROM table_name
		WHERE condition
		GROUP BY grouping_criterion
		ORDER BY sorting_criterion
		LIKE string_condition
		LIMIT number_to_view
				OFFSET skip_first_n
				...;
```



##### pymysql



##### MongoDB



##### pymongo



### ETL

##### boto3



##### RedShift

- result: pandas.DataFrame = cursor.fetch_dataframe()
- Notes on whether or not to commit
- https://docs.aws.amazon.com/ko_kr/redshift/latest/mgmt/python-connect-examples.html
