import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def clean_data(csv_path, skiprows = 5, usecols = [0, 1, 2, 3, 5]):
	df = pd.read_csv(csv_path, skiprows = skiprows, usecols = usecols)
	df = df.dropna(subset=['Description']).reset_index(drop = True)
	return df

def sales_data(df_div_a, df_div_b, years = ['Act2019', 'Act2020', 'Proj2021']):
	return pd.DataFrame(
		{
			'Division A': df_div_a[df_div_a['Description'] == 'Sales Revenue'][years].values.flatten(),
			'Division B': df_div_b[df_div_b['Description'] == 'Sales Revenue'][years].values.flatten()
		},
        index = years
	)

def expenses_data(df_div_a, df_div_b, year = 'Proj2021', expenses = ['SGA', 'ADV', 'DEP', 'RENT', 'OTHX']):
	return pd.DataFrame(
		{
			'Division A': df_div_a[df_div_a['CODE'].isin(expenses)][year].values.flatten(),
			'Division B': df_div_b[df_div_b['CODE'].isin(expenses)][year].values.flatten()
		},
		index = expenses
	)

def b():
	print('b) A stacked bar chart of historical and projected sales over time that includes both divisions sales. The X-axis must be the year.')
	df_sales.plot.bar(stacked = True, color = ['blue', 'green'])
	plt.title('Historical and Projected Division Sales over time')
	plt.xlabel('Year')
	plt.ylabel('Sales Revenue')
	plt.show()

def c():
	print('c) A clustered bar chart of historical and projected sales over time that includes both divisions sales. The X-axis must be the year.')
	df_sales.plot.bar(color = ['blue', 'green'])
	plt.title('Division Sales over time')
	plt.xlabel('Year')
	plt.ylabel('Sales Revenue')
	plt.show()

def d():
	print('d) Two seperate pie charts, one for each division, showing the different kinds of expenses forecasted for 2021.')
	df_expenses.plot(kind = 'pie', 
                 subplots = True, 
                 figsize = (16, 8), 
                 title = 'Forecasted 2021 Expenses of each divion',
                 autopct = '%1.1f%%'
                )
	plt.show()

if __name__ == '__main__':
	df_div_a = clean_data('diva-incstmt.csv')
	df_div_b = clean_data('divb-incstmt.csv')

	df_div_a_disp = df_div_a.style.set_caption('Division A')
	print('Division A')
	print(df_div_a_disp.to_string())
	print()
	print('Division B')
	df_div_b_disp = df_div_b.style.set_caption('Division B')
	print(df_div_b_disp.to_string())

	df_sales = sales_data(df_div_a, df_div_b)
	df_expenses = expenses_data(df_div_a, df_div_b)
	print('Data Cleaned')
	b()
	c()
	d()
