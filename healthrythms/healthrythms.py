import numpy as np
import pandas as pd


def solution(files):
    # files - any of available files, i.e:
    # files = ["./data/framp.csv", "./data/gnyned.csv", "./data/gwoomed.csv",
    #            "./data/hoilled.csv", "./data/plent.csv", "./data/throwsh.csv",
    #            "./data/twerche.csv", "./data/veeme.csv"]

    # write your solution here
    output = []
    for file in files:
        df = pd.read_csv(file)
        vol_df = get_vol(df)
        close_df = get_close(df)
        output.append([vol_df, close_df])
    return output

# Gets the volumes for each company for each year
def get_vol(df):
    vol_dict = {}
    for index, row in df.iterrows():
        date = row['date']
        year = date.split('-')[0]
        vol = row['vol']
        try:
            date_dict_year, vol_dict_year = vol_dict[year]
            if (vol > vol_dict_year):
                vol_dict[year] = [date, vol]
        except:
            vol_dict[year] = [date, vol]
    return pd.DataFrame(list(vol_dict.values()), columns = ['date', 'vol'])
    
# Gets the closing price (not sorted) for each company for each year. might contain multiple closing prices
def get_close(df):
    close_dict = {}
    temp = []
    for index, row in df.iterrows():
        date = row['date']
        year = date.split('-')[0]
        close = row['close']
        try:
            date_dict_year, close_dict_year = close_dict[year]
            if (close > close_dict_year):
                close_dict[year] = [date, close]
            if (close == close_dict_year):
                temp.append([date, close])
        except:
            close_dict[year] = [date, close]
    return pd.DataFrame(list(close_dict.values()) + temp, columns = ['date', 'close'])




