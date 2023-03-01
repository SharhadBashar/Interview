'''
Sharhad Bashar
Function to find and highlight yellow circles in images
8/7/2019
'''

from datetime import datetime
import sys
import numpy as np
import cv2

'''
Reads the image from directory and returns original and hsv of image
Input: imagePath, Path to image
Output: originalImage, The original image
        hsv, The hsv of image
'''
def readImage(imagePath):
  image = cv2.imread(imagePath)
  originalImage = image.copy()
  hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
  return [originalImage, hsv]

'''
Finds and highlights yellow circles in image
Input: image, the unaltered image
       hsv, the hsv of image
Output: image, The image with yellow circles highlighted
'''
def highlightCircles(image, hsv):
  # Lower and upper values of yellow
  lower = np.array([20, 100, 100])
  upper = np.array([30, 255, 255])
  maskImage = cv2.inRange(hsv, lower, upper)
  # Uncomment the next three lines to show the masked image
  # cv2.imshow('Mask', maskImage)
  # cv2.imwrite('mask.png', maskImage)
  # cv2.waitKey(0)
  # finds all items that fall in the range set above
  contours = cv2.findContours(maskImage, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
  contours = contours[0]
  for contour in contours:
    perimeter = cv2.arcLength(contour, True)
    approxContour = cv2.approxPolyDP(contour, 0.04 * perimeter, True)
    if len(approxContour) > 6:
      cv2.drawContours(original, [contour], -1, (228, 88, 236), -1)
  return image

'''
Writes and shows the highlighed image to directory with filename and date
Input: image, The image to write
       filename, The name of file
Output: void
'''
def writeImage(image, filename):
  cv2.putText(image, "Filename: " + filename, (10, 15), cv2.FONT_HERSHEY_PLAIN, 0.75, (0, 0, 0), 1)
  cv2.putText(image, "Date: " + datetime.now().strftime("%d/%m/%Y"), (10, 25), cv2.FONT_HERSHEY_PLAIN, 0.75, (0, 0, 0), 1)
  cv2.imshow('Output', image)
  cv2.imwrite('output.png', image)
  cv2.waitKey(0)
  cv2.destroyAllWindows()

'''
Verifies the correct number of circles in the output
Input: items, The number of items in the image
Output: true if correct number of items found, false otherwise
'''
def verify(items):
  image = cv2.imread('output.png')
  hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
  rgb = np.array([228, 88, 236])
  maskCheck = cv2.inRange(image, rgb, rgb)
  # Uncomment the next three lines to show the masked check image
  # cv2.imshow('Check', maskCheck)
  # cv2.imwrite('check.png', maskCheck)
  # cv2.waitKey(0)
  contours = cv2.findContours(maskCheck, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
  return len(contours) == int(items)

'''
Main function
Input: sys.argv[1], name of image
'''
if __name__ == "__main__":
  filename = input("Enter name of image: ")
  # filename = sys.argv[1]
  [original, hsv] = readImage(filename)
  highlightedImage = highlightCircles(original, hsv)
  writeImage(highlightedImage, filename)
  print ("Application completed")
  print ("Verifying output")
  items = input("Enter number of circles in image {}: ".format(filename))
  # items = sys.argv[2]
  test = verify(items)
  if (test):
    print("Found the correct number of yellow circles")
  else:
    print("Could not find the correct number of yellow circles")



