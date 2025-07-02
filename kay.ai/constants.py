LIMIT_1 = 1
LIMIT_100 = 100

WEAVIATE_COLLECTION_NAME = 'hotels_alpha'
PERPLEXITY_URL = 'https://api.perplexity.ai/chat/completions'

FIELDS_TO_EXTRACT = '''
        Information to Extract:

            1. Legal Name
            Source: Acord Apps (125) -> Applicant Information -> Name

            2. Legal Entity
            Source: Acord Apps (125) -> Applicant Information -> (Corporation, LLC, etc.)

            3. Effective Date
            Source: Acord Apps (125) -> PROPOSED EFF DATE

            4. Expiration Date
            Source: Acord Apps (125) -> PROPOSED EXP DATE

            5. Primary Phone Number
            Source: Acord Apps (125) -> Contact Information -> Primary Phone Number
            Known Challenges: If primary phone number is missing, input the agent's number.

            6. Customer Operations
            Source: Acord Apps (125) -> Description of Primary Operations

            7. Year Business Established
            Source: Acord Apps (125) -> Nature of Business -> Date Business Started
            Default: 5 years prior to current year if not provided.

            8. Number of Employees
            Source: Acord Apps (125) -> Premises Information -> Sum of Full-Time EMPL & Part-Time EMPL

            9. Prior Carrier Name
            Source: Acord Apps (125) -> Prior Carrier Information
    '''