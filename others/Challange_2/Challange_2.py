import sys
import csv
import operator
from datetime import datetime

####################################################################################################################
'''
This function gets the unsorted items from the csv file
It immedieately sorts them based on Device ID
Input: link to csv File
Output: It returns the data for the different IDs
'''
def readFromCSVFile(csvFileLink, deviceIDs):
  dataByID = [[]for i in range(deviceIDs)]
  with open(csvFileLink, 'rb') as csvFile:
    reader = csv.reader(csvFile, delimiter=',')
    next(reader) #skips the first row
    for row in reader:
      for i in range(deviceIDs):
        if row[0] == str(i + 1):
          dataByID[i].append([row[1], row[2], row[3], row[4], row[5]])
  #for i in range(len(dataByID)):
    #print (dataByID[i])
    #print '\n'
  return dataByID

'''
Below is my first implementation for getting the data.
I used two dictionaries to store them
But tis was heavily reliant on the fact that there will always be two device IDs
So i implemented the method above, which is more dynamic
But i left my first implementation below to show my initial thought process, and the fact that I can manipulate dictionaries

def readFromCSVFile(csvFileLink):
  deviceID_1 = {}
  deviceID_2 = {}
  with open(csvFileLink, 'rb') as csvFile:
      reader = csv.reader(csvFile, delimiter=',')
      next(reader) #skips the first row
      i, j = 0, 0
      for row in reader:
        if row[0] == "1":
          deviceID_1[i] = [row[1], row[2], row[3], row[4], row[5]]
          i += 1
        elif row[0] == "2":
          deviceID_2[j] = [row[1], row[2], row[3], row[4], row[5]]
          j += 1
  #for key, value in deviceID_1.items():
  #  print key, "=>", val
  #for key, value in deviceID_2.items():
  #  print key, "=>", val
  return (deviceID_1, deviceID_2)
'''
####################################################################################################################

'''
This function sorts the items based on the dates
Input: The array of items already sorted based on Device ID
Output: It returns the array sorted according to the dates (in an ascending order)
'''
def sortByDate(deviceID):
#get a list of the dates
  dates = []          #this wont be sorted
  datesToSort = []    #this will be sorted
  deviceIDSorted = [] #this will be returned
  for key, value in deviceID.items():
    dates.append(value[4])
    datesToSort.append(value[4])

#sort the list
  datesToSort.sort(key=lambda d: datetime.strptime(d, "%Y-%m-%d") if '-' in d else datetime.strptime(d, "%m/%d/%y"))

#find the date in the list and put them in a new dict of sorted values
  for i in range(len(dates)):
    dateIndex = dates.index(datesToSort[i])
    deviceIDSorted.append(deviceID.get(dateIndex))
    del deviceID[dateIndex]

#return said dict
  #for i in range(len(dates)):
  #  print deviceIDSorted[i]
  return deviceIDSorted
####################################################################################################################

'''
This function writes the sorted data to the csv File
Input: Link to csv File to save, The array of all items already sorted based on Device ID and dates
Output: It returns a boolean indicating the file was created and data saved
'''
def writeToCSVFile(csvFileLink, deviceIDSorted):
  with open(csvFileLink, 'w') as csvFile:
    fieldnames = ['Device_ID', 'A', 'B', 'C', 'D', 'Date']
    writer = csv.DictWriter(csvFile, fieldnames=fieldnames)
    writer.writeheader()
    for i in range(len(deviceIDSorted)):
      for j in range(len(deviceIDSorted[i])):
        writer.writerow({'Device_ID' : (i+1), 'A' : deviceIDSorted[i][j][0], 'B' : deviceIDSorted[i][j][1], 'C' : deviceIDSorted[i][j][2], 'D' : deviceIDSorted[i][j][3], 'Date' : deviceIDSorted[i][j][4]})
  return True
####################################################################################################################

'''
Main function
Input: number of device IDs
'''
def main(deviceIDs):
  deviceIDs = int(deviceIDs)
  deviceIDSorted = [[]for i in range (deviceIDs)]

  dataByID = readFromCSVFile('random_data.csv',deviceIDs)
  for i in range(len(dataByID)):
    devideIDDict = {} #creating a dictionary for easier manipulation of data
    for j in range(len(dataByID[i])):
      devideIDDict[j] = dataByID[i][j]
    deviceIDSorted[i].extend(sortByDate(devideIDDict))
  #for i in range(len(deviceIDSorted)):
  #  for j in range(len(deviceIDSorted[i])):
  #    print deviceIDSorted[i][j]

  isDone = writeToCSVFile('random_data_sorted.csv', deviceIDSorted)
  if isDone:
    print "Data sorted and stored to file"

#To call this code: python Challange_2.py 2
if __name__ == "__main__":
  main(sys.argv[1])

