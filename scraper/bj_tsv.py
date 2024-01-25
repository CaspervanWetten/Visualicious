import csv

# Base path and file pattern for the source files
base_file_path = '/Volumes/Samsung USB/data/misdrijven_'
file_count = 16  # Total number of files

# Path for the merged output file
merged_file_path = '/Users/bjorn/Documents/GitHub/Visualicious/crimes.tsv'

# Open the output file for writing
with open(merged_file_path, 'w', newline='', encoding='utf-8') as merged_file:
    writer = csv.writer(merged_file, delimiter='\t')

    for i in range(file_count):
        current_file = f"{base_file_path}{i}.tsv"

        with open(current_file, 'r', encoding='utf-8') as infile:
            reader = csv.reader(infile, delimiter='\t')

            # Write header from the first file only
            if i == 0:
                headers = next(reader)
                writer.writerow(headers)
            else:
                next(reader)  # Skip header in other files

            # Write the rest of the data
            for row in reader:
                writer.writerow(row)

print("Merging complete.")
