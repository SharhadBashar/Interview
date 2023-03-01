package com.company;
import java.util.*;
public class longestNonRepeatSubstring {
    public void start(){
        String word="dvdfvdfg";
        //bruteForce(word);
        int count=slidingWindow(word);
        System.out.println(count);
    }
    public int bruteForce(String word){
        System.out.println(word);
        int maxCount=0;
        for(int i=0;i<word.length();i++){
            for(int j=i;j<=word.length();j++){
                if(checkIfUnique(word,i,j)){
                    if(maxCount<(j-i)){
                        maxCount=j-i;
                    }
                }
            }
        }
        return maxCount;
    }
    private boolean checkIfUnique(String word,int start,int end){
        //System.out.println(word);
        Set<Character> hash_set=new HashSet<Character>();

        for(int i=start;i<end;i++){
            if(hash_set.contains(word.charAt(i))){
                return false;
            }else{
                hash_set.add(word.charAt(i));
            }
        }
        return true;
    }
    public int slidingWindow(String word){
        System.out.println(word);
        int maxCount=0;
        Set<Character> hash_set=new HashSet<Character>();
        int i=0,j=0,n=word.length();
        while(i<n && j<n){
            if(!hash_set.contains(word.charAt(j))){
                hash_set.add(word.charAt(j++));
                if(maxCount<j-i){
                    maxCount=j-i;
                }
            }else{
                hash_set.remove(word.charAt(i++));
            }
        }
        return  maxCount;
    }
}
