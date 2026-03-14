---
title: "AutoGPT"
date: "2023-06-16"
template: "post"
draft: true
path: "/deeplearning/23-06-16/"
description: ""
category: "Deep Learning"
thumbnail: "deeplearning"
---

> This document contains a lot of personal speculation and is incomplete, so it will remain in draft status...

### LangChain

- Key features
  - prompts: Can be created as user-defined prompt templates or in function form. Essentially allows you to fix and reuse templates.
  - llms: Which model to use, how to set the temperature.
  - memory
    - First, LangChain provides helper utilities for managing and manipulating previous chat messages. These are designed to be modular and useful regardless of how they are used.
    - Secondly, LangChain provides easy ways to incorporate these utilities into chains.
  - chains: Creates workflows. Receives the previous conversation input and result, then passes them to the next step.
  - utilities: Content to be added.
  - indexes: Content to be added.
    - document_loaders: Loads PDF, xls, csv, markdown, etc.
  - agents: Seems similar to AutoGPT.

### AutoGPT

https://github.com/Significant-Gravitas/Auto-GPT

Insert ChatGPTUp content here.

- What is AutoGPT?
  - Auto-GPT is an experimental open-source application showcasing the capabilities of the GPT-4 language model. This program, driven by GPT-4, chains together LLM "thoughts", to autonomously achieve whatever goal you set. As one of the first examples of GPT-4 running fully autonomously, Auto-GPT pushes the boundaries of what is possible with AI: The model autonomously decides and executes iterative processes to achieve the goal entered by the user.
  - Basic operation process
    - thinking, command, etc.

  - Basic components: System / User / OpenAI API architecture
  - Installation: OpenAI API key, .env configuration, Docker setting, etc.
  - Configuration: name, role settings, etc.

- Explanation of how AutoGPT works
  - What processes are performed internally during iterations
    - Ends when task_complete
  - What information accumulates in Memory (Input of ChatGPT)
- Limitations of AutoGPT
  - Performance degradation due to hallucination
  - Cost and speed issues
  - 4000 token limit, etc.
  - Gets stuck in loops asking the same questions too often
- Impressions
  - The idea is remarkable, and it is impressive that thinking processes can be achieved through engineering alone without modifying the model itself.
  - However, the hallucination problem is still severe, and aside from Google searching, there is not a tremendously large difference compared to ChatGPT.
  - https://openai.com/blog/function-calling-and-other-api-updates Prices dropped on June 13th.


### LangChain vs. AutoGPT

- If you want to customize as much as possible for the developer's needs and use it for various purposes, go with LangChain (provided in multiple module formats). A framework that enables the development of various end applications using LLMs.

- If you want to minimize development resources and do not mind GPT producing results freely, go with AutoGPT.

- LangChain is about process with control, while Auto-GPT is about result without control.

##### LangChain Agent vs. AutoGPT

- In other words, with LangChain the user needs to define everything, while with AutoGPT the agent does everything on its own.
- Some people probably use both to build products.

### AutoGPT of UpstageAI

https://github.com/ChatGPTUp/Auto-GPT

- How does it improve upon AutoGPT's limitations?
  - Performance degradation due to hallucination
  - Cost and speed issues
  - 4000 token limit, etc.

### Slack API

https://github.com/ChatGPTUp/Auto-GPT/issues

- Slack bot basics (quick overview)
  - Slack key setup, etc.
  - Slack role and permission configuration, etc.
- AutoGPT server deploy
  - Deploy with FastAPI + Docker container
    - Quick deployment using Digital Ocean
  - Configuration for receiving Slack messages (e.g., how to set up port, domain)
  - Testing (Docker run - ping check - ask question to AutoAskUp)

### Random Thoughts

- Watching the thinking iterations, the process of "think - consider methods - decide next action" feels like a baby version of AGI. By next year, there will probably be some impactful AutoGPT-based service comparable to ChatGPT.

- Having a very good foundation model and knowing how to leverage it is becoming increasingly important, and engineering is becoming more important than modeling. Especially right now, prompt engineers will increasingly emerge based on deliberations about how to effectively stack input prompts in memory.
