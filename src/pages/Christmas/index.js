import { FsLink } from '../../utils/fs';

const Christmas = () => {
    return (
        <>
            <h2>Merry Christmas!</h2>
            <p>
                If you've reached this page it's because it's Christmas day and you might have received a present from me!
            </p>
            <p>If your name is listed below that means you got a gift! Click your name to check it out!</p>
            <div>
                <ul>
                    <li><FsLink path="./luke">Luke</FsLink></li>
                    <li><FsLink path="./lorraine">Lorraine</FsLink></li>
                    <li><FsLink path="./daniel">Daniel</FsLink></li>
                    <li><FsLink path="./fleur">Fleur</FsLink></li>
                </ul>
            </div>
        </>
    );
}

export default Christmas;