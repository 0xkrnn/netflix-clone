import React, { useState } from 'react';
import { styled } from 'styled-components';
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaPowerOff } from "react-icons/fa"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { firebaseAuth } from '../utils/firebase-config';


function Navbar() {

    const links = [
        { name: "Home", link: "/" },
        { name: "TV show", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" }
    ]

    const navigate = useNavigate()

    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    const onLogOut = () => {
        signOut(firebaseAuth)
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })

    return (
        <Container>
            <nav className='flex a-center j-between'>

                <div className="left flex a-center">
                    <div className='brand flex a-center'>
                        <img src={logo} alt="" />
                    </div>
                    <ul className='links flex '>

                        {links.map(link => {
                            return (
                                <li key={link.name}>
                                    <Link to={link.link} > {link.name} </Link>
                                </li>
                            )
                        })}

                    </ul>
                </div>

                <div className='right flex a-center'>
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) {
                                    setShowSearch(false)
                                }
                            }}
                        >
                            <FaSearch />
                        </button>
                        <input type="text" placeholder='Search'
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false)
                                setInputHover(false)
                            }}
                        />
                    </div>
                    <button
                        onClick={() => onLogOut()}
                    >
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`   

    nav {
        position : fixed;
        width: 100%;
        top : 0;
        height : 100px;
        background-color: black;
        padding: 0 2.5rem;
        z-index: 999;

        .left {
            gap: 2.5rem;
           .brand{
            img{
                width : 150px
            }
           }
        }

        .links{
            list-style: none;
            gap : 2.5rem;
            
            li a{
                color: white;
                text-decoration: none;
            }
        }

        .right{
            gap : 2.5rem;
           
            .search {
                display : flex;
                gap: 10px;
                align-items : center;
                justify-content: center;
                padding: 0.5rem 1rem;


                button{
                    outline: none;
                    border : none;
                    background-color: transparent;
                    color: white;
                    font-size: 16px;
                    height: 25px;
                    cursor: pointer;
                }

                input{
                    outline: none;
                    width : 0;
                    opacity : 0;
                    visibility: hidden;
                    border: none;
                    color: white;
                    background-color:transparent ;
                    font-size: 16px;
                    transition: all linear 0.3s;
                }
            }

            button{
                background-color: transparent;
                color: red;
                font-size: 20px;
                outline: none;
                border: none;
                cursor: pointer;
            }

            .show-search{
                border: 1px solid white;

                input{
                    visibility: visible;
                    width: 100%;
                    opacity: 1;
                    background-color: rgba(0,0,0,0.6);
                }

            }
            
        }
    }

`

export default Navbar;