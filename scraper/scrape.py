import requests
import pandas as pd
from bs4 import BeautifulSoup as bs4
 
# Mogelijke postcodes:
# 1000-9999


# url = "https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=3438&distance=5.0"

# response = requests.get(url)

# if response.status_code == 200:
#     soup = bs4(response.text, 'html5lib')

# # Extract data from the table
# data = [[col.text.strip() for col in row.find_all('td')] for row in soup.find_all('tr')[1:]]
# df = pd.DataFrame.from_records(data, columns=['postcode', 'datum', 'soort'])

# # Display the DataFrame
# print(df)

# df1 = pd.read_csv("scraper/misdrijf1.csv", delimiter=";")
# df2 = pd.read_csv("scraper/misdrijf2.csv", delimiter=";")

# print(df1.head())
# print(df2.head())


# combined = pd.concat([df1, df2], ignore_index=False, sort=True)

# print(combined.head())

# combined.to_csv("dataset.csv",sep=";", index=False)