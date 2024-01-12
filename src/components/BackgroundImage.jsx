import React from 'react';
import bg from "../assets/login.jpg"
import { styled } from 'styled-components';

function BackgroundImage() {
    return (
      <Container>
        <img src={bg} alt="bg-img" />
      </Container>
    );
}

const Container = styled.div`
    height : 100vh;
    width : 100vw;
    img{
       height : 100vh;
       width : 100vw; 
    }
`

export default BackgroundImage;