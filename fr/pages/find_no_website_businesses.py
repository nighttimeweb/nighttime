from serpapi import GoogleSearch
import csv
import time

API_KEY = "a99dfdb118e1a6da34c2a94117968de62734115f924523d5a53f13893d0ea0f7"

keywords = [
    "business", "store", "service", "cleaning", "repair", "contractor",
    "plumber", "electrician", "moving", "junk removal", "kosher", "barber",
    "hair salon", "electronics", "auto", "furniture"
]

boroughs = {
    "Manhattan": "40.7831,-73.9712",
    "Brooklyn": "40.6782,-73.9442",
    "Queens": "40.7282,-73.7949",
    "Bronx": "40.8448,-73.8648",
    "Staten Island": "40.5795,-74.1502"
}

output_file = "no_websites_nyc.csv"

with open(output_file, mode="w", newline="", encoding="utf-8") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Business Name", "Phone Number", "Keyword", "Borough"])

    for borough, location in boroughs.items():
        for keyword in keywords:
            print(f"\n🔎 Searching: {keyword} in {borough}")
            params = {
                "engine": "google_maps",
                "q": keyword,
                "ll": f"@{location}",
                "type": "search",
                "api_key": API_KEY
            }

            try:
                search = GoogleSearch(params)
                results = search.get_dict()
                for business in results.get("local_results", []):
                    name = business.get("title")
                    phone = business.get("phone")
                    website = business.get("website")

                    if not website and phone:
                        print(f"NO WEBSITE — {name} | {phone}")
                        writer.writerow([name, phone, keyword, borough])
            except Exception as e:
                print(f"Error searching {keyword} in {borough}: {e}")

            time.sleep(2)
