import sqlite3
import csv

# Path to your SQLite database file and TSV file
db_path = '/Users/bjorn/Downloads/data/crimes.db'
tsv_path = '/Users/bjorn/Downloads/data/perioden.tsv'

# Step 1: Read the TSV file and create a Key-Title mapping
key_title_mapping = {}
with open(tsv_path, 'r') as file:
    tsv_reader = csv.DictReader(file, delimiter='\t')
    for row in tsv_reader:
        key_title_mapping[row['Key']] = row['Title']

# Step 2: Connect to the SQLite database and add a new column PeriodenRaw
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Add the new column (if it doesn't already exist)
cursor.execute('ALTER TABLE crimes ADD COLUMN PeriodenRaw TEXT')

# Step 3: Update the crimes table
# For each row in the database, set PeriodenRaw based on the mapping
processed_rows = 0
for key, title in key_title_mapping.items():
    update_query = """
    UPDATE crimes
    SET PeriodenRaw = ?
    WHERE Perioden = ?
    """
    cursor.execute(update_query, (title, key))
    processed_rows += cursor.rowcount
    print(f"Processed rows for key '{key}': {cursor.rowcount}")

print(f"Total rows updated: {processed_rows}")

# Commit the changes and close the connection
conn.commit()
conn.close()