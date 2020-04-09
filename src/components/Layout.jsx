import React, { createRef } from 'react';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';
import api from '../apiClient';
import Car from './Car';
import Grid from './Grid';
import Form from './Form';
import Log from './Log';

const Container = styled.div`
    min-width: 400px;
`;

const GridWrapper = styled.div`
    position: relative;
`;

const carWidth = 50;

const MESSAGE = {
    carIsNotReady: 'Place the car first.',
    wrongDirection: 'Wrong direction.',
};

const calculateTransform = (el, pos) => {
    const newCarPosition = {};

    switch (pos.direction) {
        case 'north':
            newCarPosition.rotate = 0;
            break;
        case 'east':
            newCarPosition.rotate = 90;
            break;
        case 'south':
            newCarPosition.rotate = 180;
            break;
        case 'west':
            newCarPosition.rotate = 270;
            break;
        default: throw new Error(MESSAGE.wrongDirection);
    }

    const width = el.current.getBoundingClientRect().width / 5;
    const height = el.current.getBoundingClientRect().height / 5;

    newCarPosition.left = (width * (pos.x + 1)) - (width / 2) - carWidth / 2;
    newCarPosition.bottom = (height * (pos.y + 1)) - (height / 2) - carWidth / 2;

    return newCarPosition;
};

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.gridRef = createRef();

        this.state = {
            position: null,
            transform: null,
            log: [],
         };

        this.place = this.place.bind(this);
        this.move = this.move.bind(this);
        this.reset = this.reset.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount(){
        api.init().then(({ data }) => {
            if (data) {
                this.setState((prevState) => ({
                    position: data,
                    transform: calculateTransform(this.gridRef, data),
                    log: [data, ...prevState.log],
                }));
            }

            document.addEventListener('keydown', this.onKeyDown);
            window.addEventListener('resize', this.onWindowResize);
        }).catch(err => NotificationManager.error(err.response ? err.response.data.error : err.message));
    }

    onWindowResize() {
        const {position} = this.state;

        if (position) {
            this.setState({ transform: calculateTransform(this.gridRef, position) });
        }
    }

    onKeyDown(e) {
        switch (e.code) {
            case 'ArrowUp':
                e.preventDefault();
                return this.move();
            case 'ArrowLeft':
                e.preventDefault();
                return this.turn('left');
            case 'ArrowRight':
                e.preventDefault();
                return this.turn('right');
            default: return false;
        }
    }

    reset() {
        if (! this.state.position) {
            NotificationManager.error(MESSAGE.carIsNotReady);
            return;
        }

        api.reset().then(() => {
            this.setState({
                position: null,
                transform: null,
                log: [],
            });
        });
    }

    turn(dir) {
        if (! this.state.position) {
            NotificationManager.error(MESSAGE.carIsNotReady);
            return;
        }

        api[dir]().then(({ data }) => {
            this.setState((prevState) => ({
                position: data,
                transform: calculateTransform(this.gridRef, data),
                log: [data, ...prevState.log],
            }));
        });
    }

    move() {
        if (! this.state.position) {
            NotificationManager.error(MESSAGE.carIsNotReady);
            return;
        }

        api.move().then(({ data }) => {
            this.setState((prevState) => ({
                position: data,
                transform: calculateTransform(this.gridRef, data),
                log: [data, ...prevState.log],
            }));
        });
    }

    place(e) {
        e.preventDefault();

        api.place({
            x: parseInt(e.target.x.value, 10),
            y: parseInt(e.target.y.value, 10),
            direction: e.target.direction.value,
        }).then(({data}) => {
            this.setState((prevState) => ({
                position: data,
                transform: calculateTransform(this.gridRef, data),
                log: [data, ...prevState.log],
            }));
        }).catch(err => NotificationManager.error(err.response ? err.response.data.error : err.message));

        return false;
    }

    render() {
        const { position, transform, log } = this.state;

        return (
            <Container className="row justify-content-sm-center">
                <div className="col col-lg-6">
                    <h2>Current position: {position ? `${position.x} : ${position.y} ${position.direction}` : 'place the car'}</h2>
                    <GridWrapper>
                        <Grid innerRef={this.gridRef} />
                        {transform ? <Car width={carWidth} transform={transform} /> : null}
                    </GridWrapper>
                </div>
                <div className="controls col-sm-auto">
                    <Form onSubmit={this.place} />
                    <div className="btn-group" role="group">
                        <button disabled={! position} type="button" onClick={() => this.turn('left')} className="btn btn-primary">&#8592;</button>
                        <button disabled={! position} type="button" onClick={() => this.turn('right')} className="btn btn-primary">&#8594;</button>
                        <button disabled={! position} type="button" onClick={this.move} className="btn btn-primary">&#8593;</button>
                        <button disabled={! position} type="button" onClick={this.reset} className="btn btn-danger">Reset</button>
                    </div>
                    <Log log={log} />
                </div>
            </Container>
        );
    }

}

export default Layout;