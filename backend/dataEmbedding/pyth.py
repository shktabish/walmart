import json

# Load the JSON file
file_path = 'D:/walmart/backend/src/dataEmbedding/grocery.json'
with open(file_path, 'r') as file:
    data = json.load(file)

# Function to convert values and remove objects that can't be converted
def convert_and_filter(data):
    cleaned_data = []
    for item in data:
        try:
            if 'no_of_ratings' in item:
                if isinstance(item['no_of_ratings'], int):
                    pass  # If already an integer, do nothing
                else:
                    item['no_of_ratings'] = int(item['no_of_ratings'].replace(',', ''))

            if 'discount_price' in item:
                if isinstance(item['discount_price'], (int, float)):
                    pass  # If already a float or int, do nothing
                else:
                    item['discount_price'] = float(item['discount_price'].replace('₹', '').replace(',', ''))

            if 'actual_price' in item:
                if isinstance(item['actual_price'], (int, float)):
                    pass  # If already a float or int, do nothing
                else:
                    item['actual_price'] = float(item['actual_price'].replace('₹', '').replace(',', ''))

            if 'ratings' in item:
                if isinstance(item['ratings'], (int, float)):
                    pass  # If already a float or int, do nothing
                else:
                    item['ratings'] = float(item['ratings'])

            # Append the cleaned item to cleaned_data
            cleaned_data.append(item)

        except ValueError as e:
            print(f"Skipping item due to ValueError: {e}, Item: {item}")
        except AttributeError as e:
            print(f"Skipping item due to AttributeError: {e}, Item: {item}")
    
    return cleaned_data

# Convert the values and filter the data
converted_data = convert_and_filter(data)

# Save the cleaned JSON back to a file
output_path = 'D:/walmart/backend/src/dataEmbedding/output.json'
with open(output_path, 'w') as file:
    json.dump(converted_data, file, indent=4)

print(f"Cleaned data saved to {output_path}")
