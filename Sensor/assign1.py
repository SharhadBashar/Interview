class main(object):
  def __init__(self, attr):
    self._attr = attr

  @property
  def attr(self):
    return self._attr

  @attr.setter
  def attr(self, value):
    if self._attr != value:
      self.flag = False
      self.ret1 = self.fun1(self._attr, value)
      self.ret2 = self.fun2(self._attr, value)
      self.ret3 = self.fun3(self._attr, value)
      self._attr = value

  def fun1(self, old, new):
    print("old:", old)
    print("new:", new)
    print ("func 1 called if value changes")
    #self.flag = True

  def fun2(self, old, new):
    if not self.flag:
      self.flag = True
      print("old:", old)
      print("new:", new)
      print ("func 2 called if value changes")


  def fun3(self, old, new):
    if not self.flag:
      print("old:", old)
      print("new:", new)
      print ("func 3 called if value changes")



a = main(5)
a.attr = 10
a.attr = 10
a.attr = 15



#old: 5
#new: 10
#func 1 called if value changes
#old: 5
#new: 10
#func 2 called if value changes
#old: 10
#new: 15
#func 1 called if value changes
#old: 10
#new: 15
#func 2 called if value changes