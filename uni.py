import itertools
def FetchSubList(origList = [2,3,-4,2,2,-1,2,2,2,-3,3], conditionSum = 5):
    n = len(origList)
    L = []
    output = []
    indices = list(range(n + 1))
    for i, j in itertools.combinations(indices, 2):
        L.append(origList[i: j])
    for sub_array in L:
        if (sum(sub_array) == 5):
            output.append(sub_array)
    print(output)
FetchSubList()