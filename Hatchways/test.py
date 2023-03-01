table = []
anotherStack = []
deps = {}
def read():
  f = open("dependencies.txt", "r")
  lines = f.readlines()
  for i in range(1, len(lines)):
    dep = lines[i].split(",")
    dep[1] = dep[1].rstrip()
    table.append((int(dep[0]), int(dep[1])))
  for k, d in table:
    if k not in deps:
      deps[k] = {}
    if d not in deps:
      deps[d] = {}
    deps[k][d] = True


def write(a, d, stack, f):
  if (a not in anotherStack):
    f.write("%sId: %d, Name: Order %d" % (d * "  ", a, a) + "\n")
    stack.append(a)
    anotherStack.append(a)
    for b, v in deps[a].items():
      if (not b in stack):
        f.write((d*"  ") + " Dependencies\n")
        write(b, d+1, stack, f)



if __name__ == "__main__":
  read()
  f = open("output.txt","w+")
  for k,d in table:
    write(k, 0, [], f)
  f.close()
