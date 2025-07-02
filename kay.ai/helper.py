import re
import json

def read_txt(document_path):
    with open(document_path, 'r') as f:
        return f.read()
    
def extract_json(text):
    # Extract the JSON part from the text, removing markdown code block markers
    json_match = re.search(r'```json\s*([\s\S]*?)\s*```', text)
    
    if json_match:
        json_str = json_match.group(1)
        
        try:
            # Parse the extracted JSON
            json_data = json.loads(json_str)
            return json_data
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            return None
    else:
        print("No JSON found in the text")
        return None