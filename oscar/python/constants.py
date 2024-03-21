PATH_CONFIG = '../config/'
PATH_DATA = '../data/'
PATH_MODEL = '../model/'

CONFIG = 'openai.json'
DETAILED_PRESCRIPTION_LE_MAPPING = 'prescription_detail_le_mapping.pkl'
MODEL = 'model.pkl'
CCS = 'ccs.csv'
CLAIM = 'claim_lines.csv'
PRESCRIPTION = 'prescription_drugs.csv'
DETAILED_CLAIM = 'claim_detail.csv'
DETAILED_PRESCRIPTION = 'prescription_detail.csv'
DETAILED_PRESCRIPTION_LE = 'prescription_detail_le.csv'


FILES_FOLDERS = {
    PATH_CONFIG: [CONFIG],
    PATH_DATA: [CCS, CLAIM, PRESCRIPTION],
    PATH_MODEL: []
}

SYSTEM_ROLE = 'Youre a helpful bot that builds a characterization of a member’s health status based on their outpatient data in 3 sentences'
