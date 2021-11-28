import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";

import { FsLink } from "../utils/fs";

const Home = () => {
    const [showCollapse, setShowCollapse] = useState(false);
    const collapse = useRef(null);
    useEffect(() => {
        if(showCollapse) {
            collapse.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [showCollapse]);
    return (
        <>
            <h2>Hi There!</h2>
            <p>This is <FsLink path="about">Tom Bowden's</FsLink> site.</p>
            <p>Some projects I've worked on are <FsLink path="projects">here</FsLink>.</p>
            <p>Try using the terminal on the left! I built it for the CSESoc competition. You can use it too!</p>
            <Alert variant="primary">
                Install <a href={"https://www.npmjs.com/package/@bowdens/react-terminal"} target="_blank" rel="noopener noreferrer">react-terminal</a>: 
                <code className="terminal">npm install @bowdens/react-terminal</code>
            </Alert>
            <p>
                <button className="btn btn-link" onClick={() => { 
                    setShowCollapse(!showCollapse);
                    console.log({collapse, scrollIntoView: collapse.current?.scrollIntoView});
                }} >
                    Need a hint for how to work the terminal?
                </button>
            </p>
            <div style={!showCollapse ? { display: "none" } : {}} ref={collapse}>
                <p>If you're familiar with how to navigate around in a UNIX-like terminal then you should be good.</p>
                <p>Use <code className="terminal">ls</code> to list the files (web pages), and <code className="terminal">cd [TARGET]</code> to view it.</p>
                <p>Use <code className="terminal">cd ..</code> to return to the parent directory, and <code className="terminal">pwd</code> to show where you're at.</p>
                <p>Also by the way (most) of the bash control keys work, including tab completion!</p>
            </div>
        </>
    );
}

export default Home;