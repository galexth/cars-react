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

let grids = [];

for (let i = 0; i < 5 * 5; i++) grids.push(<GridItem key={i} />);

export default (props) => {
    return (
        <Grid ref={props.innerRef}>
            {grids}
        </Grid>
    );
}