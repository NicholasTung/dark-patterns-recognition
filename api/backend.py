from flask import Flask, jsonify, request
from joblib import load

presence_classifier = load("presence_classifier.joblib")
presence_vect = load("presence_vectorizer.joblib")
category_classifier = load("category_classifier.joblib")
category_vect = load("category_vectorizer.joblib")

app = Flask(__name__)


@app.route('/')
def main():
    data = request.get_json().get('tokens')

    output = []

    for token in data:
        result = presence_classifier.predict(presence_vect.transform([token]))
        output.append(result)

    message = {'result': output}

    return jsonify(message)

if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True, debug=True)