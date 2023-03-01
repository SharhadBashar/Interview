# https://www.enjoyalgorithms.com/blog/minimum-number-of-jumps-to-reach-end
# https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/

# Input: arr[] = {1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9}
# Output: 3 (1-> 3 -> 9 -> 9)

#Input:  arr[] = {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1}
#Output: 10


def min_jumps(arr, n):
  jumps = [0 for i in range(n)]

  if ((n == 0) or arr[0] == 0):
    return float('inf')
  
  jumps[0] = 0
  #Find the minimum number of jumps needed to reach arr[i] from arr[0] and store this value in jumps[i]

  for i in range(1, n):
    jumps[i] = float('inf')
    for j in range(i):
      if((i <= j + arr[j]) and (jumps[j] != float('inf'))):
        jumps[i] = min(jumps[i], jumps[j] + 1)
        break
  return jumps[n - 1]

def min_jump_linear(arr, n):
  curr_max_reach = arr[0]
  steps_count = arr[0]
  jumps = 0
  for i in range(1, n - 1):
    curr_max_reach = max(curr_max_reach, i + arr[i])
    steps_count -= 1 
    if (steps_count == 0):
      jump += 1
      steps_count = curr_max_reach - i
  return jump + 1

arr = [1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9]
n = len(arr)