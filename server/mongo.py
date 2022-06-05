import pymongo

client = pymongo.MongoClient("mongodb+srv://archer:<password>@freespeech.90yuq.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.test
