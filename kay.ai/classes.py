from enum import Enum
from pydantic import BaseModel
from typing import Optional, List

class User_Query(BaseModel):
    user_query: str
    history: Optional[List[str]] = []
    websearch: Optional[bool] = False

class Extracted_Info(BaseModel):
    travelers: Optional[int] = None
    hotel_name: Optional[str] = None
    address: Optional[List[str]] = None
    city: Optional[List[str]] = None
    state: Optional[List[str]] = None
    country: Optional[List[str]] = None

    checkin_date: Optional[str] = None
    checkout_date: Optional[str] = None
    price_low: Optional[int] = None
    price_high: Optional[int] = None

    all_inclusive: Optional[bool] = None
    hotel_stars: Optional[int] = None
    rating: Optional[int] = None
    michilin: Optional[int] = None
    hotel_brand: Optional[List[str]] = None
    hotel_group: Optional[List[str]] = None
    
    preferred: Optional[bool] = None
    fora_reserve: Optional[bool] = None
    
    preferences: Optional[List[str]] = None
    reason_for_trip: Optional[str] = None
    additional_info: Optional[str] = None

class Question(BaseModel):
    query: str
    extracted_info: Extracted_Info

class Questions(BaseModel):
    questions: List[Question]

class Reasonings(BaseModel):
    match: bool
    reasoning: str

class Chat_Completion_Roles(Enum):
    SYSTEM = 'system'
    USER = 'user'
    ASSISTANT = 'assistant'
    FUNCTION = 'function'
    TOOL = 'tool'

class Chat_Completion_Request_Message(BaseModel):
    role: Chat_Completion_Roles
    content: str

class Confidence(Enum):
    HIGH = 'high'
    MEDIUM = 'medium'
    LOW = 'low'

class Insurance_Information(BaseModel):
    field_name: str
    field_value: str
    doc_string: str
    
class Confidence(BaseModel):
    field_name: str
    field_value: str
    doc_string: str
    confidence: Confidence
    reasoning: str

class Insurance_Information_List(BaseModel):
    insurance_information: List[Insurance_Information]
