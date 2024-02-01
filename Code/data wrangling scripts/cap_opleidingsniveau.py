import pandas as pd

# read = pd.read_excel("~/Downloads/opleidingsniveau-vier-provincies.xlsx", sheet_name=1, usecols=["Gemeente", "Bevolking", "Laag", "Middelbaar", "Hoog", "Gemeentecode"], keep_default_na=False)

# # read.drop(["Nederland", "Buurt", "Wijk", "Dekkingsgraad", "RSF_Laag", "LinkerGrensBI_Laag"], axis=1)
# read.dropna(subset=["Gemeente"], how="any", axis=0)

# read = read[read["Gemeente"] != ""]

# print(read.head(50))

# read.to_csv("Opleiding.csv")


read = pd.read_csv("scraper/opleidingsniveau.csv", sep=";", index_col="ID", usecols=["ID", "WijkenEnBuurten", "OpleidingsniveauLaag_64", "OpleidingsniveauMiddelbaar_65", "OpleidingsniveauHoog_66"])






read = read[~(read['WijkenEnBuurten'].str.startswith("WK") | read['WijkenEnBuurten'].str.startswith("BU"))]


for index, row in read.iterrows():
    total = int(row["OpleidingsniveauLaag_64"]) + int(row["OpleidingsniveauHoog_66"]) + int(row["OpleidingsniveauMiddelbaar_65"])
    laagP = round(int(row["OpleidingsniveauLaag_64"])/total * 100, 1)
    mediP = round(int(row["OpleidingsniveauHoog_66"])/total * 100, 1)
    hoogP = round(int(row["OpleidingsniveauMiddelbaar_65"])/total * 100, 1)
    read.at[index, "OpleidingsniveauLaag"] = laagP
    read.at[index, "OpleidingsniveauMiddelbaar"] = mediP
    read.at[index, "OpleidingsniveauHoog"] = hoogP

print(read.head(500))

read.to_csv("Opleiding Gemeentes - 2021.csv")