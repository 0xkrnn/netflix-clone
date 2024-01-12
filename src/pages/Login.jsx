import React, { useState } from 'react';
import { styled } from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    })
    
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const {email,password} = formValue;
            console.log(email,password);
            await signInWithEmailAndPassword(firebaseAuth,email,password)
            console.log("Logged");
            
        }
        catch (err) {
            console.log(err);
        }
    }

    onAuthStateChanged(firebaseAuth,(currentUser) => {
        if(currentUser) navigate("/")
    })

    return (

        <Container>
            <BackgroundImage />
            <div className='content height width'>
                <Header />
                <div className='body flex column a-center j-center'>
                    <h1 className='text'> Log In</h1>
                    <div className='form'>
                        <input type="text" name='email' placeholder='Enter you email' value={formValue.email} onChange={(e) => setFormValue({ ...formValue, email: e.target.value })} />

                        <input type="password" name='password' placeholder='Enter Password' value={formValue.password} onChange={(e) => setFormValue({ ...formValue, password: e.target.value })} />


                    </div>
                    <button type='button' className='button' onClick={  handleLogin}> Log In</button>
                </div>
            </div>
        </Container>

    );
}

const Container = styled.div`
    position : relative;
    .content {
        position : absolute;
        top : 0;
        left: 0;
        background-color: rgba(0,0,0,0.5);
        display: grid;
        grid-template-rows: 15vh 80vh;
        .body{
            gap:2rem;
            
            .text{
                gap: 2rem;
                font-size: 2.5rem;
                text-align: center;
                letter-spacing: 1.05px;
            }
            .form{
                display: grid;
                /* grid-template-rows:; */
                width: 40%;
                gap: 6px;
              
            input{
                padding: 1rem;
                border: none;
                outline: none;
            }
            }
        }
    }
`

export default Login;