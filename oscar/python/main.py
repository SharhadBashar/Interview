import os
import sys

from q1 import Q1
from q2 import Q2
from constants import *

def setup():
    for folder in FILES_FOLDERS.keys():
        if (not os.path.exists(folder)):
            os.makedirs(folder)
            
    for folder, files in FILES_FOLDERS.items():
        for file in files:
            if (not os.path.isfile(os.path.join(folder, file))):
                print(f'"{file}" in "{folder}" does not exist. Please add it.')
                quit()
               
if __name__ == '__main__':
    setup()
    args = sys.argv
    try:
        question = args[1]
    except Exception as e:
        print('Please enter "q1" or "q2" as the first argument')
        quit()

    if (question == 'q1'):
        try:
            llm = args[2]
        except:
            llm = False
        q1 = Q1()
        while(True):
            member_id = input('Please enter Member ID or "x" to exit: ')
            print()
            if (member_id == 'x'):
                quit()
            if llm:
                q1.report_llm(member_id)
            else:
                q1.report(member_id)
            print()
    elif (question == 'q2'):
        try:
            train = args[2]
        except:
            train = False
        q2 = Q2()
        if train:
            classifier = input('What classifier do you want to train with? ')
            q2.train(classifier)
        else:
            print('Enter the following info to make a prediction:')
            drug_category = input('Drug Category: ')
            drug_group = input('Drug Group: ')
            drug_class = input('Drug Class: ')
            print('Diagnosis:', q2.predict(drug_category, drug_group, drug_class))
