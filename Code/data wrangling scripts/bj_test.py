# import pandas as pd

# # Read the original TSV file
# df = pd.read_csv('/Users/bjorn/Downloads/Visualicious/data/crimes_theft.tsv', sep='\t')

# # Filter rows where WijkenEnBuurten equals NL00 and SoortMisdrijf equals 0.0.0
# filtered_df = df[df['WijkenEnBuurten'].str.contains('NL00') & df['SoortMisdrijf'].str.contains('0.0.0')]

# # Write the filtered data to a new TSV file
# filtered_df.to_csv('/Users/bjorn/Downloads/Visualicious/data/crimes_theft_temp.tsv', sep='\t', index=False)

import csv

# Initialize an empty dictionary
js_dict = {}

# Open and read the TSV file
with open("/Users/bjorn/Downloads/Visualicious/data/crimes_theft_temp.tsv", mode='r', encoding='utf-8') as tsv_file:
    tsv_reader = csv.DictReader(tsv_file, delimiter='\t')
    
    for row in tsv_reader:
        # Check if the 'WijkenEnBuurten' and 'SoortMisdrijf' columns contain the desired values
        if 'NL00' in row['WijkenEnBuurten'] and '0.0.0' in row['SoortMisdrijf']:
            # Use the 'Perioden' column as the key (timestamp) for the JavaScript dictionary
            timestamp = row['Perioden']
            
            # Create a sub-dictionary with relevant data
            sub_dict = {
                'SoortMisdrijf': row['SoortMisdrijf'],
                'WijkenEnBuurten': row['WijkenEnBuurten'],
                'GeregistreerdeMisdrijven': float(row['GeregistreerdeMisdrijven']),
                'WijkenEnBuurtenRaw': row['WijkenEnBuurtenRaw'],
                'SoortMisdrijfRaw': row['SoortMisdrijfRaw'],
                'PeriodenRaw': row['PeriodenRaw']
            }
            
            # Add the sub-dictionary to the main JavaScript dictionary
            js_dict[timestamp] = sub_dict

# Write the JavaScript dictionary to a .js file
with open("/Users/bjorn/Downloads/Visualicious/data/crimes_theft_temp.js", "w") as js_file:
    js_file.write("var data = " + str(js_dict) + ";")

print("JavaScript dictionary saved to output.js")
