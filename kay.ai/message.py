from typing import List

from classes import Chat_Completion_Request_Message

def prompt_messages_system(system_prompt: str, user_prompt: str) -> List[Chat_Completion_Request_Message]:
    messages: List[Chat_Completion_Request_Message] = [
        {
            'role': 'system',
            'content': system_prompt,
        },
        {
            'role': 'user',
            'content': user_prompt,
        }
    ]
    return messages

def prompt_messages_no_system(user_prompt: str) -> List[Chat_Completion_Request_Message]:
    messages: List[Chat_Completion_Request_Message] = [
        {
            'role': 'user',
            'content': user_prompt,
        }
    ]
    return messages
