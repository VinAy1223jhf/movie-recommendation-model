from flask import Flask, request, jsonify
import pickle
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the pickled data
movies_list = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))


def fetch_poster(movie_id):
    response = requests.get(
        f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=6f0474e3d6b5a4909d8c625cf387193b&language=en-US")
    data = response.json()
    return 'https://image.tmdb.org/t/p/w500' + data['poster_path']


def recommend(movie):
    movie_index = movies_list[movies_list.title == movie].index[0]
    all_distances = similarity[movie_index]
    top_movies = sorted(list(enumerate(all_distances)), reverse=True, key=lambda x: x[1])[0:16]
    recommended_movie_names = []
    recommended_movie_posters = []

    for i in top_movies:
        movie_id = movies_list.iloc[i[0]].id
        recommended_movie_names.append(movies_list.iloc[i[0]].title)
        recommended_movie_posters.append(fetch_poster(movie_id))

    return recommended_movie_names, recommended_movie_posters


@app.route('/recommend', methods=['POST'])
def get_recommendations():
    data = request.json
    movie = data.get('movie')
    if not movie:
        return jsonify({'error': 'Movie not provided'}), 400

    names, posters = recommend(movie)
    return jsonify({'names': names, 'posters': posters})


if __name__ == '__main__':
    app.run(debug=True)
