say she has $50

store 1: 20 notebooks for $24
store 2: 19 notebooks for $20
store 3: 1 notebook for $2

deals: 40 notebooks from store 1 (spent 48), then 1 from store 3 (spent $50): total = 41
       38 notebooks from store 2 (spent 40), then 5 from store 3 (spent $50): total = 43

values (notebook/$): [0.83333, 0.95, 0.5]
value ($/notebook):  [1.2, 1.05, 2]

sort this above array in order: [1.05, 1.2, 2]


import java.util.*;
public class HelloWorld{

     public static void main(String []args){
        System.out.println(budgetShopping(60, new int[]{20,19,1}, new int[]{24,20,3}));
     }
     static int budgetShopping(int n, int[] bundleQuantities, int[] bundleCosts) {
        int[] noteBooks = new int[bundleQuantities.length];
        int[] moneyLeft = new int[bundleQuantities.length];

        for (int i = 0; i < noteBooks.length; i++){
            int times = n / bundleCosts[i];
            noteBooks[i] = bundleQuantities[i] * times;
            moneyLeft[i] = n - (times * bundleCosts[i]);
        }
        for (int i = 0; i < noteBooks.length; i++){
            if (moneyLeft[i] != 0){
                int[] deals = deals(moneyLeft[i], bundleCosts);
                noteBooks[i] += deals[0];
                moneyLeft[i] -= deals[1];
            }
        }
        Arrays.sort(noteBooks);
        return noteBooks[noteBooks.length - 1];
    }
    public static int[] deals(int moneyLeft, int[] deals){
        int bestValue = 0;
        int index = 0;
        for (int i = 0; i < deals.length; i++){
            int value = moneyLeft/deals[i];
            if (value > bestValue){
                index = i;
                bestValue = value;
            }
        }
        moneyLeft = deals[index]*bestValue;
        return new int[]{bestValue, moneyLeft};
    }
}