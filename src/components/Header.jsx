import React from 'react';
import { styled } from 'styled-components';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

function Header(props) {


    const navigate = useNavigate()

    return (
        <Container className='flex a-center j-between width '>
            <div className="logo">
                <img src={logo} alt="logo-png" />
            </div>
            <button onClick={() => navigate(props.login ? "/login" : "/signup")} className='button'>
                {props.login ? "Log In" : "Sign Up  "}
            </button>
        </Container>
    );
}

const Container = styled.div`
    background-color: rgba(0,0,0,0.8);
    padding: 0 2rem ;
    .logo img {
        width: 150px;
    }
   
`

export default Header;