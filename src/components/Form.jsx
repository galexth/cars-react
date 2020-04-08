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
                    <option defaultValue="north">north</option>
                    <option value="east">east</option>
                    <option value="south">south</option>
                    <option value="west">west</option>
                </select>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </Form>
    );
}