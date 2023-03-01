#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 27 20:54:45 2017
@author: Sharhad Bashar
Coding Challange for Intel
Sorts Cards based on Numerical value, and by suits: 2 < 3 < ... < K < A and Diamonds < Spades < Clubs < Hearts
"""

#imports numpy
import numpy as np

#decodes the face cards (J,Q,K,A) and assigns them a number
def cardValDecode(card):
    if (card == 'J'):
        return 11
    elif (card == 'Q'):
        return 12
    elif (card == 'K'):
        return 13
    elif (card == 'A'):
        return 14
    else :
        return int(card)

#encodes the numbers back to their corresponding face card (J,Q,K,A)
def cardValEncode(card):

    if (card <= 10):
        return  card
    elif (card == 11):
        return 'J'
    elif (card == 12):
        return 'Q'
    elif (card == 13):
        return 'K'
    elif (card == 14):
        return 'A'
    
#(Quick sort to sort the numeric value of the cards)
def sort(cardList):
    return np.sort(cardList)    

#main function
def solver (cards):
    #Creases array lists to save the results
    diamond = []
    spade = []
    club = []
    heart = []
    finalList = []
    
    #length of input
    length = len(cards)

    for i in range (length):
        #seperate the suit and value of the card
        seperate = list(cards[i]) 
        
        if (seperate[-1] == 'd'):
            if len(seperate) < 3 : 
                value = cardValDecode(seperate[0])
                diamond.append(value)
            else : 
                value = cardValDecode(10)
                diamond.append(value)
            
        if (seperate[-1] == 's'):
            if len(seperate) < 3 : 
                value = cardValDecode(seperate[0])
                spade.append(value)
            else : 
                value = cardValDecode(10)
                spade.append(value)
            
        if (seperate[-1] == 'c'):
            if len(seperate) < 3 : 
                value = cardValDecode(seperate[0])
                club.append(value)
            else : 
                value = cardValDecode(10)
                club.append(value)
            
        if (seperate[-1] == 'h'):
            if len(seperate) < 3 : 
                value = cardValDecode(seperate[0])
                heart.append(value)
            else : 
                value = cardValDecode(10)
                heart.append(value)

    #Sort the lists according to nuerical value        
    diamond = sort(diamond)
    spade   = sort(spade)
    club    = sort(club)
    heart   = sort(heart)
    
    #encode the number to face value and add them to the final list 
    for i in range(len(diamond)):
        finalList.append(str(cardValEncode(diamond[i])) + 'd')
    
    for i in range(len(spade)):
        finalList.append(str(cardValEncode(spade[i]))+ 's')
      
    for i in range(len(club)):
        finalList.append(str(cardValEncode(club[i])) +'c')
    
    for i in range(len(heart)):
        finalList.append(str(cardValEncode(heart[i])) + 'h')

    return finalList

#MAIN:    
cards = ["3c", "4s", "2d", "Qh", "Kh", "As", "Ac", "4h"] 
print solver(cards)




