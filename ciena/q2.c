//Sharhad Bashar
//Q2
//Find bugs

#include <stdio.h>
#include <string.h>
typedef enum{
    ID_1,
    ID_2,
    ID_3,
} ciena_id_t;

void parseInput(int argc, char *argv[], ciena_id_t *output){
    /*Convert the number 1 to ciena ID_1,
      Convert the number 2 to ciena ID_2,
      For all other values, convert to ID 3*/

    if (strcmp(argv[1], "1") == 0){ //if (argv[1] == "1") because == is comparing the address instead of the string value
        *output = ID_1;
    }
    else if (strcmp(argv[1], "2") == 0){ //changed from else if (argv[1] == "2") for the same reason as above
        *output = ID_2;
    }
    else{
        *output = ID_3;
    }
}

int main(int argc, char *argv[]){
    ciena_id_t i;
    /*Convert the user input to the ciena id value*/

    if (argc < 2){
        printf("Not enough arguments");
    }

    parseInput(argc, argv, &i);
   
    if (i == ID_1 || ID_2){ //issue here, regardless of the input, this statement will always be printed, because argc always has the value of 2
        printf("ID is ID_1 or ID_2\n"); 
    }
    else{
        printf("ID is something else\n");
    }
    return 0;
}

//issued are outlined above