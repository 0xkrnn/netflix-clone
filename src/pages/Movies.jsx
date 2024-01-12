import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { fetchMovies, getGenres } from '../store/store';
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import SelectGenres from '../components/SelectGenres';

function Movies() {

    const movies = useSelector(state => state.netflix.movies)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMovies({type : "movie"}))
    }, [])

    return (
        <Container>
            <div>
                <Navbar />
            </div>
            <div className='genres-list'>
                <SelectGenres type="movie"/>
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

export default Movies;