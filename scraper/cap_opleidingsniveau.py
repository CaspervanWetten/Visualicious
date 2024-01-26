import pandas as pd

# read = pd.read_excel("~/Downloads/opleidingsniveau-vier-provincies.xlsx", sheet_name=1, usecols=["Gemeente", "Bevolking", "Laag", "Middelbaar", "Hoog", "Gemeentecode"], keep_default_na=False)

# # read.drop(["Nederland", "Buurt", "Wijk", "Dekkingsgraad", "RSF_Laag", "LinkerGrensBI_Laag"], axis=1)
# read.dropna(subset=["Gemeente"], how="any", axis=0)

# read = read[read["Gemeente"] != ""]

# print(read.head(50))

# read.to_csv("Opleiding.csv")


read = pd.read_csv("~/Downloads/85039NED_UntypedDataSet_26012024_124736.csv", sep=";", index_col="ID", usecols=["ID", "WijkenEnBuurten", "OpleidingsniveauLaag_64", "OpleidingsniveauMiddelbaar_65", "OpleidingsniveauHoog_66"])






read = read[~(read['WijkenEnBuurten'].str.startswith("WK") | read['WijkenEnBuurten'].str.startswith("BU"))]
print(read.head(20))