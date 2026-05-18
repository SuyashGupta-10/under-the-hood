import pandas as pd
import json
import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

data_sample = []
target_size = 500

# Better Regex pattern for Samsung watches
pattern = re.compile(r'(samsung\s+(?:galaxy\s+|smart\s+|active\s+)?watch|galaxy\s+(?:smart\s+|active\s+)?watch|samsung\s+gear)', re.IGNORECASE)

print("Streaming dataset and extracting Samsung Watch reviews...")
with open('Electronics.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if len(data_sample) >= target_size:
            break
        
        # Quick string check before json parsing for speed
        if 'samsung' in line.lower() and ('watch' in line.lower() or 'gear' in line.lower()) and 'tv' not in line.lower() and 'television' not in line.lower():
            record = json.loads(line)
            title = record.get('title', '')
            text = record.get('text', '')
            full_text = f"{title}. {text}"
            
            if pattern.search(full_text):
                data_sample.append(record)

df = pd.DataFrame(data_sample)
df['full_text'] = df['title'].fillna('') + ". " + df['text'].fillna('')
print(f"Extracted {len(df)} reviews")

# let's find negative ones simply by rating for the test
complaints = df[df['rating'] <= 3.0]['full_text']
print(f"Analyzing {len(complaints)} negative reviews")

custom_stop_words = list(ENGLISH_STOP_WORDS) + ['samsung', 'galaxy', 'watch', 'gear', 'smart', 'smartwatch', 'just', 'like', 'bought', 'got', 'did', 'does', 'use', 'really', 've', 'don', 'didn', 'doesn', 'time', 'day', 'days', 'months', 'weeks', 'new', 'used', 'buy', 'work', 'working', 'worked', 'good', 'great', 'love', 'product', 'item']
vectorizer = CountVectorizer(ngram_range=(2, 3), stop_words=custom_stop_words, max_features=15)
try:
    X = vectorizer.fit_transform(complaints)
    keywords = vectorizer.get_feature_names_out()
    freqs = X.sum(axis=0).A1
    keyword_df = pd.DataFrame({'Keyword': keywords, 'Frequency': freqs}).sort_values(by='Frequency', ascending=False)
    print(keyword_df)
except Exception as e:
    print("Error:", e)
