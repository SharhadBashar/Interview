import re
from mrjob.job import MRJob

class Input(MRJob):
    def mapper(self, _, line):
        words = line.split()
        for i in range(len(words) - 1):
            word_1 = re.sub('\W+','', words[i])
            word_2 = re.sub('\W+','', words[i + 1])
            word_1 = word_1.lower()
            word_2 = word_2.lower()
            yield word_1 + ',' + word_2, 1

    def reducer(self, key, counts):
        yield key, sum(counts)

if __name__ == '__main__':
    Input.run()
# python bigram.py text_2.txt > bigram.txt
