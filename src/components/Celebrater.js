import { useState } from "react";
import { Button } from "react-bootstrap";
import ChristmasModal from "./ChristmasModal";

const Celebrater = ({title, children}) => {
    const [show, setShow] = useState(false);
    return (
    <>
        <Button className="christmas-button" onClick={()=>setShow(true)}>See what you got!</Button>
        <ChristmasModal title={title} show={show} onHide={()=>setShow(false)}>{children}</ChristmasModal>
    </>
    )
};

export default Celebrater;