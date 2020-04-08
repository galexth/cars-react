import React from 'react';
import car from '../car.png';
import styled from 'styled-components';

const CarImage = styled.img`
    transform: ${props => props.transform};
    position: absolute;
    left: ${props => props.left};
    bottom: ${props => props.bottom};
    transition: left .1s, bottom .1s;
`;

export default ({transform, width}) => {
    return (
        <CarImage transform={`rotate(${transform.rotate}deg)`} left={`${transform.left}px`} bottom={`${transform.bottom}px`} src={car} alt="car" width={width} />
    );
}