import pymongo

client = pymongo.MongoClient(, server_api=ServerApi('1'))
db = client.test
