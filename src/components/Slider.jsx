import React from 'react';
import CardSlider from './CardSlider';
import { useSelector } from 'react-redux';

function Slider() {

    const movies = useSelector(state => state.netflix.movies)

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to)
    }

    console.log(movies);

    return (
        <div>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
            <CardSlider title="New Release" data={getMoviesFromRange(10, 20)} />
            <CardSlider title="Popular on Netflix" data={getMoviesFromRange(20, 30)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(30, 40)} />
            <CardSlider title="Epics" data={getMoviesFromRange(40, 50)} />
        </div>
    );
}

export default Slider;