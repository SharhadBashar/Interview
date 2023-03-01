## PART A
class main (object):
  inputs = []
  outputs = []
  def __init__(self, n):
    self.n = n

  @property
  def input(self):
    return self._attr

  @input.setter
  def input(self, input):
    inputs = main.inputs
    inputs.append(input)
    self.output(inputs)

  def runBackSub(self, arr):
    n = self.n
    sum = 0
    arrLen = len(arr)

    length = arrLen if n >= arrLen else n
    limit = -1 if n >= arrLen else arrLen - n - 1
    for i in range(arrLen - 1, limit, -1):
      sum += arr[i]
    return (round(arr[arrLen - 1] - sum / length, 1))

  def output(self, inputs):
    outputs = main.outputs
    outputs.append(self.runBackSub(inputs))
    print("Input:", inputs)
    print("Output:", outputs)

filter = main(3)
filter.input = 5
filter.input = 20
filter.input = 45
filter.input = 27
filter.input = 50

#Input:  [5,   20,  45,    27,  50]
#Output: [0.0, 7.5, 21.7, -3.7, 9.3]


