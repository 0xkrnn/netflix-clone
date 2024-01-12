import React, { useState } from 'react';
import { styled } from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';


function Register(props) {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })

    const handleSignUp = async () => {
        try {
            const {email,password} = formValue
            await createUserWithEmailAndPassword(firebaseAuth,email,password)
            console.log("success");

        } catch (err) {
            console.log(err);
        }
    }

    onAuthStateChanged(firebaseAuth,(currentUser) => {
        if(currentUser) navigate("/ ")
    })

    return (

        <Container>
            <BackgroundImage />
            <div className='content height width'>
                <Header />
                <div className='body flex column a-center j-center'>
                    <div className='text flex column'>
                        <h1>Unlimited Movies, Tv Shows and more</h1>
                        <h4>Watch anywhere, Cancel Anytime.</h4>
                        <h6>
                            Ready to watch?  Enter your email to create or restart membership
                        </h6>
                    </div>
                    <div className='form'>
                        <input type="text" name='email' placeholder='Enter you email' value={formValue.email} onChange={(e) => setFormValue({ ...formValue, email: e.target.value })} />

                        {showPassword && <input type="password" name='password' placeholder='Enter Password' value={formValue.password} onChange={(e) => setFormValue({ ...formValue, password: e.target.value })} />}

                        {!showPassword && <button type='button' className='button' onClick={() => setShowPassword(!showPassword)}> Get Strated</button>}

                    </div>
                    <button type='button' className='button' onClick={() => handleSignUp()}> Sign Up</button>
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
                font-size: 1.4rem;
                text-align: center;
                letter-spacing: 1.05px;
            }
            .form{
                display: grid;
                grid-template-columns:${showPassword => showPassword ? "1fr 1fr" : "2fr 1fr"};
                width: 60%;
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

export default Register;