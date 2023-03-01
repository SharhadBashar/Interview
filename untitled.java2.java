//-1a1
class atoi {
  public int convert(String s) {
    int result = 0;
    int isNeg = 1;
    if (s == null || s.length() < 1) return 0;

    s = s.trim();
    if (s(0).equals('-')) {
      isNeg = -1;
      s = removeFirstChar(s);
    }
    //s = 1a1

    for (int i = 0; i < s.length(); i++) {
      char c = s[i];
      if (isInt(char(c))) {
        result = result * 10 + findChar(c);
      }
      else {
        break;
        // return isNeg * result;
      }
    }
    return isNeg * result;
  }

  private int findChar(char c) {
    char[] chars = {'1', '2', '3', '4', ...}

  }
}