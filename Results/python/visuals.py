import json
import pandas as pd
import matplotlib.pyplot as plt
import os

# Load data from JSON file
with open('performance-metrics-custom.json', 'r') as f:
    data = json.load(f)

# Extract total transfer size for each iteration
for entry in data:
    total_transfer_size = sum(resource['transferSize'] for resource in entry['resources'])
    entry['totalTransferSize'] = total_transfer_size

# Create a DataFrame
df = pd.DataFrame(data)

# Calculate average transfer size and load time
avg_transfer_size = df['totalTransferSize'].mean()
avg_load_time = df['loadTime'].mean()

print(f'Average Transfer Size: {avg_transfer_size} B')
print(f'Average Load Time: {avg_load_time} ms')

# Create directory for plots if it doesn't exist
if not os.path.exists('./plotimages'):
    os.makedirs('./plotimages')

# Plot and save the transfer size results
plt.figure(figsize=(10, 6))
plt.plot(df['iteration'], df['totalTransferSize'], label='Transfer Size (B)')
plt.xlabel('Iteration')
plt.ylabel('Transfer Size (B)')
plt.title('Transfer Size Over 50 Iterations')
plt.legend()
plt.savefig('./plotimages/transfer_size_custom.png')
plt.close()

# Plot and save the load time results
plt.figure(figsize=(10, 6))
plt.plot(df['iteration'], df['loadTime'], label='Load Time (ms)')
plt.xlabel('Iteration')
plt.ylabel('Load Time (ms)')
plt.title('Load Time Over 50 Iterations')
plt.legend()
plt.savefig('./plotimages/load_time_custom.png')
plt.close()
