# Given a list of N intervals, merge overlapping intervals and return
#    a simplified list such that the intersection of any 2 intervals is []
# examples:
#    input: [[1, 5], [6, 13], [4, 10]]
#    output: [[1, 13]]
#    input: [[1, 6], [2, 8], [3, 10], [11, 13]]
#    output: [[1, 10], [11,13]]


def func(intervals):
    if len(intervals) == 0: return []
    index = 0
    output = []

    intervals.sort(key = lambda x: x[0]) #[[1, 13], [4, 10], [6, 13]]

    for i in range(1, len(intervals)):
        if (intervals[index][1] >= intervals[i][0]):
            intervals[index][1] = max(intervals[index][1], intervals[i][1])
        else:
            index += 1
            intervals[index] = intervals[i]
    
    for i in range(index + 1):
        output.append(intervals[i])
    
    return output
    

intervals = [[1, 6], [2, 8], [3, 10], [11, 13]]
print(func(intervals))

