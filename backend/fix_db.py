from pymongo import MongoClient

# Database connectivity
client = MongoClient('mongodb://localhost:27017/')
db = client['pharmacy']
medicines = db['medicines']

# Default images
default_image = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"

# Find medicines with null or empty images
empty_meds = medicines.find({"$or": [{"image": None}, {"image": ""}]})

for med in empty_meds:
    medicines.update_one({"_id": med["_id"]}, {"$set": {"image": default_image}})
    print(f"Updated {med.get('name')} with default image.")

# Fix bad spelling
medicines.update_many({"name": "parcentmal"}, {"$set": {"name": "Paracetamol 500mg"}})
medicines.update_many({"name": "Test Med"}, {"$set": {"name": "Test Medicine 100mg"}})

print("Done updating DB content.")
