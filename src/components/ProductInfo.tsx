import { Modal } from "react-bootstrap";
import { productOffRes } from "../models/Product";

interface Props{
  show: boolean;
  productOff: productOffRes;
  handleClose: () => void;
}

const ProductInfo = ({show, productOff, handleClose}: Props) => {
  return (
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productOff.producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(productOff.infoProducto)}</Modal.Body>
      </Modal>
  );
}

export default ProductInfo;
