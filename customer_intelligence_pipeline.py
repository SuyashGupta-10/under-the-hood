# =========================================================
# UNDER THE HOOD
# Samsung Smartwatch Customer Intelligence Pipeline
# =========================================================

# INSTALL IF NEEDED:
# pip install pandas numpy transformers torch sentence-transformers bertopic scikit-learn keybert plotly nltk

import pandas as pd
import numpy as np
import json
import re
from tqdm import tqdm
from transformers import pipeline
from sentence_transformers import SentenceTransformer
from bertopic import BERTopic
from sklearn.feature_extraction.text import CountVectorizer
from collections import Counter
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker

# =========================================================
# STEP 1 — LOAD & FILTER SAMSUNG SMARTWATCH REVIEWS
# =========================================================

TARGET_SIZE = 3000

pattern = re.compile(
    r'(samsung\s+(?:galaxy\s+|smart\s+|active\s+)?watch|'
    r'galaxy\s+(?:smart\s+|active\s+)?watch|'
    r'samsung\s+gear)',
    re.IGNORECASE
)

data = []

print("Loading Samsung smartwatch reviews...")

with open("Electronics.jsonl", "r", encoding="utf-8") as f:
    for line in tqdm(f):

        if len(data) >= TARGET_SIZE:
            break

        low = line.lower()

        if (
            'samsung' in low and
            ('watch' in low or 'gear' in low) and
            'tv' not in low and
            'television' not in low
        ):

            try:
                record = json.loads(line)

                title = str(record.get("title", ""))
                text = str(record.get("text", ""))

                full_text = f"{title}. {text}"

                if pattern.search(full_text):
                    data.append(record)

            except:
                continue

df = pd.DataFrame(data)

# =========================================================
# STEP 2 — CLEAN TEXT
# =========================================================

def clean_text(text):
    text = str(text).lower()

    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"<.*?>", "", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()

df["title"] = df["title"].fillna("")
df["text"] = df["text"].fillna("")

df["full_text"] = (
    df["title"] + ". " + df["text"]
)

df["clean_text"] = df["full_text"].apply(clean_text)

# remove empty reviews
df = df[df["clean_text"].str.len() > 20]

print(f"\nTotal reviews after cleaning: {len(df)}")

# =========================================================
# STEP 3 — TRANSFORMER SENTIMENT ANALYSIS
# =========================================================

print("\nLoading sentiment model...")

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment-latest",
    truncation=True
)

sentiments = []
scores = []

print("\nRunning sentiment analysis...")

for text in tqdm(df["clean_text"].tolist()):

    try:
        result = sentiment_pipeline(text[:512])[0]

        label = result["label"].upper()
        score = result["score"]

        sentiments.append(label)
        scores.append(score)

    except:
        sentiments.append("UNKNOWN")
        scores.append(0)

df["sentiment"] = sentiments
df["sentiment_confidence"] = scores

# =========================================================
# STEP 4 — EMOTION DETECTION
# =========================================================

print("\nLoading emotion model...")

emotion_pipeline = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=1,
    truncation=True
)

emotions = []

print("\nRunning emotion detection...")

for text in tqdm(df["clean_text"].tolist()):

    try:
        result = emotion_pipeline(text[:512])[0][0]

        emotions.append(result["label"])

    except:
        emotions.append("unknown")

df["emotion"] = emotions

# =========================================================
# STEP 5 — DETECT SILENT KILLERS
# =========================================================

# ratings may differ depending on dataset schema
rating_col = "rating"

silent_killers = df[
    (df[rating_col] >= 4) &
    (df["sentiment"] == "NEGATIVE")
]

healthy_reviews = df[
    (df[rating_col] >= 4) &
    (df["sentiment"] == "POSITIVE")
]

priority_negative = df[
    (df["sentiment"] == "NEGATIVE")
]

print("\n===== SEGMENT COUNTS =====")
print(f"Silent Killers: {len(silent_killers)}")
print(f"Priority Negative: {len(priority_negative)}")
print(f"Healthy Reviews: {len(healthy_reviews)}")

# =========================================================
# STEP 6 — CHURN / RETURN RISK
# =========================================================

risk_keywords = [
    "return",
    "refund",
    "replacement",
    "switching",
    "won't buy again",
    "never again",
    "regret",
    "disappointed",
    "waste of money"
]

def detect_risk(text):

    text = text.lower()

    for word in risk_keywords:
        if word in text:
            return 1

    return 0

df["churn_risk"] = df["clean_text"].apply(detect_risk)

# =========================================================
# STEP 7 — TRUST BREAKDOWN SCORE
# =========================================================

def normalize_rating(r):

    if r >= 4:
        return 1

    elif r == 3:
        return 0

    else:
        return -1

def sentiment_to_numeric(sentiment):

    if sentiment == "POSITIVE":
        return 1

    elif sentiment == "NEGATIVE":
        return -1

    else:
        return 0

df["rating_score"] = df[rating_col].apply(normalize_rating)

df["sentiment_score"] = df["sentiment"].apply(
    sentiment_to_numeric
)

df["trust_breakdown_score"] = abs(
    df["rating_score"] - df["sentiment_score"]
)

# =========================================================
# STEP 8 — TOPIC MODELING WITH BERTopic
# =========================================================

print("\nLoading sentence transformer...")

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("\nGenerating embeddings...")

embeddings = embedding_model.encode(
    df["clean_text"].tolist(),
    show_progress_bar=True
)

print("\nRunning BERTopic...")

topic_model = BERTopic(
    verbose=True,
    min_topic_size=20
)

topics, probs = topic_model.fit_transform(
    df["clean_text"].tolist(),
    embeddings
)

df["topic"] = topics

topic_info = topic_model.get_topic_info()

print("\n===== TOPICS =====")
print(topic_info.head(10))

# =========================================================
# STEP 9 — COMPLAINT SEVERITY SCORE
# =========================================================

emotion_weights = {
    "anger": 1.0,
    "disgust": 0.9,
    "fear": 0.8,
    "sadness": 0.7,
    "neutral": 0.3,
    "joy": 0.1
}

def emotion_intensity(emotion):
    return emotion_weights.get(emotion.lower(), 0.5)

df["emotion_intensity"] = df["emotion"].apply(
    emotion_intensity
)

df["severity_score"] = (
    0.4 * df["sentiment_confidence"] +
    0.3 * df["emotion_intensity"] +
    0.3 * df["churn_risk"]
)

# =========================================================
# STEP 10 — TOP COMPLAINT THEMES
# =========================================================

negative_texts = priority_negative["clean_text"]

vectorizer = CountVectorizer(
    ngram_range=(2,3),
    stop_words="english",
    max_features=30
)

X = vectorizer.fit_transform(negative_texts)

keywords = vectorizer.get_feature_names_out()
freqs = X.sum(axis=0).A1

keyword_df = pd.DataFrame({
    "keyword": keywords,
    "frequency": freqs
})

keyword_df = keyword_df.sort_values(
    by="frequency",
    ascending=False
)

print("\n===== TOP COMPLAINT KEYWORDS =====")
print(keyword_df.head(20))

# =========================================================
# STEP 10b — KEYWORD-FREQUENCY VISUALIZATION
# =========================================================

print("\nGenerating keyword-frequency chart...")

top_n = 10
plot_df = keyword_df.head(top_n).iloc[::-1]  # reverse for bottom-to-top

total_reviews = len(df)
top1_kw = keyword_df.iloc[0]["keyword"].title()
top1_freq = int(keyword_df.iloc[0]["frequency"])
top2_kw = keyword_df.iloc[1]["keyword"].title()
top2_freq = int(keyword_df.iloc[1]["frequency"])
top_pct = round((top1_freq + top2_freq) / total_reviews * 100)

# --- dark theme chart ---
fig, ax = plt.subplots(figsize=(10, 7))

bg_color = "#0d1117"
panel_color = "#161b22"
text_color = "#e6edf3"
grid_color = "#21262d"
bar_color = "#58a6ff"
accent_color = "#8b949e"

fig.patch.set_facecolor(bg_color)
ax.set_facecolor(panel_color)

bars = ax.barh(
    plot_df["keyword"].str.title(),
    plot_df["frequency"],
    color=bar_color,
    edgecolor="none",
    height=0.6
)

# labels on bars
for bar in bars:
    width = bar.get_width()
    ax.text(
        width + 4, bar.get_y() + bar.get_height() / 2,
        f"{int(width)}",
        va="center", ha="left",
        color=accent_color, fontsize=10, fontweight="bold"
    )

ax.set_title(
    "Top 10 Complaint Keywords",
    color=text_color, fontsize=16, fontweight="bold",
    loc="left", pad=20
)
ax.text(
    0.0, 1.02,
    f"Most frequently mentioned pain points across {total_reviews:,} reviews",
    transform=ax.transAxes,
    color=accent_color, fontsize=11, style="italic"
)

ax.tick_params(axis="y", colors=text_color, labelsize=11)
ax.tick_params(axis="x", colors=accent_color, labelsize=10)
ax.xaxis.set_major_locator(mticker.MaxNLocator(integer=True, nbins=7))

ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_color(grid_color)
ax.spines["bottom"].set_color(grid_color)

ax.set_axisbelow(True)
ax.xaxis.grid(True, color=grid_color, linewidth=0.5)
ax.yaxis.grid(False)

# insight callout box
insight_text = (
    f"\U0001f4a1  {top1_kw} ({top1_freq}) and {top2_kw} ({top2_freq}) "
    f"dominate complaints — together accounting for {top_pct}% of all review mentions."
)
fig.text(
    0.5, -0.02, insight_text,
    ha="center", fontsize=11, color=text_color,
    style="italic",
    bbox=dict(boxstyle="round,pad=0.6", facecolor="#1c2128", edgecolor=grid_color)
)

plt.tight_layout()
plt.savefig(
    "top_complaint_keywords.png",
    dpi=150, bbox_inches="tight",
    facecolor=bg_color, edgecolor="none"
)
plt.close()
print("✅ Saved: top_complaint_keywords.png")

# =========================================================
# STEP 11 — CUSTOMER PERSONAS
# =========================================================

def assign_persona(row):

    if row["trust_breakdown_score"] >= 2:
        return "Silent Dissatisfied"

    elif (
        row["sentiment"] == "NEGATIVE" and
        row[rating_col] <= 2
    ):
        return "Angry Critic"

    elif (
        row["sentiment"] == "POSITIVE" and
        row[rating_col] >= 4
    ):
        return "Loyal Defender"

    else:
        return "Mixed Reviewer"

df["persona"] = df.apply(assign_persona, axis=1)

# =========================================================
# STEP 12 — EXPORT FILES
# =========================================================

silent_killers.to_csv(
    "silent_killers.csv",
    index=False
)

priority_negative.to_csv(
    "priority_negative.csv",
    index=False
)

healthy_reviews.to_csv(
    "healthy_reviews.csv",
    index=False
)

df.to_csv(
    "full_customer_intelligence.csv",
    index=False
)

keyword_df.to_csv(
    "top_complaints.csv",
    index=False
)

topic_info.to_csv(
    "topic_summary.csv",
    index=False
)

print("\n===================================")
print("PIPELINE COMPLETED SUCCESSFULLY")
print("===================================")

print("\nGenerated Files:")
print("- silent_killers.csv")
print("- priority_negative.csv")
print("- healthy_reviews.csv")
print("- full_customer_intelligence.csv")
print("- top_complaints.csv")
print("- topic_summary.csv")
