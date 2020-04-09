import React from 'react';
import styled from 'styled-components';
import GridItem from './GridItem';

const Grid = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, minmax(4rem, 1fr));
    grid-auto-rows: 1fr;
    margin-bottom:15px;
    &:before{
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;

const grids = [];
const gridItems = 5 * 5;

for (let i = 0; i < gridItems; i++) grids.push(<GridItem key={i} />);

export default ({innerRef}) => {
    return (
        <Grid ref={innerRef}>
            {grids}
        </Grid>
    );
}