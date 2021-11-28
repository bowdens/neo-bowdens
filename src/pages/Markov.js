import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import { api } from '../utils/api';

const formattingTypes = {
    "Medieval Soldier Names": ([first, last], key) => <Row key={key}><Col>{first} {last}</Col></Row>,
    "MLB Player Names": ([first, last], key) => <Row key={key}><Col>{first} {last}</Col></Row>,
    "Blue Creature": ([name, stats, _text], key) => {
        const text = _text.replace(/~/g, name.split(",")[0]);
        const [, cost, atk, def, types] = (stats && /^([^ ]*) - ([^ ]*) \/ ([^ ]*) : (.*)$/.exec(stats)) || [null, null, null, null, null];
        return (<React.Fragment key={key}>
            <Row>
                <Col className="fw-bold">{name}</Col>
                <Col xs="auto">{cost}</Col>
            </Row>
            <Row className="border-top border-bottom">
                <Col>{types}</Col>
            </Row>
            {text.split("\n").map(line =>
                <Row>
                    <Col style={{ fontSize: "0.9em" }}>{line}</Col>
                </Row>
            )}
            <Row className="mb-3">
                <Col />
                <Col xs="auto">{atk}/{def}</Col>
            </Row>
        </React.Fragment>);
    }
};

const Component = ({ name, path, args, currentArgs, setArgs, quantity }) => {
    const [degree] = args;
    const currentDegree = currentArgs;
    return (
        <Row>
            <h5>{name}</h5>
            <Form>
                {degree.values.map((value, i) =>
                    <Form.Check
                        type="radio" key={i} label={<div>
                            <span className="align-middle">{degree.labels[i]}</span>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{degree.descriptions[i]}</Tooltip>}>
                                <InfoIcon className="ms-1" fontSize="sm" />
                            </OverlayTrigger>
                        </div>}
                        checked={currentDegree === value}
                        onChange={e => {
                            if (e.target.value) {
                                setArgs(value);
                            }
                        }}
                        inline
                    />
                )}
            </Form>
        </Row>
    );
};

const Generator = ({ name, desc, components }) => {
    //const [quantity, setQuantity] = useState(20);
    const quantity = 1;
    const [args, setArgs] = useState(components.map(component => component.args[0].values[0]));
    const formattedPaths = components.map((c, i) => c.path.replace("{}", args[i]).replace("{}", quantity));
    const [results, setResults] = useState(components.map(_ => []));
    const [error, setError] = useState(null);
    return (
        <>
            <Row>
                <h4>{name}</h4>
                <p>{desc}</p>
            </Row>
            {components.map((c, i) =>
                <Component {...c} key={i} currentArgs={args[i]} quantity={quantity} setArgs={newArgs => {
                    const _newArgs = [...args];
                    _newArgs[i] = newArgs;
                    setArgs(_newArgs);
                }} />
            )}
            <Row className="my-2">
                {/*
                <Col>
                    <Form.Control type="number" onChange={e=>setQuantity(e.target.value)} value={quantity} />
                </Col>

                */}
                <Col />
                <Col xs="auto">
                    <Button onClick={() => {
                        const allResults = formattedPaths.map(path => api.get(path));
                        setError(null);
                        Promise.all(allResults).then(newResults => {
                            setResults(newResults.map(r => r.result));
                        }).catch(err => {
                            setResults([]);
                            setError(err.toString());
                        });
                    }}>
                        Generate
                    </Button>
                </Col>
                <Col />
            </Row>
            <hr />
            <Row className="mb-3 bg-light">
                {error 
                ? <pre>Error executing model: {error}</pre>
                : results[0].map((_, i) => {
                    if (formattingTypes[name]) {
                        return formattingTypes[name](results.map(r => r[i]), i);
                    }
                    return results.map(r => r[i]).join(" ");
                })}
            </Row>
            <hr />
        </>
    )
};

const Markov = () => {
    const [descriptors, setDescriptors] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        api.descriptors()
            .then(res => setDescriptors(res))
            .catch(err => setError(err.toString()));
    }, []);
    return (
        <>
            <Row>
                <h2>Name Generators</h2>
                <p>Below are some generators that create various things.</p>
                <p>It uses markov chains of various degrees to generate the text.</p>
                <hr />
            </Row>
            {error === null
                ? descriptors !== null
                    ? descriptors.map(d => <Generator {...d} key={d.name} />)
                    : <p>Loading...</p>
                : <p>Failed to load markov models: <pre>{error}</pre></p>
            }
        </>
    );
};

export default Markov;