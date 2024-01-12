import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMoviesByGenre } from '../store/store';

function SelectGenres({type}) {

    // const dispatch = useDispatch()
    const genres = useSelector(state => state.netflix.genres)

    const dispatch = useDispatch()

    return (
        <Select onChange={(e) => dispatch(fetchMoviesByGenre({type:type,genre : e.target.value}))}>
            <option value="">Select Genre</option>
            {genres.map(genre => {
                return <option key={genre.id} value={genre.id}>{genre.name}</option>
            })}
        </Select>
    );
}

const Select = styled.select`
    margin-left: 3rem;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 5px;
`

export default SelectGenres;