import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { api } from '../utils/api';
import { Button, Col } from 'react-bootstrap';

const formattingTypes = {
    "Medieval Soldier Names": ([first, last]) => <Row><Col>{first} {last}</Col></Row>,
    "Blue Creature": ([name, stats, _text]) => {
        const text = _text.replace(/~/g, name.split(",")[0]);
        const [_, cost, atk, def, types] = (stats && /^([^ ]*) - ([^ ]*) \/ ([^ ]*) : (.*)$/.exec(stats)) ||  [null, null, null, null, null] ;
        return (<>
            <Row>
                <Col className="fw-bold">{name}</Col>
                <Col xs="auto">{cost}</Col>
            </Row>
            <Row className="border-top border-bottom">
                <Col>{types}</Col>
            </Row>
            {text.split("\n").map(line => 
                <Row>
                    <Col style={{fontSize: "0.9em"}}>{line}</Col>
                </Row>
            )}
            <Row className="mb-3">
                <Col />
                <Col xs="auto">{atk}/{def}</Col>
            </Row>
        </>);
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
                        type="radio" key={i} label={`${degree.labels[i]}`} 
                        title={degree.descriptions[i]} checked={currentDegree === value} 
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
    const formattedPaths = components.map((c,i) => c.path.replace("{}", args[i]).replace("{}", quantity));
    const [results, setResults] = useState(components.map(_=>[]));
    return (
        <>
            <Row>
                <h4>{name}</h4>
                <p>{desc}</p>
            </Row>
            {components.map((c,i) => 
                <Component {...c} key={i} currentArgs={args[i]} quantity={quantity} setArgs={newArgs=>{
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
                    <Button onClick={()=>{
                        const allResults = formattedPaths.map(path => api.get(path));
                        Promise.all(allResults).then(newResults => {
                            console.log({newResults});
                            setResults(newResults.map(r => r.result));
                        })
                    }}>
                        Generate
                    </Button>
                </Col>
                <Col />
            </Row>
            <hr />
            <Row className="mb-3 bg-light">
                {results[0].map((_, i) => formattingTypes[name](results.map(r => r[i])))}
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
                : <p>{error}</p>
            }
        </>
    );
};

export default Markov;