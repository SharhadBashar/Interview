import pandas as pd
from pprint import pprint

def legal_transaction_by_currency(csv_filename):
    df = pd.read_csv('data.csv')
    df['currency'] = df['currency'].str.lower()
    df = df.dropna(subset = ['transaction_amount'], how = 'any')
    df['transaction_amount'] = pd.to_numeric(df['transaction_amount'])
    legal_transactions = df[df['legal'] == True]
    sum_by_currency = legal_transactions.groupby('currency')['transaction_amount'].sum().to_dict()
    for key, value in sum_by_currency.items():
        rounded_value = round(value, 2)
        sum_by_currency[key] = rounded_value
    all_legal_transaction = legal_transactions['transaction_amount'].sum()
    return sum_by_currency, round(all_legal_transaction, 2)


sum_by_currency, all_legal_transaction = legal_transaction_by_currency('data.csv')
print('Sum of all legal transactions:', all_legal_transaction, '\n')
print('Sum of all legal transactions by currency:')
pprint(sum_by_currency)
