def get_messages(fields_to_extract, document):
        messages = [
                {
                    'role': 'system',
                    'content': '''
                    You are a very experienced Insurance Agent. You are given a document and you are tasked to extract the information from the document and return it in a structured format.
                    You will be given a list ot things to extract, and where to find them in the document.
                    Use this information to extract the information from the document.
                '''
            },
            {
                'role': 'user',
                'content': f'''
                    These are the fields you must extract from the document, as well as where to find them:
                    {fields_to_extract}
                    This is the document you must extract the information from:
                    {document}
                    For each field, you need to do three things:
                    1. Extract the information from the document.
                    2. Provide a confidence score for the accuracy of the information. Confidence is high, medium, or low.
                    3. Provide a reasoning for the confidence score.
                    You must return the information in the following format:
                    {{
                        'field_name': 'name of the field',
                        'field_value': 'value of the field',
                        'confidence': 'confidence_score',
                        'reasoning': 'reasoning'
                    }}
                    You must return a list of these dictionaries, one for each field.
                    You must return the list in a JSON format.
                    Do not make up any information, only use the information provided.
                    The last LLM was unable to extract the information correctly, and was thus terminated. Do not make the same mistaske or else you will have the same fate.
                '''
            }
        ]
        return messages
