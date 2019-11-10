from flask import Flask, jsonify, request
from joblib import load
from sklearn.naive_bayes import BernoulliNB
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

count_vect = CountVectorizer()
presence_classifier = load("presence_classifier.joblib")
category_classifier = load("category_classifier.joblib")

print(presence_classifier.predict(count_vect.transform(["5 left in stock"])))