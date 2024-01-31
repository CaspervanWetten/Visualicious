import csv

# Define the output file path
output_file_path = '/Volumes/Samsung USB/crimes.tsv'

# Initialize a flag to check if the header has been written to the output file
header_written = False

# Iterate through the file numbers from 0 to 15
for file_number in range(16):  # Assuming you have 16 files (0 to 15)
    input_file_path = f'/Volumes/Samsung USB/data/misdrijven_{file_number}.tsv'

    with open(input_file_path, 'r', newline='') as input_file, open(output_file_path, 'a', newline='') as output_file:
        # Create a CSV reader and writer
        reader = csv.DictReader(input_file, delimiter='\t')
        writer = csv.DictWriter(output_file, fieldnames=reader.fieldnames, delimiter='\t')

        # Write the header to the output file if it hasn't been written yet
        if not header_written:
            writer.writeheader()
            header_written = True

        # Iterate through the rows of the input file
        for row in reader:
            if row['WijkenEnBuurten'].startswith('GM') or row['WijkenEnBuurten'].startswith('NL'):
                # If the 'WijkenEnBuurten' column starts with 'GM', write the row to the output file
                writer.writerow(row)

    print("done" + str(file_number))

print(f"Filtered rows from all files saved to {output_file_path}")

