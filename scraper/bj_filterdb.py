import sqlite3
import pandas as pd

# Connect to the SQLite database
db_file = '/Users/bjorn/Downloads/Visualicious/data/crimes_copy.db'  # Replace with your SQLite database file path
conn = sqlite3.connect(db_file)

# Define the SQL query to select rows starting with "GM"
query = "SELECT * FROM 'crimes' WHERE 'WijkenEnBuurten' LIKE 'GM%'"

# Set a reasonable chunk size to fit in memory (e.g., 100,000)
chunk_size = 100000

# Create an empty DataFrame to store filtered data
filtered_data = pd.DataFrame()

# Iterate through chunks and filter rows
for chunk in pd.read_sql_query(query, conn, chunksize=chunk_size):
    filtered_chunk = chunk[chunk['WijkenEnBuurten'].str.startswith('GM')]
    filtered_data = pd.concat([filtered_data, filtered_chunk])
    print("done")

# Close the SQLite connection
conn.close()

# Connect again to the SQLite database
conn = sqlite3.connect(db_file)

# Drop the original "crimes" table
conn.execute('DROP TABLE crimes')

# Write the filtered data back to the database
filtered_data.to_sql('crimes', conn, if_exists='replace', index=False)

# Close the SQLite connection
conn.close()

print("Filtered data has been written to the 'crimes' table in the SQLite database.")

