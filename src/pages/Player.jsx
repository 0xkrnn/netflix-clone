import React from 'react';
import { BsArrowLeft } from "react-icons/bs"
import { styled } from 'styled-components';
import video from "../assets/video.mp4"
import { useNavigate } from 'react-router-dom';

function Player() {

    const navigate = useNavigate()

    return (
        <Container>
            <div className="player">
                <div className="back">
                    {<BsArrowLeft onClick={() => navigate(-1)}/>}
                </div>
                <video src={video} controls autoPlay loop muted></video>
            </div>
        </Container>
    );
}

export default Player;

const Container = styled.div`
    width:100vw ;
    height: 100vh;
    .player{
        width : 100%;
        height : 100%;
        .back{
            position: absolute;
            left: 2rem;
            top : 1rem;
            padding: 10px;
            cursor: pointer;
            z-index: 10;

            svg{
                font-size: 35px;
                text-align: center;
                color: white;
                z-index: 10;
                cursor: pointer;
            }
        }

        video{
           min-width: 100%;
           height: 100%;
        }
    }

`