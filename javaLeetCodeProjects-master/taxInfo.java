package com.company;

public class taxInfo {
    public double rate;
    public double predisposedIncome;
    public double upperBound;
    public taxInfo(double upperBound,double rate,double predisposedIncome){
        this.upperBound=upperBound;
        this.rate=rate;
        this.predisposedIncome=predisposedIncome;
    }
}
