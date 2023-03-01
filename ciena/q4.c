//Sharhad Bashar
//Q4
//Function that will parse and enumerate each word and return a count of each word in a singly linked list

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>

typedef struct wordCount
{
    char *word;
    unsigned int count;
    struct wordCount *ptr;
} wordCount_t;



char *lowerCaseWord(char *s)
{
    int i = 0;
    char    *str = strdup(s);

    while (str[i])
    {
        if (str[i] >= 65 && str[i] <= 90)
            str[i] += 32;
        i++;
    }
    return (str);
}


// Function that will parse and enumerate each word and return a count of each word in //a singly linked list

wordCount_t *countstrings ( char *input ) {

	wordCount_t *head, *temp, *var, *tail;

	head = NULL;

	// parse the input string
	int i, j;

	//Remove all delimiters
	for(i = 0; input[i] != '\0'; ++i)
	    {
	        while (!( (input[i] >= 'a' && input[i] <= 'z') || (input[i] >= 'A' && input[i] <= 'Z') || (input[i] == ' ') || input[i] == '\0') )
	        {
	            for(j = i; input[j] != '\0'; ++j)
	            {
	                input[j] = input[j+1];
	            }
	            input[j] = '\0';
	        }
	    }


	const char s[2] = " ";
	char *token;

	token = strtok(input, s);
	wordCount_t wc_t = {token, 1, NULL};
	head = &wc_t;
	tail = head;
	token = strtok(NULL, s);
	while(token != NULL)
	{

		//printf("%s \n",  token);
		int isTokenThere = 0;
		temp = head;

		while (temp != NULL)
		{
			//printf("%s : %s \n",  token, temp->word);
			if(!strcmp(lowerCaseWord(temp->word), lowerCaseWord(token)))
			{
				//printf("%s : %s \n",  token, temp->word);
				temp->count++;
				isTokenThere = 1;
				break;
			}

			temp = temp->ptr;
		}

		//printf("%d \n",  isTokenThere);
		if(isTokenThere ==0)
		{
			//wordCount_t wc_t = {token, 1, NULL};
			tail->ptr = malloc(sizeof(wordCount_t));
			tail = tail->ptr;
			tail->word = token;
			tail->count = 1;
			tail->ptr = NULL;
			//printf("%s \n",  tail->word);
		}
		else
		{
			//printf("%s TOKEN HERE! \n", token);
		}
		token = strtok(NULL, s);

	}


	return head;
}

int printList(wordCount_t *traverse) {
    if (traverse->ptr == NULL) {
    	printf( " HERE!!!!");
        return -1;
    }
    printf( "%s : %d", traverse->word, traverse->count);
    printList(traverse->ptr);
    return 0;
}

int main (void){
	char input[] = "Ciena corporation is a global supplier of telecommunications networking equipment software and services that support the delivery and transport of voice video and data service. With nearly 25 years of industry leadership we support more than 1300 of the world’s largest most reliable networks.  As a follow-up, please contact us to discuss Ciena’s strengths!";
	wordCount_t *temp;
	wordCount_t *head = countstrings (input);
	temp = head;
	while (temp != NULL)
	{
		printf( "%s : %d \n", temp->word, temp->count);
		temp = temp->ptr;
	}

	return 0;
}