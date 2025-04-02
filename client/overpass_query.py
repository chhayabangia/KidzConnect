import requests
import json


overpass_url = "https://overpass-api.de/api/interpreter"


query = """
[out:json];
node["amenity"="childcare"](40.5,-74.2,40.9,-73.7);
out;
"""


response = requests.get(overpass_url, params={"data": query})


if response.status_code == 200:
    data = response.json()
    
   
    for daycare in data["elements"][:5]:
        name = daycare["tags"].get("name", "Unnamed Daycare")
        lat, lon = daycare["lat"], daycare["lon"]
        print(f"{name} - Location: ({lat}, {lon})")

else:
    print("Error:", response.status_code, response.text)
