import requests

url = "https://overpass-api.de/api/interpreter"  

response = requests.get(url)  

if response.status_code == 200:
    print("Success:", response.json())  
else:
    print(f"Error {response.status_code}: {response.text}")

