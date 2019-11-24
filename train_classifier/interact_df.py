import pandas as pd

selected_classification = "Pattern Category"

df = pd.read_csv('dark_patterns.csv')

df = df[pd.notnull(df["Pattern String"])]
col = ["Pattern String", selected_classification]
df = df[col]

print(df[selected_classification].value_counts())