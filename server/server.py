from flask import Flask
from flask_cors import CORS
from json import dumps

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World!'

""" Default English Layout """
@app.route('/public/english')
def fetch_english_layout():
    with open('public/layouts/english.json') as f:
        return f.read()

if __name__ == '__main__':
    app.run()