import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

function Info() {

    const { id } = useParams()
    const movies = useSelector(state => state.netflix.movies)

    const movie = movies.find(item => item.id == id)

    console.log(movie);
    return (
        <Container>
            <Navbar />
            <div className='info'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" className='img' />
                <h1 className='title'>{movie.name ? movie.name : movie.title}</h1>
                <h5 className='overview'>{movie.overview}</h5>
            </div>

        </Container>
    );
}

const Container = styled.div`
    .info{
        margin: 0 auto;
        text-align: center;

        .img{
        background-size: cover;
        margin-top: 7rem ;
        width: 60%;
        -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
        filter: grayscale(100%);
        }

        .title{
            color: black;
            margin: 1rem;
        }

        .overview{
            padding: 1rem;
        }
        
    }
`
export default Info;