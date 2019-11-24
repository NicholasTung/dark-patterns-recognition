import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
from joblib import dump

selected_classification = "Pattern Category"

df = pd.read_csv('dark_patterns.csv')

df = df[pd.notnull(df["Pattern String"])]
col = ["Pattern String", selected_classification]
df = df[col]

df["category_id"] = df[selected_classification].factorize()[0]
category_id_df = df[[selected_classification, 'category_id']
                    ].drop_duplicates().sort_values('category_id')
category_to_id = dict(category_id_df.values)
id_to_category = dict(
    category_id_df[['category_id', selected_classification]].values)

tfidf = TfidfVectorizer(sublinear_tf=True, min_df=5, norm='l2',
                        encoding='latin-1', ngram_range=(1, 2), stop_words='english')

features = tfidf.fit_transform(df["Pattern String"]).toarray()
labels = df.category_id

X_train, X_test, y_train, y_test = train_test_split(
    df['Pattern String'], df[selected_classification], train_size=.3)
count_vect = CountVectorizer()
X_train_counts = count_vect.fit_transform(X_train)
tfidf_transformer = TfidfTransformer()
X_train_tfidf = tfidf_transformer.fit_transform(X_train_counts)

clf = MultinomialNB().fit(X_train_tfidf, y_train)

y_pred = clf.predict(count_vect.transform(X_test))

print("Accuracy:", metrics.accuracy_score(y_pred, y_test))

dump(clf, 'category_classifier.joblib')
dump(count_vect, 'category_vectorizer.joblib')
