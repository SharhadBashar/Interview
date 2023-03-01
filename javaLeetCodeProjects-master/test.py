class A(object):
  def method(*argv):
    print(argv)
    return argv
a = A()
a.method