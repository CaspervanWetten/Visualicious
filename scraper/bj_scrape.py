import pandas as pd
import requests
import itertools
import threading
import time
import sys
import os
import concurrent.futures

def get_odata(target_url):
    data_frames = []  # List to store individual data frames
    try:
        while target_url:
            r = requests.get(target_url).json()
            data_frames.append(pd.DataFrame(r['value']))  # Add new data frame to list

            if '@odata.nextLink' in r:
                target_url = r['@odata.nextLink']
            else:
                target_url = None
    finally:
        pass

    data = pd.concat(data_frames, ignore_index=True)  # Concatenate all data frames
    return data


def process_key(key):
    target_url = table_url + "/TypedDataSet" + "?$filter=substringof(%27" + str(key) + "%27,WijkenEnBuurten)"
    data = get_odata(target_url)
    return key, data  # Return a tuple of the key and data

def save_data(key, data, file_info):
    base_path = '/Volumes/Samsung USB/data/'
    base_filename = 'misdrijven'
    max_records = 10000000  # 10 million records

    current_file, current_count = file_info
    print(current_count)

    # Check if current file exceeds the limit
    if current_count + len(data) > max_records:
        # Parse the current file number and increment it
        current_file_number = int(current_file.split('_')[-1].split('.')[0])
        new_file_number = current_file_number + 1

        # Create a new file with the incremented number
        current_file = base_path + f"{base_filename}_{new_file_number}.tsv"
        current_count = 0  # Reset record count

    # Write data to the current file
    if not os.path.isfile(current_file):
        data.to_csv(current_file, sep='\t', index=False, mode='w')
    else:
        data.to_csv(current_file, sep='\t', index=False, mode='a', header=False)

    # Update the count and return the updated file info
    return current_file, current_count + len(data)


# Read the TSV file into a DataFrame
keys_df = pd.read_csv('/Volumes/Samsung USB/data/wijken.tsv', sep='\t')

table_url = "https://dataderden.cbs.nl/ODataApi/odata/47022NED"

# Initialize file info (filename, record count)
file_info = ('/Volumes/Samsung USB/data/misdrijven_0.tsv', 0)

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(process_key, key) for key in keys_df['Key']]
    for future in concurrent.futures.as_completed(futures):
        try:
            key, data = future.result()
            file_info = save_data(key, data, file_info)
        except Exception as e:
            print(f"Error processing key {key}: {e}")









# def save_data(key, data):
#     output_file = '/Volumes/Samsung USB/data/misdrijven.tsv'
#     # If the file does not exist, write header 
#     if not os.path.isfile(output_file):
#         data.to_csv(output_file, sep='\t', index=False, mode='w')
#     else: # else it exists so append without writing the header
#         data.to_csv(output_file, sep='\t', index=False, mode='a', header=False)
#     print(f"Data for Key {key} saved to {output_file}")

# # Read the TSV file into a DataFrame
# keys_df = pd.read_csv('/Volumes/Samsung USB/data/wijken.tsv', sep='\t')

# table_url = "https://dataderden.cbs.nl/ODataApi/odata/47022NED"

# with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
#     # Submit tasks
#     futures = [executor.submit(process_key, key) for key in keys_df['Key']]

#     # Process completed tasks
#     for future in concurrent.futures.as_completed(futures):
#         try:
#             key, data = future.result()  # Unpack the key and data from the result
#             save_data(key, data)
#         except Exception as e:
#             print(f"Error processing key {e}")

# # # Read the TSV file into a DataFrame
# # keys_df = pd.read_csv('/Volumes/Samsung USB/data/wijken.tsv', sep='\t')

# table_url = "https://dataderden.cbs.nl/ODataApi/odata/47022NED"

# # Iterate over each Key
# for key in keys_df['Key']:
#     target_url = table_url + "/TypedDataSet" + "?$filter=substringof(%27" + str(key) + "%27,WijkenEnBuurten)"
#     data = get_odata(target_url)

#     # Append the data to the misdrijven.tsv file
#     output_file = '/Volumes/Samsung USB/data/misdrijven.tsv'
#     # If the file does not exist, write header 
#     if not os.path.isfile(output_file):
#         data.to_csv(output_file, sep='\t', index=False, mode='w')
#     else: # else it exists so append without writing the header
#         data.to_csv(output_file, sep='\t', index=False, mode='a', header=False)

#     print(f"Data for Key {key} saved to {output_file}")




# table_url = "https://dataderden.cbs.nl/ODataApi/odata/47022NED"
# # target_url = table_url + "/Perioden"
# # target_url = table_url + "/WijkenEnBuurten"
# # target_url = table_url + "/SoortMisdrijf"
# target_url = table_url + "/TypedDataSet" + "?$filter=substringof(%27NL00%27,WijkenEnBuurten)"

# data = get_odata(target_url)

# # Save the DataFrame to a TSV file
# output_file = '/Users/bjorn/Documents/GitHub/Visualicious/data/misdrijven.tsv'
# data.to_csv(output_file, sep='\t', index=False)
# print(f"Data saved to {output_file}")
