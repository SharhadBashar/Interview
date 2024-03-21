import os
import pickle
import pandas as pd

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression, SGDClassifier

from q1 import Q1
from constants import *

class Q2:
    def __init__(self):
        if (not os.path.isfile(os.path.join(PATH_DATA, DETAILED_CLAIM))):
            print('Detailed Claims CSV does not exist')
            Q1().create_detailed_claims()
        self.clf = {
            'lr': LogisticRegression(class_weight = 'balanced'),
            'sgd': SGDClassifier(class_weight = 'balanced'),
            'scv': LinearSVC(class_weight = 'balanced'),
            'mnb': MultinomialNB(),
            'dtc': DecisionTreeClassifier(max_depth = 5, class_weight = 'balanced'),
            'mlp': MLPClassifier(),
            'knn': KNeighborsClassifier(),
            'random': RandomForestClassifier(class_weight = 'balanced')
        }
            
    def prep_data(self):
        label_encoder = LabelEncoder()
        label_mapping = {}
        
        df_claim = pd.read_csv(os.path.join(PATH_DATA, DETAILED_CLAIM))
        df_prescription = pd.read_csv(os.path.join(PATH_DATA, PRESCRIPTION))
        df_claim = df_claim.dropna()
        df_prescription = df_prescription.dropna()

        df_prescription['date_svc'] = pd.to_datetime(df_prescription['date_svc'])
        df_claim['date_svc'] = pd.to_datetime(df_claim['date_svc'])
        df_prescription = df_prescription.sort_values(by = ['date_svc'])
        df_claim = df_claim.sort_values(by = ['date_svc'])

        merged_df = pd.merge_asof(df_prescription, df_claim, on = 'date_svc', by = 'member_id', direction = 'backward')
        merged_df = merged_df.drop(['record_id', 'member_id', 'date_svc', 'ndc', 'Unnamed: 0', 'diag', 'diag_desc', 'ccs_1_desc', 'ccs_2_desc'], axis = 1)
        merged_df = merged_df.dropna()
        merged_df.to_csv(os.path.join(PATH_DATA, DETAILED_PRESCRIPTION))

        for col in ['drug_category', 'drug_group', 'drug_class', 'ccs_3_desc']:
            merged_df[col] = label_encoder.fit_transform(merged_df[col])
            label_mapping[col] = dict(zip(label_encoder.classes_, label_encoder.transform(label_encoder.classes_)))
            
        with open(os.path.join(DETAILED_PRESCRIPTION_LE_MAPPING), 'wb') as f:
            pickle.dump(label_mapping, f)

        merged_df.to_csv(os.path.join(PATH_DATA, DETAILED_PRESCRIPTION_LE))
        
    def train(self, classifier = 'random'):
        print(f'Training Q2 with {classifier}')
        if (not os.path.isfile(os.path.join(PATH_DATA, DETAILED_PRESCRIPTION))):
            self.prep_data()

        df = pd.read_csv(os.path.join(PATH_DATA, DETAILED_PRESCRIPTION_LE))
        X = df[['drug_category', 'drug_group', 'drug_class']]
        y = df['ccs_3_desc']
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 42)
        
        clf = self.clf[classifier]
        
        clf.fit(X_train, y_train)
        
        with open(os.path.join(PATH_MODEL, MODEL), 'wb') as f:
            pickle.dump(clf, f)
            print(f'Model saved in {PATH_MODEL}{MODEL}')
            
        y_pred = clf.predict(X_test)
        
        accuracy = accuracy_score(y_test, y_pred)
        # f1 = f1_score(y_test, y_pred)
        # precision = precision_score(y_test, y_pred)
        # recall = recall_score(y_test, y_pred)

        print('Accuracy:', accuracy)
        # print('F1:', f1)
        # print('Precision:', precision)
        # print('Recall:', recall)
                
    def predict(self, drug_category, drug_group, drug_class):
        with open(DETAILED_PRESCRIPTION_LE_MAPPING, 'rb') as file:
            label_mapping = pickle.load(file)
        clf = pickle.load(open(os.path.join(PATH_MODEL, MODEL),'rb'))
        
        drug_category_le = label_mapping['drug_category'][drug_category]
        drug_group_le = label_mapping['drug_group'][drug_group]
        drug_class_le = label_mapping['drug_class'][drug_class]
        diag_list = list(label_mapping['ccs_3_desc'].keys())
        
        inp = pd.Series([drug_category_le, drug_group_le, drug_class_le])
        inp = inp.values.reshape(1, -1)
        out = clf.predict(inp)
        
        return diag_list[out[0]]
