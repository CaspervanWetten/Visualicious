import csv

# Initialize an empty dictionary
result_dict = {}

# Open and read the TSV file
with open('/Users/bjorn/Downloads/Visualicious/data/wijken.tsv', 'r', encoding='utf-8', newline='') as tsvfile:
    tsvreader = csv.DictReader(tsvfile, delimiter='\t')
    
    # Iterate through the rows in the TSV file
    for row in tsvreader:
        key = row['Key']
        title = row['Title']
        
        # Check if the Key starts with "GM" or "NL" and Title is not empty
        if (key.startswith('GM') or key.startswith('NL')) and title:
            # Add to the dictionary
            result_dict[key] = title

# Create a JavaScript file and write the dictionary to it
with open('/Users/bjorn/Downloads/Visualicious/data/wijken.js', 'w') as jsfile:
    jsfile.write('const data = ' + str(result_dict) + ';')

print("JavaScript file 'output.js' created successfully.")

