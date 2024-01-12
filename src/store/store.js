import {
  configureStore,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constants";

const initialState = {
  movies: [],
  genreLoaded: false,
  genres: [],
  myList: {
    saved: [],
    liked: [],
    disliked: []
  }
};

export const getGenres = createAsyncThunk("netflix/genre", async () => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return data;
  } catch (err) {
    console.log(err.name);
  }
});

const getMovies = async (arr, genres) => {
  // const movieArray = [...arr];

  let movieArray = [];

  arr.map((item) => {
    if (item.title || item.name && item.backdrop_path) movieArray.push(item);
  });

  movieArray.map((movie) => {
    movie.genre = [];

    movie.genre_ids.map((id) => {
      const name = genres.find((genreID) => genreID.id == id);
      if (name) {
        movie.genre.push(name.name);
      }
    });
  });
  return movieArray;
};

const getRawData = async (api, genres, paging) => {
  let movieArray = [];

  for (let i = 1; movieArray.length < 300 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    movieArray = [...movieArray, ...results];
  }


  const data = await getMovies(movieArray, genres);
  return data;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type, paging }, thunkAPI) => {
    // type would be movies,tv shows
    const {
      netflix: { genres },
    } = thunkAPI.getState();

    const url = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`

    const data = await getRawData(
      url,
      genres,
      paging
    );

    return data;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "netflix/fetchByGenre",
  async ({ type, genre }, thunkAPI) => {
    // type would be movies,tv shows
    const {
      netflix: { genres },
    } = thunkAPI.getState();

    const url = `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`

    const data = await getRawData(
      url,
      genres
    );
    return data;
  }
);



const netflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: {

    addToSave: (state, action) => {
      const {movie,type} = action.payload

      const exist = state.myList[type].find(item => item.id == movie.id)

      if (!exist) {
        state.myList[type].push(movie)
      }

      console.log(current(state.myList.liked),current(state.myList.disliked));
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres = [...action.payload.genres];
        state.genreLoaded = true;
      })

      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...action.payload];
      })

      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.movies = [...action.payload];
        console.log(current(state));
      })
  },
});

export const { addToSave } = netflixSlice.actions

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});

