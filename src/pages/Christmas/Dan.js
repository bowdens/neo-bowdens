import Celebrater from '../../components/Celebrater';
import { FsLink } from '../../utils/fs';
import lego from "../../assets/lego.jpeg";
import Image from 'react-bootstrap/Image';

const Dan = () => {
    return (
        <>
            <h2>Merry Christmas Dan!</h2>
            <p>Click below to see what you got...</p>
            <div>
                <Celebrater>
                    <p>$100 lego gift card!*</p>
                    <Image src={lego} fluid style={{maxHeight: "50vh"}} className="mx-auto" />
                    <p>*digit gift cards aren't available in Australia, so take a bank transfer instead</p>
                </Celebrater>
            </div>
            <p><FsLink path="..">Back</FsLink></p>
        </>
    );
}

export default Dan;