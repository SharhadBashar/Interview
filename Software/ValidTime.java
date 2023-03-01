package hackerrank;

class Solution {
  private String invalidTimeString = "NOT POSSIBLE";
  private int[] maxValidDigits = { 2, 9, 5, 9 };

  // return the max valid time (24hr format) using the provided numbers
  public String Solution(int A, int B, int C, int D) {
    int[] fourDigits = { A, B, C, D };

    int[] timeDigits = new int[4];
    
    for (int i = 0; i < 4; i++) {
      
      int maxDigit = -1;
      int maxDigitIndex = -1;
      for (int j = 0; j < fourDigits.length; j++) {
        
        if (fourDigits[j] <= maxValidDigits[i]
            && fourDigits[j] > maxDigit) {
          maxDigit = fourDigits[j];
          maxDigitIndex = j;
        }
      }
      if (maxDigitIndex != -1) {
        fourDigits[maxDigitIndex] = -1;
      }
      
      //special case for hour digit if the tenth hour digit is 2
      if (i == 0 && maxDigit == 2) {
        maxValidDigits[1] = 3;
      }
      
      //check if it isn't possible to display a valid time
      if (maxDigit == -1) {
        return invalidTimeString;
      } else {
        timeDigits[i] = maxDigit;
      }
    }

    //output the max possible valid time
    String outputTimeString = timeDigits[0] + "" + timeDigits[1] + ":"
        + timeDigits[2] + "" + timeDigits[3];
    return outputTimeString;
  }
}
