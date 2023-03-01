#!/bin/python3

import math
import os
import random
import re
import sys


import numpy as np
import pandas as pd
#
# Complete the 'predictLevel' function below.
#
# The function is expected to return a FLOAT_ARRAY.
# The function accepts following parameters:
#  1. STRING startDate
#  2. STRING endDate
#  3. STRING_ARRAY knownTimestamps
#  4. FLOAT_ARRAY level
#  5. STRING_ARRAY timestamps
#

def predictLevel(startDate, endDate, knownTimestamps, level, timestamps):
    known = [True] * len(knownTimestamps)
    df = pd.DataFrame({'time': knownTimestamps, 'level': level, 'known': known})
    
    unknown = [False] * len(timestamps)
    unknown_level = [np.NaN] * len(timestamps)
    unknown_level_df = pd.DataFrame({'time': timestamps, 'level': unknown_level, 'known': unknown})
    
    df = pd.concat([df, unknown_level_df], keys = ['time', 'level', 'known'], ignore_index = True)
    df['time'] = pd.to_datetime(df['time'])
    df = df.sort_values(by = ['time'])
    df = df.interpolate()
    
    return df[df['known'] == False]['level'].tolist()

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    startDate = input()

    endDate = input()

    knownTimestamps_count = int(input().strip())

    knownTimestamps = []

    for _ in range(knownTimestamps_count):
        knownTimestamps_item = input()
        knownTimestamps.append(knownTimestamps_item)

    level_count = int(input().strip())

    level = []

    for _ in range(level_count):
        level_item = float(input().strip())
        level.append(level_item)

    timestamps_count = int(input().strip())

    timestamps = []

    for _ in range(timestamps_count):
        timestamps_item = input()
        timestamps.append(timestamps_item)

    result = predictLevel(startDate, endDate, knownTimestamps, level, timestamps)

    fptr.write('\n'.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
