import React from 'react';
import styled from 'styled-components';

const Log = styled.ul`
    width: 100%;
    max-height: 300px;
    border: 1px solid rgba(0,0,0,0.1);
    text-decoration: none;
    margin-top: 15px;
    padding: 10px;
    overflow: scroll;
`;

export default (props) => {
    return (
        <Log>
            {
                props.log.map((item) => (
                    <li>{`${item.x} : ${item.y} ${item.direction}`}</li>
                ))
            }
        </Log>
    );
}