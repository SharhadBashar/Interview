import os
import aiohttp
from dotenv import load_dotenv
import asyncio
from constants import *

from anthropic import Anthropic
from openai import OpenAI, AsyncOpenAI


import warnings
warnings.filterwarnings('ignore')

class Open_AI:
    def __init__(self, model = 'gpt-4o'):
        api_key = os.environ.get('OPENAI_API_KEY')
        self.async_client = AsyncOpenAI(
            api_key = api_key
        )
        self.client = OpenAI(
            api_key = api_key
        )
        self.model = model

    async def chat_completion(self, messages, token_view = False):
        response = self.client.chat.completions.create(
            model = self.model,
            messages = messages
        )
        if token_view:
            print('Tokens used:', response.usage)
        return response.choices[0].message.content

    async def async_chat_completion(self, messages, token_view = False):
        response = await self.async_client.chat.completions.create(
            model = self.model,
            messages = messages
        )
        if token_view:
            print('Tokens used:', response.usage)
        return response.choices[0].message.content
    
    async def chat_completion_structured_output(self, messages, structure, token_view = False):
        response = self.client.beta.chat.completions.parse(
            model = self.model,
            messages = messages,
            response_format = structure
        )
        if token_view:
            print('Tokens used:', response.usage)
        return response.choices[0].message.parsed
    
    async def async_chat_completion_structured_output(self, messages, structure, token_view = False, cost = 0.6/1000000):
        response = await self.async_client.beta.chat.completions.parse(
            model = self.model,
            messages = messages,
            response_format = structure
        )
        if token_view:
            print('Tokens used:', response.usage)
        return response.choices[0].message.parsed, response.usage.total_tokens * cost
    
class Anthropic_AI:
    def __init__(self, model = 'claude-3-7-sonnet-latest'):
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        self.client = Anthropic(
            api_key = api_key
        )
        self.model = model

    async def chat_completion(self, messages, token_view = False):
        response = self.client.messages.create(
            model = self.model,
            messages = messages
        )
        if token_view:
            print('Tokens used:', response.usage)
        return response.content[0].text

class Perplexity_AI:
    def __init__(self):
        load_dotenv(override = True)
        self.headers = {
            'Authorization': f'Bearer {os.environ.get("PERPLEXITY_API_KEY")}',
            'Content-Type': 'application/json'
        }
        self.url = PERPLEXITY_URL

    async def chat_completion_raw(self, messages, max_tokens):
        payload = {
            'model': 'sonar',
            'messages': messages,
            'max_tokens': max_tokens,
            'temperature': 0.2,
            'top_p': 0.9,
            'search_domain_filter': None,
            'return_images': False,
            'return_related_questions': False,
            'search_recency_filter': 'month',
            'top_k': 0,
            'stream': False,
            'presence_penalty': 0,
            'frequency_penalty': 1
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(self.url, json = payload, headers = self.headers) as response:
                response_data = await response.json()
        
        return response_data

    async def chat_completion(self, messages, max_tokens, price = 1/1000000):
        payload = {
            'model': 'sonar',
            'messages': messages,
            'max_tokens': max_tokens,
            'temperature': 0.2,
            'top_p': 0.9,
            'search_domain_filter': None,
            'return_images': False,
            'return_related_questions': False,
            'search_recency_filter': 'month',
            'top_k': 0,
            'stream': False,
            'presence_penalty': 0,
            'frequency_penalty': 1
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(self.url, json = payload, headers = self.headers) as response:
                response_data = await response.json()
        return {
            'message': response_data['choices'][0]['message']['content'],
            'citations': response_data['citations'],
            'cost': response_data["usage"]["total_tokens"] * price
        }
    
if __name__ == '__main__':
    openai = Open_AI()
    result = asyncio.run(openai.async_chat_completion([{'role': 'user', 'content': 'Hello, how are you?'}], token_view = True))
    print(result)