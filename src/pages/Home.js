import { useState } from "react";
import { FsLink } from "../utils/fs";

const Home = ({ setWd }) => {
    const [showCollapse, setShowCollapse] = useState(false);
    return (
        <>
            <h2>Hi There!</h2>
            <p>This is <FsLink path="about" setWd={setWd}>Tom Bowden's</FsLink> site.</p>
            <p>Some projects I've worked on are <FsLink path="projects" setWd={setWd}>here</FsLink>.</p>
            <p>Try using the terminal below! Its the whole gimmick I built this site around after all...</p>
            <p>
                <button className="btn btn-link" onClick={() => { setShowCollapse(!showCollapse) }} >
                    Need a hint for how to work the terminal?
                </button>
            </p>
            <p style={!showCollapse ? { display: "none" } : {}}>
                If you're familiar with how to navigate around in a UNIX-like terminal then you should be good.
                Use <code>ls</code> to list the files (web pages), and <code>cd [TARGET]</code> to view it.
                Use <code>cd ..</code> to return to the parent directory, and <code>pwd</code> to show where you're at.
            </p>
        </>
    );
}

export default Home;