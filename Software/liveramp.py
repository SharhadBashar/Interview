#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 29 18:09:42 2017

@author: Sharhad
"""
def bubbleSort(num):
    for passnum in range(len(num)-1,0,-1):
        for i in range(passnum):
            if num[i]>num[i+1]:
                temp = num[i]
                num[i] = num[i+1]
                num[i+1] = temp
    return num

def biggest(num, limit):
    num = bubbleSort(num)
    for i in range(len(num)-1,-1,-1):
        if (num[i] <= limit):
            return num[i]
        
def deleteNum (num,number,length):
    newNum = []
    for i in range (len(num)):
        if num[i] != number:
            newNum.append(num[i])
    for i in range (length):
        if len(newNum) != length:
            newNum.append(number)
    return newNum
        

def time (a,b,c,d):
    num = [a,b,c,d]
    #time format: H1H2:M1M2 
    
    #H1 can be 0 -> 2
    if (a < 3 or b < 3 or c < 3 or d < 3):
        H1 = biggest(num,2)

        num = deleteNum(num, H1, 3)
        
    #H2 can be 0 -> 3    
    if (a < 4 or b < 4 or c < 4 or d < 4):
        if (H1 == 2):
            H2 = biggest(num,3)
            num = deleteNum(num, H2, 2)
        else:
            H2 = biggest(num,9)
            num = deleteNum(num, H2, 2)
        
    # M1 can be 0 -> 5     
    if (a < 6 or b < 6 or c < 6 or d < 6):
        M1 = biggest(num,5)
        num = deleteNum(num, M1, 1)
    
    #M2 can be 0 -> 9
    if (a < 10 or b < 10 or c < 10 or d < 10):
        M2 = biggest(num,9)
        
    if (H1 == None or H2 == None or M1 == None or M2 == None):
        return ('NOT POSSIBLE')
        
    return (str(H1) + str(H2) + ':' + str(M1) + str(M2))
    
print time (1,8,3,2)
print time (2,4,0,0)
print time (3,0,7,0)
print time (9,1,9,7)

        
    
