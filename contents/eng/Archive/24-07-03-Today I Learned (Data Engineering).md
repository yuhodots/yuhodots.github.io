---
title: "Today I Learned (Data Engineering)"
date: "2024-07-03"
template: "post"
draft: false
path: "/cheatsheet/24-07-03/"
description: "Notes on topics I've learned related to data engineering. ChatGPT was heavily used in the process, and for the sake of quick learning and time saving, some output was kept in its original form with only necessary edits applied before uploading. Parquet is an open-source columnar storage file format optimized for use with big data processing frameworks ..."
category: "Cheat Sheet"
---

> Notes on topics I've learned related to data engineering. ChatGPT was heavily used in the process, and for the sake of quick learning and time saving, some output was kept in its original form with only necessary edits applied before uploading.

### Parquet

Parquet is an open-source columnar storage file format optimized for use with big data processing frameworks like Apache Hadoop, Apache Spark, and Apache Hive. It is designed to bring efficiency in both storage and performance, especially for analytical queries.

- **Columnar Storage**: Data is stored column-wise, meaning each column's data is stored together. This allows for efficient data compression and encoding schemes that improve read and write performance.
- **Efficient Compression**: Parquet supports various compression codecs such as Snappy, Gzip, LZO, and Brotli. Columnar storage allows for more effective compression since similar data types are stored together.
- **Schema Evolution**: Parquet files include schema information, allowing for the evolution of data schemas over time without breaking existing data.
- **Splitting and Parallel Processing**: Parquet files can be split into smaller row groups, enabling parallel processing and efficient querying by processing only the required columns.

##### Parquet File Structure

- **File Header**: Contains metadata about the file format, including the version of Parquet.
- **Row Groups**: The file is divided into row groups, which are large contiguous chunks of rows. Each row group contains column chunks.
- **Column Chunks**: Each column chunk contains the data for a single column in the row group. Column chunks can be independently compressed and encoded.
- **Footer**: Contains metadata about the schema, row groups, and other necessary information for reading the file.

##### How Parquet Works

- **Writing Data**: Data is first divided into row groups when writing data to a Parquet file. Within each row group, data is further divided into column chunks. Each column chunk is compressed and encoded, and the metadata is written to the file footer.
- **Reading Data**: When reading data, **only the required columns are read**, reducing the amount of data scanned. Metadata in the footer helps locate the specific column chunks and decompress them efficiently.

### Why Columnar Storage is Fast for Big Data Processing?

1. **Reduced I/O**: Columnar storage reads only the necessary columns instead of entire rows, minimizing the amount of data read from the disk.
2. **Better Compression**: Since similar data types are stored together, columnar storage allows for more efficient compression, reducing storage space and speeding up read/write operations.
3. **Efficient Data Skipping**: Metadata for each column can help quickly locate the required data, bypassing unnecessary reads.
4. **Optimized for Analytical Queries**: Analytical queries often involve operations on a few columns (like aggregations and filtering), making columnar formats more efficient for these types of workloads.

##### Row-Based Storage vs. Columnar Storage

- **Row-Based Storage**: (1) Data is stored row by row / (2) To access specific columns, the entire row needs to be read
- **Columnar Storage**: (1) Data is stored column by column / (2) Only the necessary columns are read / (3) For a query that only needs the "Age" column, only the data for the "Age" column is read. (but row-based needs to read all columns.
- Row-based only needs to append for writing, and since it is an atomic operation (i.e., Transactions typically involve multiple columns of single rows), it is used in environments like banking or e-commerce where massive inserts, updates, and deletes happen simultaneously (**OLTP, Online Transaction Processing**)
- Column-based is suitable for **OLAP (Online Analytical Processing)** systems where read speed and storage efficiency are important
