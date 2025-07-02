### Prompt Engineering GuideLines

- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- OpenAI
    - [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
    - [Reasoning model best practices (for o-models, o1, o3…)](https://platform.openai.com/docs/guides/reasoning-best-practices)
- Google 
    - [Prompt Engineering Guide](https://cloud.google.com/discover/what-is-prompt-engineering?hl=en)
    - [Gemini for Google Workspace Prompt Engineering Guide 101](https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf)
- Antropic
    - [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
    - [Prompt Engineering Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- deeplearning.ai
    - [Prompt Engineering for Developers Course](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/)
- Microsoft Azure
    - [Prompt engineering techniques from Azure AI Services](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering?tabs=chat)
    - [Generative AI for Beginners Course](https://github.com/microsoft/generative-ai-for-beginners/tree/main?WT.mc_id=academic-105485-koreyst)

## Prompt Formats
```prompt = '''
    [ROLE]
        who you are

    [TASK]
        what is your task. Overview

    [INSTRUCTIONS]
        More specific instructions on how to accomplish your task. 
        Add rules and guidelines that are important to follow.
        What to do, what not to do
        all chain of thought stuff goes here

    [ANY OTHER HEADERS such as RULES, CHECKLIST, etc.]

    [INPUT]
        what the input looks like.

    [OUTPUT]
        what the output should look like.

    [EXAMPLES]
        examples of inputs and outputs
'''```