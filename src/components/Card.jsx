import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5"
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"
import { addToSave } from '../store/store';
import { useDispatch } from 'react-redux';



function Card({ movie }) {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const saveToMovies = (movie,type) => {
        console.log(type);
        dispatch(addToSave({movie,type}))
    }


    return (
        <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie-img" />

            {
                isHovered && (
                    <div className="hover">
                        <div className="img-video-container">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie-img" onClick={() => navigate("/player")} />
                            <video src={video} autoPlay controls loop muted onClick={() => navigate("/player")}></video>
                        </div>
                        <div className="info-container flex column">
                            <h3 className="name" onClick={() => navigate("/player")}>{movie.name ? movie.name : movie.title}</h3>
                            <div className="icons flex j-between">
                                <div className="controls flex">
                                    <IoPlayCircleSharp title='play' onClick={() => navigate("/player")} />
                                    <RiThumbUpFill title='like' onClick={() => saveToMovies(movie,"liked")}/>
                                    <RiThumbDownFill title='Dislike' onClick={() => saveToMovies(movie,"disliked")}/>
                                    <AiOutlinePlus title='save' onClick={() => saveToMovies(movie,"saved")} />
                                </div>
                                <div className="info">
                                    <BiChevronDown title='More Info' onClick={() => navigate(`/infos/${movie.id}`)}/>
                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className='flex'>
                                    {movie.genre.slice(0, 3).map(genre => {
                                        return <li key={genre}>{genre.toLowerCase() == "science fiction" ? "Science" : genre}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    );
}

const Container = styled.div`
    max-width : 230px;
    height: 100%;
    cursor: pointer;
    position: relative;

    
    img{
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .hover{
        z-index: 99;
        height: max-content;
        width: 20rem;
        position: absolute;
        top: -18vh;
        left: 0;
        box-shadow: rgba(0,0,0,0.75) 5px 5px 5px;
        transition: 0.3s  ease-in-out;

        .img-video-container{
        position: relative;
        height: 140px;

        img{
            width: 100%;
            height: 140px;
            object-fit: cover;
            border-radius: 0;
            position: absolute;
            top: 0;
        }

        video{
            height: 140px;
            width: 100%;
            object-fit: cover;
            position: absolute;
            z-index: 10;
            top: 0;
        }

    }

    .info-container{
        background-color: black;
        padding: 0.5rem;
        gap: 0.5rem;

        .icons{
            .controls{
                gap: 10px;
                svg{
                    font-size: 15px;
                    transition: 0ms.3s ease-in-out;
                    &:hover{
                        color: #b8b8b8;
                    }
                }

            }
        }

        .genres{
            ul {
                gap: 26px;

                li{
                    &:first-of-type{
                        list-style-type: none;
                    }
                }
            }
        }

    }

    }

    
`

export default Card;