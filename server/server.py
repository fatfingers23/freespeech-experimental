from flask import Flask
from flask import request
from flask_cors import CORS
from json import dumps, loads

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


""" Change Route"""


@app.route('/change', methods=['POST'])
def change():
    blob = request.get_json()
    if blob['type'] == "settings":
        with open('public/layouts/della-example.json', 'r') as f:
            della_data = loads(f.read())
            
        with open('public/layouts/della-example.json', 'w+') as f:
            della_data['settings']['font-size'] = blob['fontSize']
            della_data['settings']['icon-size'] = blob['iconSize']
            della_data['settings']['tile-width'] = blob['tileWidth']
            f.write(dumps(della_data))
            
    if blob['type'] == "tile":
        with open('public/layouts/della-example.json', 'r') as f:
            della_data = loads(f.read())
        
        with open('public/layouts/della-example.json', 'w+') as f:
            della_data['layouts'][della_data['selected-layout']][blob['page']][blob['index']]['text'] = blob['text']
            f.write(dumps(della_data))
            
    return 'ok'


@app.route('/user/<username>/data', methods=['GET'])
def getUserData(username):
    with open('public/layouts/della-example.json') as f:
        della_data = loads(f.read())

    return dumps(della_data)


if __name__ == '__main__':
    app.run()
