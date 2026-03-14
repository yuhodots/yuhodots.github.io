---
title: "Retrieval-Augmented Generation"
date: "2025-04-21"
template: "post"
draft: False
path: "/deeplearning/25-04-21/"
description: "An overview of Retrieval-Augmented Generation methodologies. This is a curated summary of results produced using Gemini 2.5 Pro Deep Research. Although I have reviewed and revised the content, please keep in mind that it originates from Deep Research output and read selectively."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> An overview of Retrieval-Augmented Generation methodologies. This is a curated summary of results produced using **<u>Gemini 2.5 Pro Deep Research</u>**. Although I have reviewed and revised the content, please keep in mind that it originates from Deep Research output and read selectively.

### Introduction

##### Limitation of LLM Models

In recent years, Large Language Models (LLMs) have achieved remarkable progress in natural language understanding (NLU) and text generation, opening new horizons in artificial intelligence. Through training on vast amounts of text data, LLMs demonstrate near-human language proficiency and have proven their applicability in question answering, summarization, translation, creative writing, and many other domains.

Despite their powerful capabilities, however, LLMs harbor fundamental limitations. One of the most significant issues is "hallucination," where the model generates plausible-sounding content that is either unsupported by training data or factually incorrect. This occurs because LLMs rely on static knowledge stored in their internal parameters, making them especially vulnerable when dealing with information beyond their training data cutoff (the knowledge cutoff problem) or when domain-specific knowledge is lacking. Additionally, the lack of transparency in the response generation process makes it difficult to verify the reliability of outputs.

Retrieval-Augmented Generation (RAG) has emerged as a framework to overcome these limitations. RAG enables the LLM to reference external knowledge sources (e.g., *document databases, web pages*) before generating a response, grounding the output in more accurate, reliable, and up-to-date information. This "grounding" effect reduces hallucination and improves factual accuracy. Moreover, RAG provides a cost-effective solution by allowing the use of domain-specific or internal organizational data without retraining the entire model.

##### Limitation of Naive RAG

While basic RAG (often referred to as "Naive RAG") significantly enhanced LLM performance, it still suffers from several important limitations. The biggest issue is its heavy dependence on the quality of the retrieval step. If the retrieved information is inaccurate or irrelevant, it can actually degrade the LLM's response quality.

Naive RAG tends to **uncritically utilize** retrieved documents and suffers from **low precision or recall**, allowing irrelevant information to be included or important information to be missed. Furthermore, even within retrieved documents, there is often noise or irrelevant content that the system cannot effectively filter out. Cases also arise where the LLM ignores the provided context or hallucinates despite having relevant context available.

To address these vulnerabilities of Naive RAG and achieve more robust and reliable response generation, advanced RAG methodologies have been proposed that evaluate and correct retrieval results or reflect upon and control the generation process itself. The key methods we will focus on -- `Corrective-RAG (CRAG)`, `Self-RAG`, and `Self-Corrective RAG (SCRAG)` -- are representative examples of this evolution, each introducing mechanisms for evaluation, correction, and self-reflection to improve the reliability and controllability of RAG systems.

### Retrieval-Augmented Generation

The most basic form of RAG, Naive RAG, typically consists of three stages: Indexing, Retrieval, and Generation.

##### Indexing

In this stage, external data that the LLM will reference is processed into a searchable format. External data can come from various sources such as APIs, databases, and document repositories, and may take multiple forms including files, database records, and long-form text.

1. **Chunking:** The original documents are split into smaller units (chunks) to fit the LLM's context window size or the embedding model's processing capacity. If chunks are too large, they may include irrelevant information; if too small, they may not contain enough meaningful information. An appropriate splitting strategy (e.g., fixed-size, sentence/paragraph-based) is therefore important.
2. **Embedding Generation:** Each chunk is converted into a high-dimensional vector using an embedding language model. This vector numerically represents the semantic content of the chunk.
3. **Storing in Vector Database:** The generated vector embeddings are stored and indexed alongside the original text of each chunk in a vector database or vector store, enabling fast similarity-based retrieval.

##### Retrieval

When a user's query is received, it is processed to retrieve highly relevant information (document chunks) from the indexed knowledge base.

1. **Query Embedding:** The user query is converted into a vector using the same embedding model used during the indexing stage.
2. **Similarity Search:** The similarity (e.g., cosine similarity) between the query vector and document chunk vectors in the vector store is calculated.
3. **Top-K Chunk Selection:** Based on the calculated similarity scores, the top K most relevant document chunks are returned as retrieval results.

##### Generation

In this stage, the retrieved relevant information is provided to the LLM to generate the final response.

1. **Prompt Augmentation:** The retrieved K relevant document chunks (context) are combined with the user's original query to construct an augmented prompt for the LLM. Prompt engineering techniques may be used for effective information delivery.
2. **Response Generation:** The LLM receives the augmented prompt and generates a final response by comprehensively utilizing both its internal parametric knowledge and the provided external context information.

The core principle of RAG is dynamically retrieving external data at inference time and providing it to the LLM. Unlike fine-tuning or retraining, which statically update model parameters, RAG enables the use of up-to-date information or domain-specific knowledge without modifying the LLM itself. The effectiveness of the entire RAG pipeline is **heavily dependent on the quality of the initial indexing and retrieval stages** (chunking strategy, embedding model performance, similarity search accuracy, etc.). Deficiencies at this stage can lead to degraded quality in the subsequent generation stage, and this is precisely what advanced RAG techniques aim to improve.

### Corrective-RAG (CRAG)

Standard RAG systems are heavily dependent on the quality of retrieved documents. If the retrieval stage returns irrelevant or inaccurate documents, this directly impacts the quality of the final generated output. Corrective-RAG (CRAG) is a framework proposed to address this problem by **evaluating the reliability of retrieval results and performing corrective actions when necessary**, thereby improving the generation robustness of the RAG system.

The core idea of CRAG is to introduce a mechanism that actively evaluates and **"self-corrects"** retrieved information before the generation stage, minimizing the negative impact of inaccurate retrieval results on the LLM's generation process.

##### Lightweight Retrieval Evaluator

- Purpose: Evaluates the overall quality -- specifically the relevance and reliability -- of the initially retrieved document set for a given query.
- Implementation: CRAG uses a separate lightweight model for this evaluation. For example, a pre-trained T5-large model (0.77B parameters) is fine-tuned on existing datasets (e.g., PopQA) to learn to judge the relevance of query-document pairs. This evaluator operates independently from the main generation LLM.
- Benefit: By using a relatively small model, the evaluation process maintains computational efficiency without adding excessive overhead to the overall system. This is one of CRAG's key innovations -- separating the evaluation and correction logic into an external dedicated lightweight evaluator, differentiating it from approaches that rely on the main generation LLM. This externalization enables specialized optimization of the evaluation component.

##### Confidence Scoring and Action Trigger

- The Retrieval Evaluator predicts a relevance score for each retrieved document. These scores are aggregated to quantify the overall confidence degree of the retrieval results.

- Based on predefined upper and lower thresholds, the confidence is assessed to trigger one of three actions:

  - **Correct**: When one or more retrieved documents have a high relevance score exceeding the upper threshold. In this case, the retrieval results are deemed reliable and the process **proceeds to the Knowledge Refinement stage**.

  - **Incorrect**: When all retrieved documents have relevance scores below the lower threshold. This indicates that the retrieval results are generally inadequate, and **triggers a Web Search**.

  - **Ambiguous**: When scores fall between the thresholds or the evaluator indicates uncertainty. In this case, **both Knowledge Refinement and Web Search are performed** to leverage information from both initial retrieval results and web search. This "Ambiguous" state represents a pragmatic approach to uncertainty -- when the initial retrieval is uncertain, it simultaneously collects the best information from static sources while seeking better or supplementary information from the dynamic web.

##### Corrective Actions

- **Knowledge Refinement - Decompose-then-Recompose**: Applied when a "Correct" or "Ambiguous" action is triggered.

  1. **Decompose**: The retrieved documents are split into smaller semantic units ("knowledge strips"). Short documents are treated as-is as strips, while longer documents are divided into segments of a few sentences.

  1. **Filter**: The fine-tuned retrieval evaluator is used again to compute relevance scores for each knowledge strip, removing irrelevant strips whose scores fall below a predefined threshold.

  1. **Recompose**: The remaining highly relevant knowledge strips are concatenated in their original order to form refined "internal knowledge."

- **Web Search Augmentation**: Applied when an "Incorrect" or "Ambiguous" action is triggered.
  1. **Query Rewriting:** The original query is transformed into a set of keywords suitable for web search (e.g., using ChatGPT).
  2. **Web Search API:** The rewritten query is used to call a public web search API (e.g., Google Search API, Tavily) to obtain a list of relevant URLs. Authoritative sites such as Wikipedia are preferred to mitigate bias and reliability issues.
  3. **Content Extraction and Refinement:** Content is extracted from the retrieved web pages, and the same knowledge refinement method (decompose-then-recompose) described above is applied to extract highly relevant "external knowledge."

The final knowledge obtained through corrective actions (refined internal knowledge, external knowledge, or a combination of both) is fed into the generation LLM along with the original query to produce the final response.

### Self-RAG

Self-RAG aims to overcome the limitation of standard RAG's indiscriminate use of retrieved information, improving the LLM's generation quality and factual accuracy while preserving the model's inherent versatility.

The core idea of Self-RAG is to **train the LLM itself to actively determine the need for retrieval** during generation (adaptive retrieval) and to **critically evaluate retrieved information and its own generated output (self-reflection)**. This enables more fine-grained control over the generation process at inference time and allows the model's behavior to be adjusted for different task requirements.

Self-RAG uses special tokens called **"reflection tokens"** to control and evaluate the LLM's retrieval and generation processes. These tokens are generated alongside regular text by the main generation LLM with an extended vocabulary.

##### Reflection Tokens

- `Retrieve`: Indicates **whether external information retrieval is needed** in the current generation context (values: Yes, No, Continue). This enables adaptive retrieval.
- `IsRel`: **Evaluates whether each retrieved passage is relevant** to the input query and preceding generated content (values: Relevant, Irrelevant).
- `IsSup`: **Evaluates whether the generated output segment is factually supported** by the corresponding passage (values: Fully Supported, Partially Supported, No Support/Contradictory).
- `IsUse`: **Evaluates the overall quality and usefulness** of the generated segment (e.g., on a 1-5 scale).

##### Adaptive Retrieval

- The LLM predicts a `Retrieve` token at generation points where external knowledge may be needed. Retrieval is triggered only when the `Retrieve` token is predicted as 'Yes' or when the prediction probability exceeds a certain threshold.
- This improves efficiency by skipping unnecessary retrieval for tasks where the model's parametric knowledge is sufficient or factual grounding is not critical (e.g., creative writing). This directly addresses Naive RAG's "indiscriminate retrieval" problem.

##### Generation and Self-Critique

- When retrieval occurs, Self-RAG processes multiple retrieved passages in parallel. For each passage, a candidate output segment is generated using the passage as context, and corresponding critique tokens (`IsUse`) are also generated simultaneously.
- **Segment-level Beam Search:** Beam search is used to select the optimal path among multiple candidate segments. The score for each segment considers not only generation probability but also the scores of critique tokens (a weighted sum of normalized probabilities of desirable critique token values). By adjusting these weights at inference time or applying hard constraints based on critique token values, the model's behavior (e.g., prioritizing factuality vs. fluency) can be controlled without retraining.

The key distinction of Self-RAG is the integration of evaluation and control logic within the main generation LLM itself, using reflection tokens as a built-in control mechanism. This is fundamentally different from CRAG's external evaluator, as the same model performs both generation and evaluation, potentially enabling deeper contextual understanding for self-critique.

##### Training Process

Self-RAG training involves a separate "Critic" model and a main "Generator" model.

1. **Critic Model Training:** First, a powerful LLM (e.g., GPT-4) is used to generate reflection tokens for various input-output pairs, constructing supervised training data. This data is then used to train a Critic model (C) based on a pre-trained LM.
2. **Generator Model Training:** The trained Critic model (C) and a Retriever (R) are used to augment existing training data (input-output pairs). For each output segment, the Critic predicts retrieval necessity, relevance, support status, etc., and adds the corresponding reflection tokens to the data. The main Generator model (M) is then trained on this augmented data corpus. The training objective is the standard next-token prediction (for both regular text tokens and reflection tokens). The Generator's vocabulary is extended to include reflection tokens. Through this process, the Generator learns to produce reflection tokens on its own at inference time, without requiring a separate Critic model.

### Self-Corrective RAG (SCRAG)

The key characteristic of SCRAG is that it combines a **self-reflection** mechanism similar to Self-RAG with a **corrective retrieval** mechanism similar to CRAG. It integrates the LLM's ability to evaluate retrieval information and review generated content on its own, with the ability to externally assess retrieval result quality and perform corrective actions such as additional retrieval or refinement when necessary.

##### Adaptive Retrieval and Self-Reflection

- Similar to Self-RAG, an adaptive retrieval mechanism may be adopted where the model uses **reflection tokens** to evaluate the **value** of retrieved passages and determine retrieval timing.
- The model performs self-evaluation (quality, relevance, etc.) using reflection/critique tokens to assess generated content in real time.

##### Corrective Retrieval Elements

- Similar to CRAG, it includes a procedure to evaluate the **quality/accuracy** of initially retrieved documents (potentially using a separate evaluator).
- If the retrieved data is judged to be insufficient or erroneous, **corrective actions** are triggered through additional, more thorough retrieval such as web search to find more reliable sources.

##### Refinement

- Using a method similar to CRAG's "decompose-then-recompose" procedure, data obtained from initial retrieval or web search is filtered, focused on relevant portions, and refined by removing noise.

### Comparative Analysis

| Feature | Corrective-RAG (CRAG) | Self-RAG | Self-Corrective RAG (SCRAG) |
| --- | --- | --- | --- |
| Goal | Improve generation robustness against retrieval errors | Improve generation quality/factuality and enable inference-time controllability | Maximize reliability through combined self-reflection and correction |
| Core Mechanism | Retrieval result evaluation and correction via lightweight evaluator | Adaptive retrieval and self-critique via LLM's own reflection tokens | Integration of self-reflection and corrective retrieval mechanisms |
| Evaluation Timing | Primarily before generation | During generation (segment-level) | Possible both before and during generation |
| Evaluator | Separate lightweight evaluator (e.g., T5) | Main generation LLM (reflection token generation) | LLM (self-reflection) + potential external evaluator (correction trigger) |
| Correction Trigger | Evaluator confidence scores and thresholds | Beam search path selection based on critique token scores | Quality assessment results (correction) + critique tokens (refinement/selection) |
| Correction Mechanism | Knowledge refinement (Decompose-recompose), web search | Optimal generation path selection | Decompose-recompose, web search, self-critique-based refinement/selection |
| Special Token Usage | No | Yes (reflection tokens) | Yes (reflection/critique tokens) |
| Training Complexity | Requires evaluator fine-tuning | Requires critic model training and generator augmented data training | Potentially highest (integrating both mechanisms) |
| Inference Complexity/Latency | Overhead from evaluator execution, web search, etc. | Potential latency from parallel processing, critique token generation/evaluation | Potentially highest (combining both mechanisms) |
| Strengths | Robustness, adaptability, lightweight evaluation, web search utilization | Adaptive retrieval, controllability, self-critique, citation accuracy | Potentially maximum accuracy/reliability, multi-layered verification |
| Weaknesses | Evaluator dependency, requires fine-tuning, overhead | Possible unsupported outputs, training/inference complexity | High complexity and potential latency (not explicitly documented) |

### Use Cases

##### Corrective-RAG (CRAG)

CRAG is particularly useful in the following scenarios, as it focuses on retrieval stage reliability:

- When initial retrieval quality is unstable or low: CRAG is designed to mitigate these issues through its retrieval result evaluation and correction mechanisms.
- When high robustness against irrelevant documents is required: CRAG's evaluation and refinement capabilities are effective when a significant amount of irrelevant content is expected among retrieved documents.
- When the static knowledge base is insufficient and web search is needed: CRAG's conditional web search function plays a crucial role when answers cannot be found in the base corpus or when up-to-date information is required. The need for dynamic information access can be a key differentiator for choosing CRAG or SCRAG.
- When modular evaluation components are preferred: Suitable for environments where managing and updating the evaluator separately is convenient (lightweight evaluator).
- Examples: Fact-checking systems requiring external information verification, Q&A systems in rapidly evolving fields (news, technology trends, etc.), and adding robustness to existing RAG pipelines.

##### Scenarios Suited for Self-RAG

Self-RAG excels in generation process control and reflection, making it suitable for the following cases:

- When fine-grained control of the generation process at inference time is needed: Applications requiring dynamic control over various aspects like factuality, relevance, and conciseness through reflection token weight adjustments.
- When dynamically determining whether retrieval is needed is important: Self-RAG's adaptive retrieval improves efficiency when not all queries require retrieval.
- When high citation accuracy and traceability of generation grounds are required: Self-evaluation (support status, etc.) for each generated segment enhances reliability and facilitates verification.
- Long-form generation tasks where maintaining factual grounding per segment is important: Helps maintain accuracy of each part when generating long reports or answers.
- Examples: Detailed report generation with citation information, complex Q&A requiring iterative improvement, chatbots needing balance between factuality and conversational flow.

##### Self-Corrective RAG (SCRAG)

SCRAG aims for maximum reliability by combining the strengths of CRAG and Self-RAG, making it suitable for the following scenarios:

- High-stakes applications requiring the highest level of reliability and factual accuracy: When multi-stage verification and correction mechanisms are critical. This may include critical decision support systems in healthcare, finance, and similar fields.
- Complex environments where both retrieval quality issues and generation control needs exist: When both problems must be addressed simultaneously.
- When increased latency and complexity can be tolerated: Situations where additional resource investment for the highest quality output is feasible.
- Examples: Critical decision support systems, advanced educational tools requiring high accuracy, complex research support systems.

### Research and Development Direction

RAG research has evolved through three major paradigms:

- Naive RAG: The basic retrieve-augment-generate pipeline. Simple to implement but limited in retrieval and generation quality.
- Advanced RAG: Approaches that improve upon Naive RAG's limitations by adding pre/post-processing steps or optimizing the pipeline. This includes reranking, query transformation, feedback loops, retriever and generator fine-tuning, and more. **CRAG and Self-RAG** can also be considered part of this category.
- Modular RAG: An approach that decomposes the RAG pipeline into functional modules (retrieval, generation, augmentation, etc.) that can be flexibly combined or replaced. Modules can be optimized for specific tasks or new modules (e.g., memory, planning) can be added to extend the system.

Recent RAG research is actively progressing in the following directions:

- Agentic RAG: A paradigm that introduces autonomous AI agents within the RAG pipeline to manage and execute the entire process more intelligently. Agents leverage patterns such as **Reflection** (self-evaluation and error correction), **Planning** (workflow design), **Tool Use** (external API and database integration), and **Multi-Agent Collaboration** to solve complex queries, dynamically select retrieval strategies, perform multi-step reasoning, and collect and process information using external tools.
- Graph RAG: Research that integrates graph-structured knowledge (Knowledge Graphs) into RAG systems beyond traditional unstructured text data. Graphs explicitly represent relationships between entities, potentially enabling more sophisticated reasoning and semantic retrieval.
- Multimodal RAG: Research extending RAG's scope beyond text to various modalities including images, video, and audio.
- Retrieval and Indexing Optimization: Ongoing research to improve retrieval quality, which forms the foundation of RAG performance. This includes developing better chunking strategies, improving embedding model performance, advanced retrieval techniques such as sentence-window retrieval and auto-merging retrieval, strengthening semantic alignment between queries and documents (e.g., HyDE, synthetic query generation), and improving re-ranking algorithms.
- Generation and Augmentation Optimization: Active research on techniques to help LLMs more effectively utilize retrieved information. This includes prompt engineering techniques (e.g., StepBack-prompt), fine-tuning for alignment between retriever and generator, and methods for efficiently managing the LLM's limited context window.

### Summary

We conducted an in-depth analysis and comparison of advanced methodologies proposed to address the limitations of basic Naive RAG within the Retrieval-Augmented Generation (RAG) technology that emerged to complement the limitations of Large Language Models (LLMs): Corrective-RAG (CRAG), Self-RAG, and Self-Corrective RAG (SCRAG).

- **Corrective-RAG (CRAG):** Focuses on improving input context quality by using a separate lightweight evaluator to assess the quality of retrieved documents before the generation stage, then performing corrective actions such as knowledge refinement (decompose-then-recompose) or web search based on the results. The core principle is **achieving robustness through pre-generation correction**.
- **Self-RAG:** The main generation LLM itself uses reflection tokens to dynamically determine retrieval necessity (adaptive retrieval) and self-evaluates each segment's relevance, factual support, and usefulness during generation (self-critique) to select the optimal response path. The core principle is **achieving controllability and adaptability through self-reflection during generation**.
- **Self-Corrective RAG (SCRAG):** An attempt to integrate CRAG's corrective retrieval mechanism with Self-RAG's self-reflection mechanism. It aims to maximize reliability by performing both retrieval quality evaluation and correction, as well as self-evaluation during generation. The core principle is the **combination of correction and self-reflection**.
