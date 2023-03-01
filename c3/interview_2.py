# Write a function that when given an array of integers that represents the elevations of a mountain range, return the amount of water the mountain range can hold.
# https://leetcode.com/problems/trapping-rain-water/description/

# e.g. 


# [1 0 2] ==> 1


#      _
#  _  | |
# | |_| |

# [0 1 3 0 1 2 1] ==> 
#      _
#     | |    _
#    _| |  _| |_
#  _|   |_|     |


def measureWater(elevations):
  n = len(elevations)
  water = 0
  left = [0] * n
  right = [0] * n
  
  left[0] = elevations[0]
  for i in range(1, n):
    left[i] = max(left[i - 1], elevations[i])

  right[n - 1] = elevations[n - 1]
  for i in range(n - 2, -1, -1):
    right[i] = max(right[i + 1], elevations[i])

  for i in range(n):
    water += min(left[i], right[i]) - elevations[i]
  return water

print(measureWater([1,2,3,2,1]))




# [3 0 2 0 4] ==> 
#      _
#     | |    _
#    _| |  _| |_
#  _|   |_|     |