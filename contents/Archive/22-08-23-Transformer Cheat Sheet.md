---
title: "Transformer Cheat Sheet"
date: "2022-08-23"
template: "post"
draft: true
path: "/cheatsheet/22-08-23/"
description: "'Formal Algorithms for Transformers' (Mary Phuong and Marcus Hutter) 논문과 'Attention Is All You Need' (Vaswani, Ashish, et al.) 논문의 내용을 키워드 위주로 정리합니다."
category: "Cheat Sheet"
---

> "Formal Algorithms for Transformers" (Mary Phuong and Marcus Hutter) 논문과 "Attention Is All You Need" (Vaswani, Ashish, et al.) 논문의 내용을 키워드 위주로 정리합니다.

### Background

##### Attention

- (Lillog와 Transformer 논문 참고하여 Attention의 수식이랑 notation 중요한 것만 정리하기)

##### Tasks

- Chunking: 모든 seqence modeling을 위한 transformer 기반의 모델은 maximum input length가 제한되어있기 때문에, 하나의 문서가 입력으로 주어지면 이를 여러 파트로 chunking하여 모델의 입력으로 제공함. 따라서 어떻게 chunking 하느냐에 따라 성능에 차이가 생길 수 있음
- Seq2seq prediction (Encoder-decoder model): True distribution $P(x)$에 대한 estimation $\hat{P}$를 잘 배우는 것이 목적. $x[1:t-1]$가 주어졌을 때, single token $x[t]$에 대한 distribution을 학습하는 것이 목적
  - e.g., RL policy distillation, Language modeling, Music generation과 같은 sequential data 생성/예측에 사용

- Classification (Encoder-centric model): 
  - e.g., 

- Sequence modeling (Decoder-centric model): 
  - e.g., 

##### Tokenization

- Token: 모델의 입력으로 주어지는 어떤 의미를 가지는 하나의 단위
- Vocabulary: 
  - Special token: mask_token, bos_token, eos_token, 
- Character-level tokenization: 
- Word-level tokenization: 
- Subword tokenization: 


### Transformer

- Token embedding:
- Positional embedding:
- Self-attention:
- Cross-attention:
- Multi-head attention:
- Layer normalization: 

##### Overall Architecture

- (Encoder-decoder Transformer에 대해서 전체적인 모델 구조 설명하기)

### The Transformer Family

- Encoder-Decoder Transformer
- Encoder-Only Transformer: BERT
- Decoder-Only Transformer: GPT-2, GPT-3, Gopher

### Algorithm

- Pseudocode of Encoder-Decoder Transformer

### References

- [Phuong, Mary, and Marcus Hutter. "Formal Algorithms for Transformers." *arXiv preprint arXiv:2207.09238* (2022).](https://arxiv.org/abs/2207.09238)
- [Vaswani, Ashish, et al. "Attention is all you need." *Advances in neural information processing systems* 30 (2017).](https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html)
