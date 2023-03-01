package com.company;

public class longestPalidrome {
    public void start(){
//        String word="forgeeksskeegfor";
        String word="abaabc";
        //String longest=bruteForce(word);
        //System.out.println(longest);
        System.out.println(dynamicApproach(word));
    }
    public String bruteForce(String word){
        String longestWord="";
        for(int i=0;i<word.length();i++){
            for(int j=i;j<word.length();j++){
                if(checkIfPalidrome(word,i,j)){
                    if(longestWord.length()<=j-i){
                        //System.out.println("updating...");
                        longestWord=word.substring(i,j+1);
                    }
                }
            }
        }

        return longestWord;
    }
    public boolean checkIfPalidrome(String word, int start,int end){
        //System.out.printf("s:%d,e:%d\n",start,end);
        while(start<=end){
            if(word.charAt(start)==word.charAt(end)){
                //System.out.println("hello");
                start++;
                end--;
            }else{
                return false;
            }
        }
        return true;
    }
    public void printTable(boolean [][]table){
        char yo;
        System.out.printf("Table\n");
        for(int i=0;i<table.length;i++){
            for(int j=0;j<table[0].length;j++){
                if(table[i][j]){
                    yo='T';
                }else{
                    yo='F';
                }
                System.out.printf("%c,",yo);
            }
            System.out.println();
        }
    }
    public String dynamicApproach(String word){
        String longestWord="";
        int n=word.length();
        boolean [][] table=new boolean[n][n];
        printTable(table);
        for(int i=0;i<n;i++){
            table[i][i]=true;
        }
        longestWord=word.substring(0,1);
        printTable(table);
        for(int i=0;i<n-1;i++){
            if(word.charAt(i)==word.charAt(i+1)){
                table[i][i+1]=true;

                    longestWord=word.substring(i,i+2);

            }
        }
        printTable(table);
        int j;
        for(int k=2;k<n-2;k++){
            for(int i=0;i<n-k;i++){
                j=i+k;
                if(word.charAt(i)==word.charAt(j) && table[i+1][j-1]==true){
                    if(word.substring(i,j+1).length()>longestWord.length()){
                        longestWord=word.substring(i,j+1);
                    }
                    table[i][j]=true;
                }
            }
        }
        printTable(table);

        return longestWord;
    }
}
