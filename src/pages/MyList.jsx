import React from 'react';
import CardSlider from '../components/CardSlider';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

function MyList() {

    const { saved, liked, disliked } = useSelector(state => state.netflix.myList)


    return (
        <>
            <Navbar />
            <Container>
                <CardSlider title="Saved" data={saved} />
                <CardSlider title="Liked" data={liked} />
                <CardSlider title="Dis-Liked" data={disliked} />
            </Container>
        </>
    );
}

const Container = styled.div`
    margin-top: 10rem;
`

export default MyList;