import { Button, Card, Col, ListGroup, Modal, Row, Table } from "react-bootstrap";
import { productOffRes } from "../models/Product";

interface Props{
  show: boolean;
  productOff: productOffRes;
  handleClose: () => void;
}

const ProductInfo = ({show, productOff, handleClose}: Props) => {

  const handleAddConsume = () => {
  }

  const lowerize = (obj: any) =>
    Object.keys(obj).reduce<any>((acc, k) => {
      acc[k.toLowerCase()] = obj[k];
      return acc;
    }, {});

  const constructRows = () => {
    const infoProductoLower = lowerize(productOff.infoProducto);

    return Object.entries<number | string>(infoProductoLower).map(([key, value]) =>
      {
        if(key === "cantidad")
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{parseFloat(value as string).toFixed(2).replace(/\.?0*$/, "")}</td>
              <td>{infoProductoLower[`unidad${key}`]}</td>
            </tr>
          )
        else
        if(!key.startsWith("unidad") && key !== "imagenfrontalurl" && key !== "nivelesaltos" && value)
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{(value as number).toFixed(2).replace(/\.?0*$/, "")}</td>
              <td>{infoProductoLower[`unidad${key}`]}</td>
            </tr>
          )
      }
    )
  }

  const contructNutriscoreImgPath = (nutriscore?: string) => {
    if(nutriscore && nutriscore !== "unknown") return `/NutriscoreLogos/Nutri-score-${nutriscore.toUpperCase()}.svg`;
    else return "/NutriscoreLogos/nutriscore-unknown.svg";
  }

  return (
    
    <Modal show={show} onHide={handleClose} animation={false} size="xl">
        <Modal.Header closeButton className="text-bg-dark" closeVariant="white">
          <Modal.Title>{productOff.producto.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row md={1} lg={2} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="d-flex justify-content-center">
                  <img src={contructNutriscoreImgPath(productOff.producto.nutriscore)}></img>
                </Card.Title>
              </Card.Body>
              <Card.Img variant="bottom" src={productOff.producto.foto} className="bg-dark-subtle" style={{height: "57vh", objectFit: "contain"}}/>
            </Card>
          </Col>
          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button style={{width: "100%"}} variant="primary" onClick={handleAddConsume}>Agregar a consumo</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Nutrimentos</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                      </tr>
                      {constructRows()}
                    </thead>
                  </Table>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Body>
                    <Card.Title>Categorias</Card.Title>
                    <Card.Text>
                      {productOff.producto.categorias?.join(", ")}
                    </Card.Text>
                  </Card.Body>
                </ListGroup.Item>
                {productOff.infoProducto.nivelesAltos && productOff.infoProducto.nivelesAltos.length > 0 &&
                <ListGroup.Item>
                  <Card.Body>
                    <Card.Title>Niveles Altos</Card.Title>
                    <Card.Text>
                      {productOff.infoProducto.nivelesAltos?.join(", ")}
                    </Card.Text>
                  </Card.Body>
                </ListGroup.Item>
                }
              </ListGroup>
            </Card>
          </Col>
        </Row>
        </Modal.Body>
      </Modal>
  );
}

export default ProductInfo;
