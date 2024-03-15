import re
from mrjob.job import MRJob

class Input(MRJob):
    def mapper(self, _, line):
        stop_words = ['the', 'and', 'of', 'a', 'to', 'in', 'is', 'it']
        words = line.split()
        for word in words:
            word = re.sub('\W+','', word)
            word = word.lower()
            if not word in stop_words:
                yield word, 1

    def reducer(self, word, _):
        yield word, 1
    
    # def reducer(self, word, counts):
    #     yield word, sum(counts)

if __name__ == '__main__':
    Input.run()
# python unique_stop_words.py text.txt > unique_stop_words.txt
