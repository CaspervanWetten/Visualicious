# import csv

# # Define the input and output file names
# input_file = '/Users/bjorn/Downloads/Visualicious/data/crimes.tsv'
# output_file = '/Users/bjorn/Downloads/Visualicious/data/crimes_theft.tsv'

# # List of crimes to keep
# keep_crimes = ["0.0.0", "1.1.1", "1.1.2", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.4.6", "1.4.7", "1.5.2", "2.5.1", "2.5.2"]

# with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
#     tsv_reader = csv.DictReader(infile, delimiter='\t')
#     fieldnames = tsv_reader.fieldnames
    
#     # Write the header to the output file
#     tsv_writer = csv.DictWriter(outfile, fieldnames=fieldnames, delimiter='\t')
#     tsv_writer.writeheader()
    
#     # Iterate over rows in the input file
#     for row in tsv_reader:
#         stripped_value = row['SoortMisdrijf'].strip()
#         if stripped_value in keep_crimes:
#             row['SoortMisdrijf'] = stripped_value
#             tsv_writer.writerow(row)

# print(f"Filtered data saved to {output_file}")

import pandas as pd

# Read the TSV file into a DataFrame
df = pd.read_csv('/Users/bjorn/Downloads/Visualicious/data/crimes_theft.tsv', sep='\t')

# Create a dictionary to store the sum of 'GeregistreerdeMisdrijven' for each unique combination of 'Perioden' and 'WijkenEnBuurten'
sum_dict = {}

# Iterate through the rows and calculate the sum
for index, row in df.iterrows():
    if row['SoortMisdrijf'] != '0.0.0':
        key = (row['Perioden'], row['WijkenEnBuurten'])
        if key in sum_dict:
            sum_dict[key] += row['GeregistreerdeMisdrijven']
        else:
            sum_dict[key] = row['GeregistreerdeMisdrijven']

# Update the 'GeregistreerdeMisdrijven' column for rows with 'SoortMisdrijf' equal to '0.0.0'
for index, row in df.iterrows():
    if row['SoortMisdrijf'] == '0.0.0':
        key = (row['Perioden'], row['WijkenEnBuurten'])
        if key in sum_dict:
            df.at[index, 'GeregistreerdeMisdrijven'] = sum_dict[key]

# Save the updated DataFrame back to a TSV file
df.to_csv('/Users/bjorn/Downloads/Visualicious/data/crimes_theft_updated.tsv', sep='\t', index=False)


