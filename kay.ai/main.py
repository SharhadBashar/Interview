import asyncio
from pprint import pprint

from llm import *
from helper import *
from prompt import *
from constants import *
from classes import *
async def main():
    llm = Open_AI()

    document = read_txt('document_text.txt')

    messages = get_messages(FIELDS_TO_EXTRACT, document)

    response = await llm.chat_completion_structured_output(messages, Insurance_Information_List)
    pprint(response)

    # json_response = extract_json(response)
    # pprint(json_response)

if __name__ == '__main__':
    asyncio.run(main())
