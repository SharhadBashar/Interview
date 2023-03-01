## PART C
class main (object):
  inputs = []
  outputs = []
  def __init__(self, n, trace):
    self.n = n
    self.trace = trace

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
    trace = self.trace
    arrLen = len(arr)
    output = []
    weight = 0

    length = arrLen if n >= arrLen else n
    limit = -1 if n >= arrLen else arrLen - n - 1
    for j in range(trace):
      weight = (j + 1) / trace;
      sum = 0
      for i in range(arrLen - 1, limit, -1):
        sum += arr[i][j]
      output.append(round(weight * (arr[arrLen - 1][j] - sum/length) , 2))
    return output

  def output(self, inputs):
    outputs = main.outputs
    outputs.append(self.runBackSub(inputs))
    print("Input:", inputs)
    print("Output:", outputs)

filter = main(5, 4)
filter.input = [20, 25, 70, 35]
filter.input = [22, 26, 75, 32]
filter.input = [25, 24, 74, 32]
filter.input = [21, 25, 68, 34]
filter.input = [18, 22, 71, 38]
filter.input = [29, 28, 63, 42]

#Input: [[20, 25, 70, 35], [22, 26, 75, 32], [25, 24, 74, 32], [21, 25, 68, 34], [18, 22, 71, 38], [29, 28, 63, 42]]
#Output: [[0.0, 0.0, 0.0, 0.0], [0.25, 0.25, 1.88, -1.5], [0.67, -0.5, 0.75, -1.0], [-0.25, 0.0, -2.81, 0.75], [-0.8, -1.2, -0.45, 3.8], [1.5, 1.5, -5.4, 6.4]]
