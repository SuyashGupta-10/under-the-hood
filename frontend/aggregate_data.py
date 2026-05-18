import pandas as pd
import json

def aggregate():
    print("Loading datasets...")
    full_df = pd.read_csv('full_customer_intelligence.csv')
    healthy_df = pd.read_csv('healthy_reviews.csv')
    silent_df = pd.read_csv('silent_killers.csv')
    negative_df = pd.read_csv('priority_negative.csv')
    topics_df = pd.read_csv('topic_summary.csv')
    complaints_df = pd.read_csv('top_complaints.csv')

    # ── KPIs ──
    print("Aggregating KPIs...")
    kpi_reviews = len(full_df)
    kpi_silent_killers = len(silent_df)
    kpi_healthy = len(healthy_df)
    kpi_negative = len(negative_df)
    kpi_topics = len(topics_df[topics_df['Topic'] != -1])

    # ── Trend Data ──
    print("Aggregating Trend Data...")
    full_df['date'] = pd.to_datetime(full_df['timestamp'], unit='ms')
    monthly_stats = full_df.set_index('date').resample('ME').agg({
        'rating': 'mean',
        'sentiment_score': 'mean'
    }).dropna()

    labels = monthly_stats.index.strftime('%b %y').tolist()
    stars = monthly_stats['rating'].round(2).tolist()
    sentiments = monthly_stats['sentiment_score'].round(2).tolist()

    # ── Donut ──
    print("Aggregating Donut Data...")
    donut_data = [kpi_healthy, kpi_silent_killers, kpi_negative]

    # ── Aspects (Top 10) ──
    print("Aggregating Aspects...")
    top_aspects = complaints_df.head(10).to_dict(orient='records')
    aspect_keywords_5 = [a['keyword'] for a in top_aspects[:5]]

    # ── Emotion Distribution (overall) ──
    print("Aggregating Emotions...")
    emotion_counts = full_df['emotion'].value_counts().to_dict()

    # ── Heatmap (top 5 keywords × top 5 emotions) ──
    print("Aggregating Heatmap...")
    top_emotions = list(full_df['emotion'].value_counts().head(5).index)
    full_df['clean_text'] = full_df['clean_text'].fillna('').astype(str)

    heatmap_matrix = []
    for aspect in aspect_keywords_5:
        aspect_df = full_df[full_df['clean_text'].str.contains(aspect, case=False, na=False)]
        row_emotions = []
        for emotion in top_emotions:
            count = int(len(aspect_df[aspect_df['emotion'] == emotion]))
            row_emotions.append(count)
        heatmap_matrix.append({
            'aspect': aspect.title(),
            'emotions': row_emotions
        })

    # ── Topics from BERTopic ──
    print("Aggregating Topics...")
    valid_topics = topics_df[topics_df['Topic'] != -1].copy()
    topic_list = []
    for _, row in valid_topics.iterrows():
        topic_list.append({
            'id': int(row['Topic']),
            'name': row['Name'],
            'count': int(row['Count']),
            'keywords': row['Representation']
        })

    # ── Top Fixes ──
    print("Aggregating Top Fixes...")
    top_fixes = []
    for i, row in complaints_df.head(3).iterrows():
        kw = row['keyword']
        freq = int(row['frequency'])
        # Calculate the % of all reviews mentioning this
        pct = round(freq / kpi_reviews * 100, 1)
        # Find the dominant negative emotion for this keyword
        kw_df = full_df[full_df['clean_text'].str.contains(kw, case=False, na=False)]
        neg_emotions = kw_df[kw_df['sentiment'] == 'NEGATIVE']['emotion'].value_counts()
        dom_emotion = neg_emotions.index[0] if len(neg_emotions) > 0 else 'sadness'

        top_fixes.append({
            'title': kw.title(),
            'metric': f"{freq} mentions ({pct}% of reviews)",
            'desc': f"Dominant negative emotion: {dom_emotion}. Requires immediate action to reduce churn.",
            'frequency': freq,
            'pct': pct
        })

    # ── Rating Distribution ──
    print("Aggregating Rating Distribution...")
    rating_dist = full_df['rating'].value_counts().sort_index().to_dict()
    rating_dist = {str(int(k)): int(v) for k, v in rating_dist.items()}

    # ── Sentiment Split ──
    sent_counts = full_df['sentiment'].value_counts().to_dict()

    # ── Avg metrics ──
    avg_star = round(full_df['rating'].mean(), 2)
    avg_sentiment = round(full_df['sentiment_score'].mean(), 2)

    # ── Export ──
    output = {
        'kpi': {
            'reviews': kpi_reviews,
            'killers': kpi_silent_killers,
            'healthy': kpi_healthy,
            'negative': kpi_negative,
            'topics': kpi_topics,
            'avg_star': avg_star,
            'avg_sentiment': avg_sentiment
        },
        'trends': {
            'labels': labels,
            'stars': stars,
            'sentiment': sentiments
        },
        'donut': donut_data,
        'aspects': top_aspects,
        'emotion_distribution': emotion_counts,
        'heatmap': {
            'emotions': [e.title() for e in top_emotions],
            'matrix': heatmap_matrix
        },
        'topics': topic_list,
        'fixes': top_fixes,
        'rating_distribution': rating_dist,
        'sentiment_split': sent_counts
    }

    with open('dashboard_data.json', 'w') as f:
        json.dump(output, f, indent=2)

    print(f"\nSuccessfully wrote dashboard_data.json!")
    print(f"  Reviews: {kpi_reviews}")
    print(f"  Silent Killers: {kpi_silent_killers}")
    print(f"  Priority Negative: {kpi_negative}")
    print(f"  Healthy: {kpi_healthy}")
    print(f"  Topics: {kpi_topics}")
    print(f"  Avg Star: {avg_star}")
    print(f"  Avg Sentiment: {avg_sentiment}")

if __name__ == '__main__':
    aggregate()
