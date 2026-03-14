---
title: "PostgreSQL Full-Text Search"
date: "2025-09-30"
template: "post"
draft: false
path: "/backend/25-09-30/"
description: "When dealing with large volumes of data of any kind, you will inevitably encounter search-related tasks at some point. While there are many ways to implement search, one of the simplest approaches is to store documents in a database like Postgres and implement search by querying Postgres..."
category: "BackEnd"
thumbnail: "postgres"
---

> This post was written to understand the core concepts of PostgreSQL Full-Text Search. The content was initially compiled using Gemini deep research, then manually reviewed and refined.

When dealing with large volumes of data of any kind, you will inevitably encounter search-related tasks at some point. While there are many ways to implement search, one of the simplest approaches is to store documents in a database like Postgres and implement search by querying it.

The simplest query to start with is the LIKE statement, but it quickly runs into performance and functional limitations. In particular, sophisticated features like showing the most relevant documents first among numerous results -- rather than simply determining whether a specific string is contained or not -- are impossible with simple string comparisons alone.

To solve these problems, many projects introduce separate search engines like Elasticsearch, but this brings new challenges of infrastructure complexity, data synchronization, and increased operational costs. However, Postgres already has a built-in full-text search (FTS) feature, so you can easily implement basic search and ranking without introducing ES. Let's take a closer look at Postgres's native FTS below.

### Limitations of 'LIKE'

When implementing text search in a database, the first thing many developers think of is the `LIKE` or `ILIKE` operator. While these are useful for finding strings matching specific patterns, they have several fundamental limitations that prevent them from meeting the requirements of modern search functionality. To understand why FTS is needed, you must first clearly understand the limitations of `LIKE`.

##### Lack of Linguistic Context

The `LIKE` operator treats text as a simple sequence of characters and has no understanding of the linguistic meaning within. For example, suppose a user searches for the word 'search'. A simple `LIKE '%search%'` query cannot find words derived from the same root, such as 'searches', 'searching', or 'searched'. FTS solves this problem by normalizing these words into the same **lexeme**, 'search'.

##### Search Noise from Stop Words

Every language has words that appear very frequently but contribute almost nothing to the discriminative power of search results -- words like 'a', 'the', 'is', 'in'. These words are called **stop words**. `LIKE` treats these stop words the same as any other word, generating unnecessary noise. In contrast, FTS automatically removes these stop words during processing according to configured dictionaries, allowing the search to focus only on essential words.

##### Lack of Relevancy

`LIKE` queries simply return whether a pattern matches or not (true/false). There is no criterion to determine whether one document is 'more relevant' to the search term than another. Search results are sorted only by the order stored in the table or by other columns. FTS provides a **ranking** feature that calculates a relevancy score for each document based on factors like how frequently the search term appears in the document and sorts results accordingly.

##### Search Performance Degradation

The most critical drawback of `LIKE` is performance. In particular, queries where the pattern starts with a wildcard (%), like `LIKE '%...%'`, cannot utilize standard database indexes (B-Tree indexes) at all. As a result, the database must perform a **Full Table Scan**, scanning every row in the table from beginning to end. This causes search speed to degrade dramatically even with just tens of thousands of records.

### Full-Text Search?

In conclusion, PostgreSQL's full-text search is a system designed to overcome all the limitations of `LIKE`. Going beyond simple string comparison, FTS performs intelligent search through the following processes:

- **Preprocessing**: Converts text into data structures optimized for search in advance.
- **Linguistic Processing**: Normalizes words by applying linguistic rules such as stemming and stop word removal.
- **Ranking**: Calculates relevancy to the search terms and sorts results.
- **Indexing**: Uses specialized index structures for high-speed search.

While `LIKE` views text at the character level, FTS analyzes text at the lexeme level -- units of meaning. Understanding that 'searching' and 'searched' are both derived from the fundamental concept of 'search' is the core of the intelligent search experience that FTS provides.

### DataType: tsvector and tsquery

All PostgreSQL full-text search functionality is built around two core data types: `tsvector` and `tsquery`. Simply put, **`tsvector` represents the 'document'** that is the search target, and **`tsquery` represents the 'search term'** entered by the user.

##### tsvector

`tsvector` is the result of processing plain text (a document) into a form optimized for search. Rather than storing the original text as-is, it is a special data structure containing only the essential information needed for search. This conversion is performed through the `to_tsvector` function.

Each lexeme in a `tsvector` can be assigned one of four weight levels: `A`, `B`, `C`, `D` (`A` being the highest). This is used to set different importance levels for specific parts of a document, such as the title versus the body, to influence ranking. The `setweight` function can be used to implement this.

```sql
SELECT
  setweight(to_tsvector('english', 'My Important Title'), 'A') ||
  setweight(to_tsvector('english', 'This is the long body text...'), 'D');
```

##### to_tsvector

The `to_tsvector` function internally converts text into a `tsvector` through the following sophisticated pipeline:

1. **Parsing**: The input text is split into **tokens** based on whitespace, punctuation, etc.
2. **Dictionary Processing**: Each token passes through configured dictionaries to find root forms (stemming), remove stop words, and perform other linguistic normalization.
3. **Conversion to Lexemes**: The results of the normalization process are called **lexemes**.
4. **Result Structure**: The final `tsvector` stores a deduplicated, alphabetically sorted list of lexemes along with their position information in the original document.

For example, let's run the following query:

```sql
SELECT to_tsvector('english', 'I refuse to take an order refusing.');
```

The result is:

```
'order':5 'refus':2,6 'take':4
```

- The stop words 'I', 'to', 'an' have been removed.
- 'refuse' and 'refusing' have both been normalized to the lexeme 'refus'.
- The position information `(2,6)` tells us that 'refus' appeared as the 2nd and 6th words in the original text.

##### tsquery

`tsquery` is a data type that parses and normalizes the user's search terms into a form that can be compared with a `tsvector`. A `tsquery` consists of one or more lexemes combined with boolean operators.

##### Operators

- **`&` (AND)**: Both lexemes must exist. (`'darth' & 'vader'`)
- **`|` (OR)**: At least one of the two lexemes must exist. (`'luke' | 'leia'`)
- **`!` (NOT)**: A specific lexeme must not exist. (`'darth' & !'father'`)
- **`<->` (FOLLOWED BY)**: Two lexemes must appear adjacent and in order (phrase search). (`'luke' <-> 'skywalker'`)
- **`:\*` (Prefix Match)**: Finds all lexemes starting with a specific prefix. (`'skywalk:*'`)

##### Functions

- **`to_tsquery(text)`**: Assumes the input text already contains operators like `&` and `|`, and parses accordingly.
- **`plainto_tsquery(text)`**: Takes plain text input and inserts `&` (AND) operators between all words. The simplest and safest method.
- **`websearch_to_tsquery(text)`**: Understands some web search engine syntax, converting spaces to `&`, `-` to `!`, and quoted phrases to `<->`. Most suitable for user search input fields.

##### '@@' Operator

Once `tsvector` and `tsquery` are prepared, the `@@` matching operator is used to check whether a document matches the search terms. The `tsvector @@ tsquery` syntax returns `true` if the `tsvector` satisfies the `tsquery` conditions.

A complete search query looks like this:

```sql
SELECT title
FROM movies
WHERE to_tsvector('english', title || ' ' || plot) @@ websearch_to_tsquery('english', 'darth vader');
```

Thanks to this structure, search speed can be dramatically improved through the GIN index, which we will examine next.

### GIN Index

To actually use PostgreSQL FTS's powerful features, you must create an index. PostgreSQL provides a powerful index type called GIN (Generalized Inverted Index) specifically designed for FTS. An 'inverted index' works like a book's index. Just as it immediately tells you which page a specific word is on, a GIN index instantly finds which rows contain a specific lexeme.

##### Internal Structure of GIN Index

A GIN index internally stores a set of `(key, posting list)` pairs.

- **Key**: The smallest searchable unit, i.e., a 'lexeme'.
- **Posting List**: A list of all row IDs that contain that key (lexeme).

##### Why GIN Index Is Efficient

When processing a `tsquery` like `'darth' & 'vader'`, the GIN index operates as follows:

1. Finds the 'darth' key in the index and retrieves its posting list (e.g., `[row1, row5, row10]`).
2. Finds the 'vader' key in the index and retrieves its posting list (e.g., `[row5, row12, row20]`).
3. Computes the intersection of the two posting lists: `[row5]`.
4. The database now only needs to read a single row, `row5`, without scanning the entire table.

In this way, GIN indexes dramatically improve search speed by replacing large-scale table scans with highly efficient set operations.

##### GIN vs. GiST

PostgreSQL also has a GiST index that can be used for FTS in addition to GIN.

- **Search Speed**: GIN is generally about 3x faster than GiST.
- **Update Speed**: GIN updates are slower than GiST (mitigated in recent versions).
- **Index Size**: GIN is generally larger than GiST.

In conclusion, for most FTS workloads where searches are frequent and data updates are relatively infrequent, the **GIN index** is the superior choice.

##### GIN Index Build Guide

For ease of management, it is recommended to add a dedicated column to store `tsvector` data.

```sql
ALTER TABLE movies ADD COLUMN search_vector tsvector;
```

Use the `coalesce` function to safely handle `NULL` columns while populating existing data.

```sql
UPDATE movies SET search_vector =
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(plot, ''));
```

Create a GIN index on the new `search_vector` column.

```sql
CREATE INDEX movies_search_idx ON movies USING GIN (search_vector);
```

Setting up a trigger to automatically update the `search_vector` column whenever data changes is best practice.

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

Now all changes to the `movies` table will be automatically reflected in `search_vector`, and the GIN index will always stay up to date.

### Ranking: ts\_rank and ts\_rank\_cd

It is important to show the 'most relevant' documents -- the ones the user is most likely looking for -- at the top of the search results. PostgreSQL FTS provides sophisticated ranking functions for this purpose.

- **`ts_rank(tsvector, tsquery)`**: Primarily considers **Term Frequency (TF)**. It scores documents based on how frequently the search terms appear in the document.
- **`ts_rank_cd(tsvector, tsquery)`**: Uses the **Cover Density (CD)** concept. In addition to term frequency, it also considers how **closely the search terms are positioned to each other (proximity)** within the document, tending to produce higher-quality ranking results.

Calculate the ranking score in the `SELECT` clause and sort by this score in descending order in the `ORDER BY` clause.

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

##### Fine-Tuning Ranking with Normalization Options

The `ts_rank` and `ts_rank_cd` functions accept a `normalization` option as a third integer argument. This option is used to fine-tune the ranking algorithm by considering document length. For example, using this option can correct the problem where longer documents rank higher than shorter, more concise documents simply because they contain more words.

| Flag Value | Description | Effect on Ranking |
| ---------- | --------------------------------------- | ---------------------------------------------- |
| 0 (default) | Ignores document length. | Longer documents may be favored. |
| 1 | Divides rank by `1 + log(document length)`. | A generally good balanced option. |
| 2 | Divides rank by document length. | Effective when shorter, concise documents are preferred. |
| 8 | Divides rank by the number of unique words in the document. | Reduces rank for documents that are verbose with many topics. |

```sql
SELECT title, ts_rank_cd(search_vector, query, 1) as rank
...
```

##### Structural Characteristics and Limitations of PostgreSQL Ranking

Specialized search engines like Elasticsearch use not only 'Term Frequency (TF)' but also a concept called 'Inverse Document Frequency (IDF)'. IDF is a metric that indicates how rarely a specific word appears across the entire document collection, giving higher weight to documents containing rare words.

PostgreSQL's `ts_rank` function does not access such global statistics and calculates scores based solely on information from the single document currently being processed. This is an important design trade-off chosen for tight integration with the database and architectural simplicity. This structural difference is one of the most fundamental differences between PostgreSQL FTS and Elasticsearch.

### Postgres FTS vs. ElasticSearch

| Aspect | PostgreSQL FTS | Elasticsearch |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Infrastructure Complexity** | **Low**: Utilizes existing PostgreSQL, no additional management burden. | **High**: Requires separate cluster setup and operations, increased costs. |
| **Data Synchronization** | **Not required**: Perfect real-time data consistency guaranteed. | **Required**: Data synchronization needed, 'near real-time' consistency. |
| **Data Consistency** | **Strong (ACID)**: Perfectly aligned with transactions. | **Eventual/Document-level**: No transaction integrity support. |
| **Scalability** | **Vertical scaling**: Server spec upgrades. Read replicas for load distribution. | **Horizontal scaling**: Supports large-scale horizontal scaling through sharding. |
| **Ranking Algorithm** | **ts\_rank, ts\_rank\_cd**: No global IDF concept. | **BM25 (default)**: Superior probabilistic model, high-quality default relevance. |
| **Advanced Features** | **DIY (build it yourself)**: Fuzziness, aggregations, etc. must be implemented manually. | **Built-in features**: Fuzziness, powerful aggregations/faceting, etc. built in. |
| **Ecosystem & Strengths** | **Power of relational data**: Perfect integration with all SQL features like JOIN, constraints. | **Search & analytics powerhouse**: Document-oriented, optimized for complex aggregations and log analysis. |

When 'adding' search functionality to existing CRUD-centric applications (e.g., admin page search), PostgreSQL FTS is more suitable. It dramatically reduces operational complexity, search results are 100% consistent with actual data, and it provides sufficient performance and functionality when highly complex features are not essential.

When search functionality itself is the 'core' of the service (e.g., e-commerce platforms), Elasticsearch is more suitable (a "Postgres + ES" architecture). In such cases, BM25, Fuzziness, and faceted navigation are indispensable features; it is the only option when horizontal scaling with hundreds of millions of records is necessary; and it is powerful when complex data aggregation and analysis features are required.

### Conclusion

PostgreSQL FTS is not just an alternative to LIKE, but a powerful and mature solution that can sufficiently satisfy the search requirements of a vast number of applications. Its core strengths lie in simplicity, data consistency, and perfect integration with the existing database.

The recommended approach for most projects is to choose PostgreSQL FTS first. The complexity and cost of operating a distributed search cluster is by no means trivial. Being able to implement search functionality within the familiar PostgreSQL environment, protected by transactions, is a tremendous advantage. Therefore, I recommend starting with PostgreSQL FTS and leveraging its capabilities to the fullest. When your project grows and reaches clear limitations like the following, it is not too late to consider the next step.

- Performance limitations: Does the response time for certain search queries consistently exceed business requirements?
- Functional limitations: Have advanced features like automatic typo correction and dynamic facets become critical factors for business success?
- Scalability limitations: Have you reached a scale that absolutely requires horizontal scaling beyond the limits of a single PostgreSQL master?

When you can answer 'yes' to these questions, I recommend considering the adoption of a specialized search engine like Elasticsearch. Technology choices are like a journey. It is best to first master PostgreSQL FTS, a powerful tool that is already easy to adopt. It will make your application fast and robust, and I believe it will serve as a solid foundation for taking the next step when you truly need to tackle larger-scale challenges.
