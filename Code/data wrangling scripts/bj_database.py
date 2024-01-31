
import csv
import sqlite3
from tqdm import tqdm

# Base path and file pattern
base_file_path = '/Volumes/Samsung USB/data/misdrijven_'
file_count = 16  # Total number of files

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('/Users/bjorn/Documents/GitHub/Visualicious/crimes.db')
cursor = conn.cursor()

# Create a table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS crimes (
        ID INTEGER PRIMARY KEY,
        SoortMisdrijf TEXT,
        WijkenEnBuurten TEXT,
        Perioden TEXT,
        GeregistreerdeMisdrijven INTEGER
    )
''')

# Function to process each file
def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter='\t')
        next(reader)  # Skip header

        for row in tqdm(reader, desc=f"Inserting records from {file_path}"):
            cursor.execute('''
                INSERT INTO crimes (ID, SoortMisdrijf, WijkenEnBuurten, Perioden, GeregistreerdeMisdrijven)
                VALUES (?, ?, ?, ?, ?)
            ''', row)

    conn.commit()

# Process each file
for i in range(file_count):
    current_file = f"{base_file_path}{i}.tsv"
    process_file(current_file)

# Close the database connection
conn.close()
