import Celebrater from '../../components/Celebrater';
import { FsLink } from '../../utils/fs';
import stc from "../../assets/stc.png";
import Image from 'react-bootstrap/Image';

const Lorraine = () => {
    return (
        <>
            <h2>Merry Christmas Lorraine!</h2>
            <p>Click below to see what you got...</p>
            <div>
                <Celebrater>
                    <p>Gift voucher for the Sydney Theatre Company!</p>
                    <Image src={stc} fluid style={{maxHeight: "50vh"}} className="mx-auto" />
                </Celebrater>
            </div>
            <p><FsLink path="..">Back</FsLink></p>
        </>
    );
}

export default Lorraine;