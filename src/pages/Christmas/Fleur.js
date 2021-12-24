import Celebrater from '../../components/Celebrater';
import { FsLink } from '../../utils/fs';
import ordinary from "../../assets/ordinary.png";
import Image from 'react-bootstrap/Image';

const Fleur = () => {
    return (
        <>
            <h2>Merry Christmas Fleur!</h2>
            <p>Click below to see what you got...</p>
            <div>
                <Celebrater>
                    <p>Skincare routine starter kit!*</p>
                    <Image src={ordinary} fluid style={{maxHeight: "50vh"}} className="mx-auto" />
                    <p>*want to confirm with you before purchasing</p>
                </Celebrater>
            </div>
            <p><FsLink path="..">Back</FsLink></p>
        </>
    );
}

export default Fleur;