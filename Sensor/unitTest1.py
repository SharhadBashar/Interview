import unittest
from assign1 import main

class unitTest():
  def __init__(self):
    self.a = main(5)

  def test1(self):
    print('test 1')
    a = self.a
    a.attr = 10
    print(a.attr)
    self.ret = a.ret()
    print(self.ret)
    self.ret = None

  def test2(self):
    print('test 2')
    a = self.a
    print(a.attr)
    a.attr = 10
    self.ret = a.ret()
    print(self.ret)

a = unitTest()
a.test1()
a.test2()
