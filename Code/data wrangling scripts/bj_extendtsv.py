import csv

# Define paths to your filtered file, WijkenEnBuurten identifier mapping file,
# SoortMisdrijf identifier mapping file, and Perioden mapping file
filtered_file_path = '/Users/bjorn/Downloads/Visualicious/data/crimes.tsv'
wijken_en_buurten_mapping_path = '/Users/bjorn/Downloads/Visualicious/data/wijken.tsv'  # Replace with the actual path
soort_misdrijf_mapping_path = '/Users/bjorn/Downloads/Visualicious/data/soort.tsv'  # Replace with the actual path
perioden_mapping_path = '/Users/bjorn/Downloads/Visualicious/data/perioden.tsv'  # Replace with the actual path

# Create dictionaries to store the mappings
wijken_en_buurten_to_raw = {}
soort_misdrijf_to_raw = {}
perioden_to_raw = {}

# Read the WijkenEnBuurten identifier mapping file and store the mappings in the dictionary
with open(wijken_en_buurten_mapping_path, 'r', newline='') as wijken_en_buurten_mapping_file:
    mapping_reader = csv.DictReader(wijken_en_buurten_mapping_file, delimiter='\t')
    for row in mapping_reader:
        if row['Key'].startswith('GM') or row['Key'].startswith('NL'):
            wijken_en_buurten_to_raw[row['Key']] = row['Title']

# Read the SoortMisdrijf identifier mapping file and store the mappings in the dictionary
with open(soort_misdrijf_mapping_path, 'r', newline='') as soort_misdrijf_mapping_file:
    mapping_reader = csv.DictReader(soort_misdrijf_mapping_file, delimiter='\t')
    for row in mapping_reader:
        soort_misdrijf_to_raw[row['Key']] = row['Title']

# Read the Perioden mapping file and store the mappings in the dictionary
with open(perioden_mapping_path, 'r', newline='') as perioden_mapping_file:
    mapping_reader = csv.DictReader(perioden_mapping_file, delimiter='\t')
    for row in mapping_reader:
        perioden_to_raw[row['Key']] = row['Title']

# Create a new file with the additional 'WijkenEnBuurtenRaw', 'SoortMisdrijfRaw', and 'PeriodenRaw' columns
output_file_with_raw_path = '/Users/bjorn/Downloads/Visualicious/data/crimes_new.tsv'

with open(filtered_file_path, 'r', newline='') as input_file, \
     open(output_file_with_raw_path, 'w', newline='') as output_file:
    # Create CSV readers and writers for both files
    input_reader = csv.DictReader(input_file, delimiter='\t')
    output_fieldnames = input_reader.fieldnames + ['WijkenEnBuurtenRaw', 'SoortMisdrijfRaw', 'PeriodenRaw']
    output_writer = csv.DictWriter(output_file, fieldnames=output_fieldnames, delimiter='\t')
    output_writer.writeheader()

    # Iterate through the rows of the filtered file and add the 'WijkenEnBuurtenRaw', 'SoortMisdrijfRaw', and 'PeriodenRaw' columns
    for row in input_reader:
        wijken_en_buurten_identifier = row['WijkenEnBuurten']
        soort_misdrijf_identifier = row['SoortMisdrijf']
        perioden_identifier = row['Perioden']

        # Add the 'WijkenEnBuurtenRaw' column based on mapping
        wijken_en_buurten_raw_value = wijken_en_buurten_to_raw.get(wijken_en_buurten_identifier, '')
        row['WijkenEnBuurtenRaw'] = wijken_en_buurten_raw_value

        # Add the 'SoortMisdrijfRaw' column based on mapping
        soort_misdrijf_raw_value = soort_misdrijf_to_raw.get(soort_misdrijf_identifier, '')
        row['SoortMisdrijfRaw'] = soort_misdrijf_raw_value

        # Add the 'PeriodenRaw' column based on mapping
        perioden_raw_value = perioden_to_raw.get(perioden_identifier, '')
        row['PeriodenRaw'] = perioden_raw_value

        output_writer.writerow(row)

print(f"New file with 'WijkenEnBuurtenRaw', 'SoortMisdrijfRaw', and 'PeriodenRaw' columns saved to {output_file_with_raw_path}")
