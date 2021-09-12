import { useState } from "react";
import Alert from "react-bootstrap/Alert";

import { FsLink } from "../utils/fs";

const Home = ({ setWd }) => {
    const [showCollapse, setShowCollapse] = useState(false);
    return (
        <>
            <h2>Hi There!</h2>
            <p>This is <FsLink path="about" setWd={setWd}>Tom Bowden's</FsLink> site.</p>
            <p>Some projects I've worked on are <FsLink path="projects" setWd={setWd}>here</FsLink>.</p>
            <p>Try using the terminal on the left! I built it for the CSESoc competition. You can use it too!</p>
            <Alert variant="primary">Install <a href={"https://www.npmjs.com/package/@bowdens/react-terminal"} target="_blank" rel="noopener noreferrer">react-terminal</a>: <br /> <code>npm install @bowdens/react-terminal</code></Alert>
            <p>
                <button className="btn btn-link" onClick={() => { setShowCollapse(!showCollapse) }} >
                    Need a hint for how to work the terminal?
                </button>
            </p>
            <div style={!showCollapse ? { display: "none" } : {}}>
                <p>If you're familiar with how to navigate around in a UNIX-like terminal then you should be good.</p>
                <p>Use <code>ls</code> to list the files (web pages), and <code>cd [TARGET]</code> to view it.</p>
                <p>Use <code>cd ..</code> to return to the parent directory, and <code>pwd</code> to show where you're at.</p>
                <p>Also by the way (most) of the bash control keys work!</p>
            </div>
        </>
    );
}

export default Home;