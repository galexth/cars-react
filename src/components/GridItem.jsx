import React from 'react';
import styled from 'styled-components';

const GridItem = styled.span`
    background: rgba(0,0,0,0.1);
    border: 1px white solid;
    &:first-child{
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }
`;

export default () => (<GridItem/>)