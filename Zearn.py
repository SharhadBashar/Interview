# Zearn
# given a set of lines need to check if all of them lie on the same line

import math

def on_line(points):
  if len(points) <= 2:
    return True
  elif len(points) == 3:
    return get_slope(points[0], points[1], points[2])
  
  else:
    #check for vertical line
    vertical = True
    i = 0
    while(vertical and i < len(points))
      vertical = not bool(points[i][0] - points[i + 1][0])
    if (vertical):
      return True
    i = 0
    in_line = True
    while(in_line and i < len(points) - 2):
      a = points[i]
      b = points[i + 1]
      c = points[i + 2]
      in_line = get_slope(a, b, c)
      i += 1
    return in_line
      

def get_slope(a, b, c):
  # y = mx + b
  # (yb - ya) / (xb - xa) = (yc - ya) / (xc - xa) 
  # return math.isclose((b - a).cross(c - a), 0.0)
  m_1 = (b[1] - a[1]) / (b[0] - a[0])
  m_2 = (c[1] - a[1]) / (c[0] - a[0])
  return m_1 == m_2

# print(on_line([[1,1], [2,2], [3,3], [4,5], [5,5]]))
[[3,4], [3,6], [3,7]]