import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: block;
    margin-bottom: 20px;
`;

export default (props) => {
    return (
        <Form {...props} >
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Position(x,y):</span>
                </div>
                <input type="text" className="form-control" name="x" id="x" defaultValue="0" />
                <input type="text" className="form-control" name="y" id="y" defaultValue="0" />
                <select className="custom-select" name="direction">
                    <option defaultValue="north" value="north">North</option>
                    <option value="east">East</option>
                    <option value="south">South</option>
                    <option value="west">West</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success">Place</button>
        </Form>
    );
}