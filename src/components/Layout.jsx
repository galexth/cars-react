import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import api from '../apiClient';
import { NotificationManager } from 'react-notifications';
import Car from './Car';
import Grid from './Grid';
import Form from './Form';

const Container = styled.div`
    min-width: 400px;
`;

const GridWrapper = styled.div`
    position: relative;
`;

export default () => {

    const [isReady, setIsReady] = useState(false);
    const [position, setPosition] = useState({});
    const [transform, setTransform] = useState({
        rotate: 0,
        left: 0,
        bottom: 0,
    })
    const gridRef = useRef(null);
    const carWidth = 50;

    const turn = (dir) => {
        if (!isReady) {
            NotificationManager.error('Place the car first.');
            return false
        }
        api[dir]().then(response => {
            setPosition(response.data);
            setTransform(calculatePosition(response.data));
        });
    };

    const move = () => {
        if (!isReady) {
            NotificationManager.error('Place the car first.');
            return false
        }
        api.move().then(response => {
            setPosition(response.data);
            const pos = calculatePosition(response.data);

            setTransform(pos);
        });
    };

    const reset = () => {
        if (!isReady) {
            NotificationManager.error('Place the car first.');
            return false
        }
        api.reset().then(response => {
            setPosition({});
            setTransform({});
            setIsReady(false);
        });
    };

    const onDown = React.useCallback((e) => {
        switch (e.code) {
            case 'ArrowUp': 
                e.preventDefault();
                return move();
            case 'ArrowLeft': 
                e.preventDefault();
                return turn('left');
            case 'ArrowRight': 
                e.preventDefault();
                return turn('right');
            default: return;
        }
    }, [move, turn]);

    const onResize = React.useCallback((e) => {
        console.log(position);
        setTransform(calculatePosition(position));
    }, [position]);

    useEffect(() => {
        api.init().then(response => {
            if (response.data) {
                setPosition(response.data);
                setTransform(calculatePosition(response.data));
                setIsReady(true)
            }
            
        });
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onDown);
        window.addEventListener("resize", onResize);

        return () => {
            document.removeEventListener("keydown", onDown);
            window.removeEventListener("resize", onResize);
        }
    }, [onDown, onResize]);

    const calculatePosition = (pos) => {
        const newCarPosition = { ...transform};
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
            default: throw new Error('wrong direction');
        }

        const width = gridRef.current.getBoundingClientRect().width / 5;
        const height = gridRef.current.getBoundingClientRect().height / 5;

        newCarPosition.left = (width * (pos.x + 1)) - (width / 2) - carWidth / 2;
        newCarPosition.bottom = (height * (pos.y + 1)) - (height / 2) - carWidth / 2;

        return newCarPosition;
    }

    const place = (e) => {
        e.preventDefault();
        
        api.place({
            x: parseInt(e.target.x.value),
            y: parseInt(e.target.y.value),
            direction: e.target.direction.value,
        }).then(response => {
            setPosition(response.data);
            setTransform(calculatePosition(response.data));
            setIsReady(true)
        }).catch(err => {
            NotificationManager.error(err.response ? err.response.data.error : err.message);
        });

        return false;
    };

    return (
        <Container className="row justify-content-sm-center">
            <div className="col col-lg-6">
                <h2>{position.x}:{position.y} {position.direction}</h2>
                <GridWrapper>
                    <Grid innerRef={gridRef} />
                    <Car width={carWidth} transform={transform} />
                </GridWrapper>
            </div>
            <div className="controls col-sm-auto">
                <Form onSubmit={place} />
                <div className="btn-group" role="group">
                    <button disabled={! isReady} type="button" onClick={() => turn('left')} className="btn btn-primary">&#8592;</button>
                    <button disabled={! isReady} type="button" onClick={() => turn('right')} className="btn btn-primary">&#8594;</button>
                    <button disabled={!isReady} type="button" onClick={move} className="btn btn-primary">&#8593;</button>
                    <button disabled={! isReady} type="button" onClick={reset} className="btn btn-danger">Reset</button>
                </div>
            </div>
        </Container>
    );
};