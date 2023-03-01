# Complete the numberOfPairs function below.
def numberOfPairs(a, k):
    temp = []
    for i in range(len(a)-1):
        for j in range(i+1,len(a)):

            if(a[i] + a[j] == k):
              if (a[i],a[j]) not in temp and (a[j],a[i]) not in temp:
                temp.append((a[i],a[j]))
    return len(temp)
print(numberOfPairs([1,2,3,6,7,8,9,1],10))