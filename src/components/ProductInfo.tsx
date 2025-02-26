import { Card, Col, Modal, Row, Table } from "react-bootstrap";
import { productOffRes } from "../models/Product";

interface Props{
  show: boolean;
  productOff: productOffRes;
  handleClose: () => void;
}

const ProductInfo = ({show, productOff, handleClose}: Props) => {

  const lowerize = (obj: any) =>
    Object.keys(obj).reduce<any>((acc, k) => {
      acc[k.toLowerCase()] = obj[k];
      return acc;
    }, {});

  const constructRows = () => {
    const infoProductoLower = lowerize(productOff.infoProducto);

    return Object.entries<number | string>(infoProductoLower).map(([key, value]) =>
      {
        if(!key.startsWith("unidad") && key !== "imagenfrontalurl" && key !== "nivelesaltos" && value)
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
              <td>{infoProductoLower[`unidad${key}`]}</td>
            </tr>
          )
      }
    )
  }

  return (
    
    <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{productOff.producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row md={1} lg={2} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Nutriscore: {productOff.producto.nutriscore?.toUpperCase()}</Card.Title>
              </Card.Body>
              <Card.Img variant="bottom" src={productOff.producto.foto} />
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nutrimentos</th>
                      <th>Cantidad</th>
                      <th>Unidad</th>
                    </tr>
                    {constructRows()}
                  </thead>
                </Table>
              </Card.Body>
              <Card.Body>
                <Card.Title>Categorias</Card.Title>
                <Card.Text>
                  {productOff.producto.categorias?.join(", ")}
                </Card.Text>
              </Card.Body>
              {productOff.infoProducto.nivelesAltos && productOff.infoProducto.nivelesAltos.length > 0 &&
              <Card.Body>
                <Card.Title>Niveles Altos</Card.Title>
                <Card.Text>
                  {productOff.infoProducto.nivelesAltos?.join(", ")}
                </Card.Text>
              </Card.Body>
              }
            </Card>
          </Col>
        </Row>
        </Modal.Body>
      </Modal>
  );
}

export default ProductInfo;
