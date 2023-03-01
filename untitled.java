//Java
//Reverse words in a string

class reverse {
  //Time complexity is O(n)
  public String reserveStringBF(String s) {
    //remove any leading space
    s = s.trim();
    String output;
    //Split words by spaces
    String[] words = s.split();

    for (int i = words.length - 1; i <= 0; i--) {
      output = words[i] + " ";
    }

    return output;
  }

  //Time complexity is O(n)
  public String reverseString(String s) {

    s = s.trim();
    String output;
    //Split words by spaces
    List<String> words = Arrays.asList(s.split());
    Collections.reserve(words);
    return String.join(" ", words);
  }


  public string reverse(String s) {
    int n = s.size();
    int index = 0;

    //reverse the whole string
    reverse(s.begin(), s.end());

    for (int i = 0; i < n; i++) {

      //go to the end of the word
      int end = i;
      while (end < n && s[end] != ' ') {
        end++;
      }

      //reverse the word
      reverse(s.begin() + index, s.begin() + index + (end - i))

      //move to the next word
      index = end + 1;
    }

    return s;

  }

}