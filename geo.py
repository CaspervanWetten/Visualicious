# import geopandas as gpd
# from shapely.geometry import shape

# def transfer_properties(outline_file, municipalities_file, output_file):
#     # Load the GeoJSON files into GeoDataFrames
#     gdf_outline = gpd.read_file(outline_file)
#     gdf_municipalities = gpd.read_file(municipalities_file)

#     # Iterate over each polygon in municipalities
#     for index_municipality, municipality_row in gdf_municipalities.iterrows():
#         polygon_municipality = shape(municipality_row['geometry'])

#         # Check if this polygon lies within any polygon in outline
#         for index_outline, outline_row in gdf_outline.iterrows():
#             polygon_outline = shape(outline_row['geometry'])
#             if polygon_municipality.intersects(polygon_outline):
#                 # Transfer properties from outline to municipality
#                 gdf_municipalities.at[index_municipality, 'name'] = dict(outline_row)['name']
#                 break

#     # Save the modified municipalities to a new GeoJSON file
#     gdf_municipalities.to_file(output_file, driver='GeoJSON')

# # Example usage
# transfer_properties('/Users/bjorn/Documents/GitHub/Visualicious/outline.geojson', '/Users/bjorn/Documents/GitHub/Visualicious/municipalities.geojson', '/Users/bjorn/Documents/GitHub/Visualicious/new_municipalities.geojson')

import geopandas as gpd
from shapely.geometry import shape

def transfer_properties(outline_file, municipalities_file, output_file):
    # Load the GeoJSON files into GeoDataFrames
    gdf_outline = gpd.read_file(outline_file)
    gdf_municipalities = gpd.read_file(municipalities_file)

    # Iterate over each polygon in municipalities
    for index_municipality, municipality_row in gdf_municipalities.iterrows():
        polygon_municipality = shape(municipality_row['geometry'])

        # Initialize variables to find the closest outline polygon
        min_distance = float('inf')
        closest_properties = None

        # Check distance to each polygon in outline
        for outline_row in gdf_outline.iterrows():
            polygon_outline = shape(outline_row[1]['geometry'])
            distance = polygon_municipality.distance(polygon_outline)
            if distance < min_distance:
                min_distance = distance
                closest_properties = outline_row[1]

        # Transfer properties from the closest outline polygon
        gdf_municipalities.at[index_municipality, 'name'] = dict(closest_properties)['name']

    # Save the modified municipalities to a new GeoJSON file
    gdf_municipalities.to_file(output_file, driver='GeoJSON')

# Example usage
transfer_properties('/Users/bjorn/Documents/GitHub/Visualicious/outline.geojson', '/Users/bjorn/Documents/GitHub/Visualicious/municipalities.geojson', '/Users/bjorn/Documents/GitHub/Visualicious/new_municipalities.geojson')
