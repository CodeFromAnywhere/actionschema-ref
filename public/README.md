This repo showcases some of the datastructures I've been working on that are used throughout my work.

For now, it's nothing official yet, and the intention is to first create something very useful, then think about making it an open standard. These JSON Schemas serve as the source of truth for the specification of them, which is why they contain clear descriptions, which is useful in Typescript and other places.

# Motivation

- It's hard and complex to build long chains on top of unreliable functions such as LLM's and other transformer AI, if you can't see what is happening in each part of the chain.
- It's hard to work with OpenAPIs while the potential is giant.
- Increased locality of behavior: keep your code where you describe your data and keep a SSOT. (See [LoB Principle](https://htmx.org/essays/locality-of-behaviour/))
