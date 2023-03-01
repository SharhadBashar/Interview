import java.util.Scanner;

import java.io.PrintStream;

import java.util.Random;

public class MonteCarlo {

    public static void main(String[] args) throws Exception {

        Scanner keyboard = new Scanner(System.in);

        System.out.println("Please enter total number of dart throws");

        int nThrows = 1000000;

        double PI= calculatePi(nThrows);
        System.out.println(PI);

    }

    public static boolean insideCircle (double x, double y)
    {
        double range = Math.sqrt((x * x) + (y * y));

        return (range < 1.0);
    }

    public static double calculatePi(int nThrows)
    {

        int dartsInCircle = 0;
        double piEstimate;
        Random rGenerator = new Random();
        for (int i=0; i < nThrows; i++) {
          double x = randomNum(-1.0, 1.0);
          double y = randomNum(-1.0, 1.0);
          //double x = rGenerator.nextDouble()*Math.pow(-1, rGenerator.nextInt());
          //double y = rGenerator.nextDouble()*Math.pow(-1, rGenerator.nextInt());
          if (insideCircle(x,y))
          dartsInCircle++;
    } piEstimate=(4.0*((double)dartsInCircle/nThrows));
    return piEstimate;

    }
    public static double randomNum(double min, double max){
        return min + Math.random() * (max - min);
    }
}