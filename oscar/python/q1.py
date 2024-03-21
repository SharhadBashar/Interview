import os
import json
import pandas as pd

from openai import OpenAI

from constants import *

import warnings
warnings.filterwarnings('ignore')

class Q1:
    def __init__(self):
        if (not os.path.isfile(os.path.join(PATH_DATA, DETAILED_CLAIM))):
            print('Detailed Claims CSV does not exist')
            self.create_detailed_claims()
        self.df = pd.read_csv(os.path.join(PATH_DATA, DETAILED_CLAIM))

    def create_detailed_claims(self):
        print('Creating Detailed Claims CSV...')
        df_ccs = pd.read_csv(os.path.join(PATH_DATA, CCS))
        df_claim = pd.read_csv(os.path.join(PATH_DATA, CLAIM))
        df_claim['diag'] = df_claim['diag1'].str.replace('.', '')
        df_claim_detail = pd.merge(df_claim, df_ccs, on = 'diag', how = 'left')
        df_claim_detail = df_claim_detail.drop(['record_id', 'diag1'], axis = 1)
        df_claim_detail.to_csv(os.path.join(PATH_DATA, DETAILED_CLAIM))
        print('Detailed Claims CSV Created')

    def diag_info(self, member_id, df):
        member_df = df[df['member_id'] == member_id]
        if (member_df.empty):
            print(f'Member ID: {member_id} does not exist. Try again')
            return

        start_date = member_df['date_svc'].min()
        end_date = member_df['date_svc'].max()

        diags = member_df.groupby('diag')

        num_diag = diags.ngroups
        if (num_diag == 1): diagnosis_analysis = f'only one'
        elif (num_diag > 1 and num_diag <= 5): diagnosis_analysis = f'few (to be more specific {num_diag}) different'
        elif (num_diag > 5 and num_diag <= 10): diagnosis_analysis = f'some (to be more specific {num_diag}) different'
        else: diagnosis_analysis = f'several (to be more specific {num_diag}) different'

        return (start_date, end_date, num_diag, diagnosis_analysis, member_df)

    def report(self, member_id = None):
        df = self.df
        if not member_id:
            print('No member id provided. Picking random Member ID...\n')
            member_id = df['member_id'].sample(n = 1).item()

        start_date, end_date, num_diag, diagnosis_analysis, member_df = self.diag_info(member_id, df)

        history = None
        if (member_df.shape[0] != num_diag):
            diagnosis_counts = member_df.groupby('ccs_3_desc').size()
            # Sorting counts in descending order, and if counts are equal, sorting by date of diagnosis
            top_diagnoses = diagnosis_counts.reset_index(name = 'Count').sort_values(by = ['Count', 'ccs_3_desc'], ascending=[False, True])
            
            if (num_diag == 1): 
                history = f"Their biggest and only concern is {top_diagnoses.head(1)['ccs_3_desc'].values[0]}."
            elif (num_diag > 1 and num_diag <= 5):
                history = f"Amongst others, their biggest concern is {top_diagnoses.head(1)['ccs_3_desc'].values[0]}."
            elif (num_diag > 5 and num_diag <= 10):
                top_2_diag = top_diagnoses.head(2)
                diag_1 = top_2_diag['ccs_3_desc'].values[0]
                diag_2 = top_2_diag['ccs_3_desc'].values[1]
                history = f"Amongst others, their biggest concerns are {diag_1} and {diag_2}."
            else:
                top_4_diag = top_diagnoses.head(4)
                diag_1 = top_4_diag['ccs_3_desc'].values[0]
                diag_2 = top_4_diag['ccs_3_desc'].values[1]
                diag_3 = top_4_diag['ccs_3_desc'].values[2]
                diag_4 = top_4_diag['ccs_3_desc'].values[3]
                history = f"Amongst others, their biggest concerns are {diag_1}, {diag_2}, {diag_3} and {diag_4}."
        
        print('--- MEMBER REPORT ---')
        print(f'Member {member_id} has been coming in since {start_date}. Their latest visit was {end_date}.')
        print(f'They had {diagnosis_analysis} diagnosis during the time period.')
        if history: print(history)
        print(f"Their latest concern is {member_df['diag_desc'].iloc[-1]}.")
        print('-------------------------------------')

    def get_openai_message(self, history):
        message = []
        message.append({'role': 'system', 'content': SYSTEM_ROLE})
        message.append({'role': 'user', 'content': 'Patient history: {}'.format(history)})
        return message

    def report_llm(self, member_id = None):
        df = self.df
        if not member_id:
            print('No member id provided. Picking random Member ID...\n')
            member_id = df['member_id'].sample(n = 1).item()
        
        start_date, end_date, num_diag, diagnosis_analysis, member_df = self.diag_info(member_id, df)

        member_df['diagnosis'] = member_df['diag_desc'] + ' ' + \
                             member_df['ccs_1_desc'] + ' ' + \
                             member_df['ccs_2_desc'] + ' ' + \
                             member_df['ccs_3_desc']
    
        member_df = member_df[['date_svc', 'diagnosis']]
        history = member_df.to_dict('records')

        with open(os.path.join(PATH_CONFIG, CONFIG)) as file:
            info = json.load(file)
        openai = OpenAI(
            api_key = info['openai']['key']
        )
        response = openai.chat.completions.create(
            model = 'gpt-3.5-turbo',
            messages = self.get_openai_message(history),
        )

        print('--- MEMBER REPORT (LLM Generated) ---')
        print(f'Member {member_id} has been coming in since {start_date}. Their latest visit was {end_date}.')
        print(f'They had {diagnosis_analysis} diagnosis during the time period.')
        print(response.choices[0].message.content)
        print('-------------------------------------')
