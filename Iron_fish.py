'''
Overview
Build a system that reads blocks from a stream and assigns a point to the user who mined the block. The output will be a set of weekly leaderboards.

A user earns 1 point for each block they mine.

Each block's timestamp is in days. For example, the first week includes timestamps 0-6. There may be duplicate or missing timestamps, but the blocks will be ordered by timestamp.

Points carry over to subsequent weeks, so once a user earns points in a week, they will appear in every subsequent leaderboard.
Input
The input will be an array of arrays containing user and timestamp pairs in the format:
[user, timestamp]

Example:
[
  [“jason”, 0],
  [“derek”, 1],
  [“jason”, 3],
  [“derek”, 7],
]
Output
Output should be a list of weekly leaderboards. Each weekly leaderboard should contain a list of users and the points they’ve earned. The format of the output is unimportant, so results can be displayed however is easiest.

Example:
[
   [
       "jason,2",
       "derek,1",
   ],
   [
       "derek,2",
       "jason,2",
   ]
]

'''

input_arr = [
  ["productguy", 0],
  ["igrav", 1],
  ["igrav", 2],
  ["pilot764", 4],
  ["igrav", 5],
  ["productguy", 7],
  ["productguy", 8],
  ["igrav", 9],
  ["productguy", 9],
  ["productguy", 10],
  ["sand", 11],
  ["productguy", 12],
  ["sand", 13],
  ["productguy", 14],
  ["sand", 15],
  ["igrav", 16],
  ["productguy", 17],
  ["mage41", 19],
  ["LordAeron", 20]
]

expected_output = [
  [
    "igrav,3",
    "pilot764,1",
    "productguy,1"
  ],
  [
    "igrav,4",
    "productguy,6",
    "sand,2",
    "pilot764,1"
  ],
  [
    "productguy,8",
    "igrav,5",
    "sand,3",
    "LordAeron,1",
    "mage41,1",
    "pilot764,1"
  ]
]

def func(input_arr):
  output_dict = {}
  for item in input_arr:
    week_num = item[1] // 7
    try:
      output_dict[week_num][item[0]] += 1
    except:
      if not week_num in output_dict:
        output_dict[week_num] = {}
      output_dict[week_num][item[0]] = 1
  
  for i in range(1, len(output_dict)):
    output_dict[i] = {j: output_dict[i].get(j, 0) + output_dict[i - 1].get(j, 0)
                     for j in set(output_dict[i]).union(output_dict[i - 1])}
  print(output_dict)

func(input_arr)



