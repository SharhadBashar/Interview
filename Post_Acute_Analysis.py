# Post Acute Analysis

# 1. Get the titles count from requests:

# Ans
def getNumOfMovies(substr):
	r = requests.get('link={}'.format(substr))
	return r.json()['total']

# 2. Get values from a df
'''
 DF contains school id, state_code, subjects
 school id is unique to school
 state code has non alpha numeric values in it
 subjects is a string of subjects, seperated by ' '

 1. remove all schools that have less than 3 subjects
 2. remove all non alphanumeric sstate code
 3. get count of the number of schools offering english, maths, physics, chemistry in each state
'''

# Ans

def clean_df(df):
	df['state_code'] = df['state_code'].str.replace('[^0-9a-zA-Z]', '')
	df = df[df['subjects'].apply(lambda x: len(x.split(' ')) >= 3)]
	df = df.groupby('state_code').agg(lambda x: ''.join(x)).reset_index()
	df = pd.concat([df, df.pop('subjects').str.split(' ', expand = True).stack().str.get_dummies().sum(level = 0)], 1)
	return df[['state_code', 'english', 'maths', 'physics', 'chemistry']]
