//Sharhad Bashar
//Q3
//Find bugs

#include <stdio.h>
typedef struct {
    int* a;
    int* b;
    int* c;
} result_t;

void inc(result_t *t){
    int c;
    c = *(t->a) + *(t->b);
    t->c = &c;
}

int main(void){
    result_t t;
    int a = 5;
    int b = 10;
 
    t.a = &a;
    t.b = &b;
 
    inc(&t);
    printf("The incrmeneted value is %d\n", *t.c);
    return 0;
}

//no issue with this code. C should be a+b = 15, and after compiling this code and running it, t.c is 15.
