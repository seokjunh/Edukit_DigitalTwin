from pymongo import MongoClient

client = MongoClient("mongodb+srv://seokjun:khElBqffRjsSifNv@seokjun.0v6yfhe.mongodb.net/?retryWrites=true&w=majority")

db = client['test']

def insert_data(payload):
    data = {
        "payload": payload
    }
    db.plc.insert_one(data)

def insert_number(num):
    data = {
        "DiceNumber": num
    }
    db.diceNums.insert_one(data)
