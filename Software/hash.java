public static boolean unique(String[] chars){
		if (chars == null){
			return false;
		}
		Hashtable table = new Hashtable();
		for (int i = 0; i < chars.length; i++) {
			if (table.containsValue(chars[i])) {
				return false;
			} 
			else {
				table.put(i, chars[i]);
			}
		} 
		return true;
	}





import java.util.*;
public class app {
    public static void main(String[] args) {
        HashSet<String> name = new HashSet<String>();
        name.add("Mark");
        name.add("tom");
        name.add("jack");
        name.add("july");
        name.add("patrik");
        Iterator<String> itr = name.iterator();
        while(itr.hasNext())
            System.out.println(itr.next());
    }
}




import java.util.*;
public class HashMap {
      private final static int TABLE_SIZE = 128;
 
      HashEntry[] table;
 
      HashMap() {
            table = new HashEntry[TABLE_SIZE];
            for (int i = 0; i < TABLE_SIZE; i++)
                  table[i] = null;
      }
 
      public int get(int key) {
            int hash = (key % TABLE_SIZE);
            while (table[hash] != null && table[hash].getKey() != key)
                  hash = (hash + 1) % TABLE_SIZE;
            if (table[hash] == null)
                  return -1;
            else
                  return table[hash].getValue();
      }
 
      public void put(int key, int value) {
            int hash = (key % TABLE_SIZE);
            while (table[hash] != null && table[hash].getKey() != key)
                  hash = (hash + 1) % TABLE_SIZE;
            table[hash] = new HashEntry(key, value);
      }
}

public class HashEntry {
      private int key;
      private int value;
 
      HashEntry(int key, int value) {
            this.key = key;
            this.value = value;
      }     
 
      public int getKey() {
            return key;
      }
 
      public int getValue() {
            return value;
      }
}
