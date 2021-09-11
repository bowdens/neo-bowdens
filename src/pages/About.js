import { FsLink } from '../utils/fs';

const About = ({ setWd }) => {
    return (
        <>
            <h2>About Me</h2>
            <p>
                My name is Tom Bowden.
                I'm a software engineer at <a href="https://evidentli.com" target="_blank" rel="noopener noreferrer">Evidentli</a>.
            </p>
            <p>I'm currently in my final year of a computer science degree at UNSW.</p>
            <p>Things I like include:</p>
            <div>
                <ul>
                    <li>Web Development</li>
                    <li>Dungeons &amp; Dragons</li>
                    <li><FsLink path="../projects/extradimensional" setWd={setWd}>Combining the two</FsLink></li>
                </ul>
            </div>
            <p>My links:  {' '}
                <a href="https://github.com/bowdens" target="_blank" rel="noopener noreferrer">Github</a>, {' '}
                <a href="https://www.linkedin.com/in/t-bowden/" target="_blank" rel="noopener noreferrer">LinkedIn</a> {' '}
            </p>
        </>
    );
}

export default About;