#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 29 16:02:16 2017

@author: Sharhad
"""

def solution(A):
    start = 0
    end = 0
    for i in range (len(A)-1):
        if A[i] > A[i+1]:
            start = i

            
            for j in range(i+1,len(A)):
                if A[i] < A[j]:
                    end = j - 1
                if (j == len(A) - 1 and end == 0):
                    end = len(A)

            return (end - start)
    return 0
    


print solution ([1,2,6,5,5,8,9])
print solution([1,2,3,4,5,6])
print solution ([1,1,1,1,1,1])
print solution([4,3,2,1])