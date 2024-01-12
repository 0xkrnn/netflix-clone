import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import bg from "../assets/home.jpg"
import MovieLogo from "../assets/homeTitle.webp"
import { styled } from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store/store';
import Slider from '../components/Slider';


function Netflix() {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const genresLoaded = useSelector(state => state.netflix.genreLoaded)
    const movies = useSelector(state => state.netflix.movies)

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({type : "all",paging : true}))
        }
    }, [genresLoaded])

    return (
        <Container>
            <Navbar />
            <div className="hero">
                <img src={bg} alt="background-image" className='background-image' />
                <div className='dark-bg'>
                    <div className='container flex column'>
                        <div className='logo'>
                            <img src={MovieLogo} alt="Movie-logo" />
                        </div>
                        <div className='buttons flex'>
                            <button className='flex j-center a-center' onClick={() => navigate("/player")}>
                                {<FaPlay />} Play
                            </button>
                            <button className='flex j-center a-center'>
                                {<AiOutlineInfoCircle />} More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </Container>
    );
}

const Container = styled.div`
    background-color: black;
    position: relative;
    .hero{

        .background-image{
           width: 100%;
           min-height: 100%;
           object-fit: cover;
           /* opacity:0.6 ; */
        }

        
        .container{
            position: absolute;
            top: 10rem;
            left: 5rem;
            gap : 4rem;
            z-index: 0;

            .buttons{
                gap: 2rem;

                button{
                    font-size: 16px;
                    font-family: "Poppins",sans-serif;
                    padding: 0.5rem 1.2rem;
                    background-color: white;
                    gap : 1rem; 
                    outline: none;
                    border: none;
                    color: black;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: all 0.3s linear;
                    &:hover{
                        opacity: 0.8;
                    }

                    &:nth-of-type(2){
                        background-color: rgba(100, 97, 97,0.8);
                        color: white;
                    }

                    
                }

                

            }
        }
    
    }
`

export default Netflix;