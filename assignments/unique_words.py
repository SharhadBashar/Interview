import re
from mrjob.job import MRJob

class Input(MRJob):
    def mapper(self, _, line):
        words = line.split()
        for word in words:
            word = re.sub('\W+', '', word)
            word = word.lower()
            yield word, 1

    def reducer(self, word, _):
        yield word, 1

if __name__ == '__main__':
    Input.run()
# python unique_words.py text.txt > unique_words.txt
