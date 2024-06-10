import json
import pandas as pd
import matplotlib.pyplot as plt
import os

# Load data from JSON file
with open('performance-metrics.json', 'r') as f:
    data = json.load(f)

# Print the structure of the JSON data
print(json.dumps(data, indent=2))

# Create a DataFrame
df = pd.DataFrame(data)

# Print the DataFrame to inspect its columns
print(df.head())
