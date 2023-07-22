from pprint import pprint
from collections import defaultdict

def question_1(tuple):
    dict = {}
    for key, value in tuple:
        if (key not in dict):
            dict[key] = [value]
        else:
            dict[key].append(value)
    return dict

def question_1_efficient(tuple):
    dict = defaultdict(list)
    for key, value in tuple:
        dict[key].append(value)
    return dict

input_list = [(1, 'a'), (2, 'b'), (1, 'c'), (4, 'a'), (100, 'e')]
output_dict = question_1(input_list)
print('Normal function:')
pprint(output_dict)
print()
output_dict = question_1_efficient(input_list)
print('Efficient function:')
pprint(output_dict)

