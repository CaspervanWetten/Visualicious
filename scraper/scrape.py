import requests
from bs4 import BeautifulSoup as bs4
 
# Mogelijke postcodes:
# 1000-9999


url = "https://www.politie.nl/mijn-buurt/misdaad-in-kaart/lijst?geoquery=3438&distance=5.0"

response = requests.get(url)

if response.status_code == 200:
    soup = bs4(response.text, 'html5lib')

print(soup)