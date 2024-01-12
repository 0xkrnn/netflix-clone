import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SelectGenres from '../components/SelectGenres';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store/store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function TVShows() {

    const movies = useSelector(state => state.netflix.movies)
    const genresLoaded = useSelector(state => state.netflix.genres_loaded)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies({ type: "movie" }))
    }, [])


    return (
        <Container>
            <div>
                <Navbar />
            </div>
            <div className='genres-list'>
                <SelectGenres type="tv" />
            </div>
            <div className='data'>
                {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
            </div>
        </Container>
    );
}

const Container = styled.div`
    .genres-list{
        margin-top: 8rem;
    }
`

export default TVShows;