# Why redo SDK client generation from the ground up?

It's been a risky move to generate the SDK client from the ground up. For my own APIs it's always been fine, but for third party APIs this seems more challenging for sure.

Why though? Why not use a SDK generator developed by an entire team in a company like https://www.stainlessapi.com or https://liblab.com ?

Well, I think it's a good move to stay away from those for several reasons:

1. They're for-profit businesses with a large team and will grow. They create dependency etc etc
2. They're solving the problem creating an SDK for all APIs for all languages. I could potentially just solve creating an SDK for a simplified API in 1 language.

My advantage is increased control and flexibility to change rapidly.

How I'll solve creating or using good SDKs for APIs with code generation is a major problem, and my solution ideas are:

1. Create a proxy serving a more standardised API for each API so the SDK is also more standardised and simple.
2. Use AI codegen for fetching each operation and put this behind an API so it can easily be RAG'ed
3. Create utility functions: `1: Request->FlatObject, 2: FlatObject->RequestInit, 3: fetch(FlatObject)=>FlatObject`. This way the code can be written using a more simplified Context object.
