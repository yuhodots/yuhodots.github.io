---
title: "Prompt Engineering Tips"
date: "2025-04-20"
template: "post"
draft: False
path: "/deeplearning/25-04-20/"
description: "A review of the Prompt Engineering whitepaper published by Google. Temperature controls the degree of 'creativity' or 'randomness' in the output. Top-K selects from the K words with the highest probability during token generation. Top-P selects from candidates whose cumulative probability reaches P or higher"
category: "Deep Learning"
thumbnail: "deeplearning"
---

> A review of the Prompt Engineering whitepaper published by Google.

### Introduction

- Temperature: Controls the degree of 'creativity' or 'randomness' in the output
  - The model output is expressed as $p_i= \frac{e^{s_i}_{T}}{\Sigma_j{e^{s^j}_{T}}}$
  - $T < 1$: $s^i$ values are amplified (the probability distribution becomes sharper) -> the most probable token is more likely to be selected
  - $T > 1$: $s^i$ values are diluted (the probability distribution becomes flatter) -> diverse tokens are more likely to be selected
  - $T = 1$: The original probability distribution computed by the model
  - In short, lower values produce stable, consistent outputs, while higher values generate more diverse outputs
- Top-K: During token generation, selects from the K words with the highest probability
- Top-P: Selects from candidates whose cumulative probability reaches P or higher (typically 0.8-1.0)
- Output Length: Limits the number of generated tokens to reduce speed & API costs. However, the model does not shorten its response by considering this length

### Prompting Techniques

- Zero-shot prompting: The most basic approach of simply asking a question without providing examples

- One-shot & few-shot prompting: Providing 1 (one-shot) or a few (few-shot) examples of correct answers and asking the model to reason

- System, contextual and role prompting
  - System prompting: A prompt that provides the model's overall behavioral guidelines in advance
  - Role prompting: Requesting the model to act in a specific role

    ```
    I want you to act as a travel guide. I will write to you about my location and you will suggest 3 places to visit near me in a humorous style
    ```
  - Contextual prompting: Providing context such as a conversation or document and requesting a response

    ```
    You are writing for a blog about retro 80's arcade video games.
    ```

- **Step-back prompting**: Rather than directly asking for the answer, first have the model summarize or reinterpret the problem, then respond

  ```
  (1) Write a one paragraph storyline for a new level of a first-person shooter video game that is challenging and engaging.
  ```

  ```
  (2) Based on popular first-person shooter action games, what are 5 fictional key settings that contribute to a challenging and engaging level storyline in a first-person shooter video game?
  ```

  ```
  (3) Based on the above 5 theme, Take one of the themes and write a one paragraph storyline for a new level of a first-person shooter video game that is challenging and engaging.
  ```

- **Chain of Thought (CoT)**: Guides the model to articulate the problem-solving process step by step in a logical manner

  ```
  Before giving your answer, think through this problem step by step. (= Let's think step by step.)
  ```

- Self-consistency: Running the same prompt multiple times and extracting the most consistent result from the various answers

- **Tree of Thoughts (ToT)**: In the decision-making process, multiple branches (options) are explored simultaneously, and the thought process for each branch is evaluated to select the optimal answer

- **ReAct (reason & act)**: Iteratively alternates between reasoning and acting, where the model autonomously performs reasoning, search, and actions to update results. It fundamentally derives results efficiently by repeating the process of searching for information and taking actions

  - For example, when finding the number of children of Metallica members, the ReAct approach searches for information on each member individually and then synthesizes the findings to present the answer

- Automatic Prompt Engineering: Prompting to generate more diverse prompts
  ```
  We have a band merchandise t-shirt webshop, and to train a chatbot we need various ways to order: "One Metallica t-shirt size S". Generate 10 variants, with the same semantics but keep the same meaning.
  ```

### Best Practices

1. It is recommended to provide about **3 to 5 examples** for few-shot prompting
2. Questions should be constructed concisely; complex questions can make it difficult for AI to understand, so expressing them clearly is best
3. Use an imperative tone; directly instructing is more effective
4. It is important to use verbs that clearly describe the action for the AI to perform, facilitating intuitive understanding
   - e.g., Act, Analyze, Categorize, Classify, Contrast, Compare, Create, Describe, Define, Evaluate, Extract, Find, Generate, Identify, List, Measure, Organize, Parse, Pick, Predict, Provide, Rank, Recommend, Return, Retrieve, Rewrite, Select, Show, Sort, Summarize, Translate, Write.
5. It is good to specify DO or DO NOT in detail
6. Focusing on what the AI should do (instruction) is important, and not mentioning what it should not do (constraint) is often more effective
7. Using variables in prompts is beneficial
8. When doing few-shot prompting for classification tasks, **provide examples evenly across classes**
9. Requesting responses in **JSON or XML format** can provide more consistent answers and contribute to reducing hallucinations
10. When using Chain of Thought, it is advantageous to set the **temperature to 0**, as it is suitable for deterministic problem solving
11. Recording experiments with various prompts somewhere is useful for testing and updating

##### Top-K and Top-P

- General starting point: **T=0.2 / Top-P=0.95 / Top-K=30**
- Creative results: **T=0.9 / Top-P=0.99 / Top-K=40**
- Less creative results: **T=0.1 / Top-P=0.9 / Top-K=20**

### Reference

https://www.kaggle.com/whitepaper-prompt-engineering
