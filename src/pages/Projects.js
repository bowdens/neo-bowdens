import Image from "react-bootstrap/Image";

import { FsLink } from "../utils/fs";

import extradimensional from '../assets/extradimensional.png';

const Projects = () => {
    return (
        <>
            <h2>Projects</h2>
            <p>Here are a few projects I've worked on.</p>
            <div>
                <ul>
                    <li><FsLink path="./extradimensional">Extradimension.al</FsLink></li>
                    <li><FsLink path="./libtalaris">Libtalaris</FsLink></li>
                    <li><FsLink path="./react-terminal">react-terminal</FsLink></li>
                </ul>
            </div>
        </>
    );
};

const Project = ({ title, blurb, link, children }) => {
    return (
        <div>
            <h2>{title || "Untitled Project"}</h2>
            {blurb ?
                <p className="text-muted">{blurb}{link && <>. <a href={link} target="_blank" rel="noopener noreferrer">Visit {title}</a></>}</p>
                : link && <p className="text-muted"><a href={link} target="_blank" rel="noopener noreferrer">Visit {title}</a></p>
            }
            <article>
                {children}
            </article>
            <FsLink path={".."}>Back to Projects</FsLink>
        </div>
    )
}

export const Libtalaris = () => {
    return (
        <Project
            title="Libtalaris"
            blurb="A C based framework for writing shell-like programs"
            link="https://github.com/bowdens/libtalaris"
        >
            Libtalaris is a C based framework for writing programs with a shell-like user interface.
        </Project>
    )
};

export const Extradimensional = () => {
    return (
        <Project
            title="Extradimensional"
            blurb="An online bag of holding"
            link="https://extradimension.al/?ref=neobowdens"
        >
            <Image src={extradimensional} alt="extradimensional" fluid />
            <p>Extradimensional is an online bag of holding for RPG players to replace pen and paper.</p>
            <p>
                It aims to replace the old-fashioned method of assigning 1 person the responsibility of tracking what's in the bag
                on pen and paper with a website where the bag updates live for all players whenever anything is added or altered.
            </p>
            <p>If you go to the link above you can try it out! There's no account required :)</p>
        </Project>
    )
};


export const ReactTerimnal = () => {
    return (
        <Project
            title="react-terminal"
            blurb="A novelty terminal for react"
            link="https://github.com/bowdens/react-terminal"
        >
            <p>
                <code>react-terminal</code> is a novelty terminal component for react.
                You provide the programs and the logic for them and it'll execute them for your users
            </p>
            <p>Programs are passed as a prop to the component in the form <code>{"{ programName: [programName, ...args] => \"output text\", }"}</code></p>
            <p>The terminal on the left is an example of this component! It's been designed to vaugely replicate a UNIX-like filesystem using ls and cd to navigate.</p>
            <p>This project was built for the personal project competition for CSESoc.</p>
            <p>Feel free to use it for your own react projects! use <code>npm install @bowdens/react-terminal</code> and check out the documentation/example from the link above. If you do use it, let me know!</p>
        </Project>
    )
};


export default Projects;