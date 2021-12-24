import Celebrater from '../../components/Celebrater';
import { FsLink } from '../../utils/fs';
import ppa from "../../assets/ppa.jpeg";
import Image from 'react-bootstrap/Image';

const Luke = () => {
    return (
        <>
            <h2>Merry Christmas Luke!</h2>
            <p>Click below to see what you got...</p>
            <div>
                <Celebrater title="Beer Time!">
                    <p>You got some pacific ales!*</p>
                    <Image src={ppa} fluid style={{maxHeight: "50vh"}} className="mx-auto" />
                    <p>*pending purchase</p>
                </Celebrater>
            </div>
            <p><FsLink path="..">Back</FsLink></p>
        </>
    );
}

export default Luke;