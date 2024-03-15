import re
from mrjob.job import MRJob

class Input(MRJob):
    def mapper(self, _, line):
        document, words = line.split(':')
        words = words.split()
        for word in words:
            word = re.sub('\W+','', word)
            word = word.lower()
            yield word, document

    def reducer(self, word, documents):
        yield word, ', '.join(documents)

if __name__ == '__main__':
    Input.run()
# python invert_index.py text_3.txt > invert_index.txt
