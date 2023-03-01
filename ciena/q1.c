//Sharhad Bashar
//Q1
//Excess water and number of crossings

#include <stdio.h>

//function
int checkLevel(const int levels[], const int numSamples, int threshold, unsigned int *numOfCrossings, unsigned int *excessWater){
	int i;
	unsigned int crossings = 0;//number of times water level crosses threshold
	unsigned int e_water = 0;//excess water
	for (i = 0; i < numSamples; i ++){ //for loop to check all the values 
	    if (levels[i] > threshold){ //checks how many times level is above threshold
	        crossings ++; //increases crossing if above threshold
	        e_water += (levels[i] - threshold); //measures the excess water 
	        //a check to make use that if water level is above threshold consecutively, to count the two crossings as one, rather than 2 
	        if (levels[i - 1] > threshold && i != 0){ 
	           crossings --; 
	        }
	    }	
	}
	//stores the address of the value 
	numOfCrossings = &crossings;
	excessWater = &e_water;
	//print statements to check 
	printf("Num of crossing %d\n", *numOfCrossings);
	printf("Excess %d\n", *excessWater);
	return 1;
}

// main
int main(void) {
	const int levels[] = {-1, 2, 5, 7, 3, 6, 1}; //array of the levels
	int threshold = 4; //threshold
	unsigned int crossings = 0; //number of times water level crosses threshold
	unsigned int e_water = 0; //excess water
	
	const int numSamples = sizeof(levels) / sizeof(int); //length of array could be initialized to a constant value or can be measured 
	//const int numSamples = 7;
	checkLevel(levels, numSamples, threshold, &crossings, &e_water); // calls the function 
	return 0;
}



