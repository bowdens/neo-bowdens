import Image from "react-bootstrap/Image";

import { FsLink } from "../utils/fs";

import extradimensional from '../assets/extradimensional.png';

const Projects = ({ setWd }) => {
    return (
        <>
            <h2>Projects</h2>
            <p>Here are a few projects I've worked on.</p>
            <div>
                <ul>
                    <li><FsLink path={"./extradimensional"} setWd={setWd}>Extradimension.al</FsLink></li>
                    <li><FsLink path={"./libtalaris"} setWd={setWd}>Libtalaris</FsLink></li>
                </ul>
            </div>
        </>
    );
};

const Project = ({ title, blurb, link, children, setWd }) => {
    return (
        <div>
            <h2>{title || "Untitled Project"}</h2>
            {blurb ?
                <p>{blurb}{link && <>. <a href={link}>Visit {title}</a></>}</p>
                : link && <p><a href={link} target="_blank" rel="noopener noreferrer">Visit {title}</a></p>
            }
            <article>
                {children}
            </article>
            <FsLink path={".."} setWd={setWd}>Back to Projects</FsLink>
        </div>
    )
}

export const Libtalaris = ({ setWd }) => {
    return (
        <Project
            title="Libtalaris"
            blurb="A C based framework for writing shell-like programs"
            link="https://github.com/bowdens/libtalaris"
            setWd={setWd}
        >
            Libtalaris is a C based framework for writing programs with a shell-like user interface.
        </Project>
    )
};

export const Extradimensional = ({ setWd }) => {
    return (
        <Project
            title="Extradimensional"
            blurb="An online bag of holding"
            link="https://extradimension.al"
            setWd={setWd}
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

export default Projects;