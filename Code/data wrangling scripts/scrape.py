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

# df1 = pd.read_csv("scraper/archive/misdrijf1.csv", delimiter=";", na_values='NA')
# df2 = pd.read_csv("scraper/archive/misdrijf2.csv", delimiter=";", na_values='NA')
# df1.dropna(inplace=True)
# df2.dropna(inplace=True)
# df1["Wijken en buurten"] = df1["Wijken en buurten"].str.replace(",", "")
# df1["Geregistreerde misdrijven (aantal)"] = df1["Geregistreerde misdrijven (aantal)"].astype(int)
# df2["Wijken en buurten"] = df2["Wijken en buurten"].str.replace(",", "")
# df2["Geregistreerde misdrijven (aantal)"] = df2["Geregistreerde misdrijven (aantal)"].astype(int)


# combined = pd.concat([df1, df2], ignore_index=False, sort=True)
# combined.to_csv("scraper/dataset.csv",sep=",", index=False)


huizenprijzendf = pd.read_csv('scraper/huizenprijzen.csv')
huizenprijzendf['Periode'] = huizenprijzendf['Jaar'].astype(str) + ' ' + huizenprijzendf['Maand'].astype(str)
huizenprijzendf = huizenprijzendf.drop(['Jaar', 'Maand'], axis=1)
huizenprijzendf['Prijsindex ((2015=100))'] = huizenprijzendf['Prijsindex ((2015=100))'].round().astype(int)
huizenprijzendf.to_csv('huizenprijzenupdated.csv', index=False)


