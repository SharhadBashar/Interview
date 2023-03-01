import sys

'''
Function that finds the numbers with all even digits
Input: the range of the numbers
Output: list of the numbers
'''
def AllEvenInt(lowerLimit, upperLimit):
  listOfEvenNums = []
  for numRange in range(lowerLimit,upperLimit + 1):
      if all(int(indvNum) % 2 == 0 for indvNum in str(numRange)):
          listOfEvenNums.append(numRange)
  return listOfEvenNums
###################################################################

'''
Main function
Input: Number range
'''
def main(numRange):
  listOfEvenNums = AllEvenInt(int(numRange[1]), int(numRange[2]))
  for i in range(len(listOfEvenNums)):
    print str(listOfEvenNums[i]) + ",",

#To call this code: python Challange_1.py 1000 3000
if __name__ == "__main__":
  main(sys.argv)