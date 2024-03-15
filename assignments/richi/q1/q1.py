import pandas as pd
import matplotlib.pyplot as plt

def read_djia_data(csv_path):
    df = pd.read_csv(csv_path)
    df['Date'] = pd.to_datetime(df['Date'])
    df['Change'] = df['AdjustedClose'].pct_change()
    return df

def a():
	print('a) Create a line chart that shows the DJIA adjusted price over time.')
	djx_df.plot(x = 'Date', y = 'AdjustedClose', label = 'DJIA')
	plt.ylabel('Adjusted Closing Price')
	plt.title('DJIA Stock Price')
	plt.show()

def b():
	print('b) Create a line chart that shows the DJIA adjusted price as compared with your selected company\'s adjusted stock price. For this chart use dual axis.')
	ax = djx_df.plot(x = 'Date', y = 'AdjustedClose', 
                ylabel = 'DIJA Adjusted Closing Price', 
                label = 'DIJA')
	meta_df.plot(x = 'Date', y = 'AdjustedClose', 
	           ylabel = 'Meta Adjusted Closing Price', 
	           ax = ax, 
	           secondary_y = True,
	          label = 'Meta')
	plt.title('DJIA vs META Stock Price')
	plt.show()

def c():
	print('Compute the daily returns for the DJIA, and display these in a histogram.')
	djx_df['Change'].plot(kind = 'hist', bins = 30, edgecolor='black')
	plt.title('Histogram of DJIA Daily Returns')
	plt.xlabel('Daily Returns')
	plt.ylabel('Frequency')
	plt.show()

def d():
	print('d) Create a scatter chart showing the relationship of the DJIA daily return to the daily returns of your selected company.')
	x, y = djx_df['Change'], meta_df['Change']
	# x, y = djx_df['Return'], meta_df['Return']
	plt.scatter(x, y, color = '#88c999', edgecolors = 'black')
	plt.title('Scatter Chart of DJIA vs META Daily Returns')
	plt.xlabel('DIJA')
	plt.ylabel('Meta')
	plt.show()

if __name__ == '__main__':
	djx_df = read_djia_data('DJX.csv')
	meta_df = read_djia_data('Meta.csv')
	a()
	b()
	c()
	d()
