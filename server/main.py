from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)

# Without CORS, browser will block frontend javacript from accessing
# the responses for cross-origin request
CORS(app)

@app.route('/', methods=['POST', 'GET'])
def hello():
    if request.method == 'POST':
        request_data = request.get_data()
        print(request_data)
    return "hello"



