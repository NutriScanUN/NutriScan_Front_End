import { Button, Card, Col, ListGroup, Modal, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import { productOffRes } from "../models/Product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stateManagement/store";
import { addConsumeHistoryDBAndState } from "../utils/ConsumptionHistoryUtils";
import { infoToNutriments } from "../utils/ProductsUtils";
import { useState } from "react";

interface Props{
  show: boolean;
  productOff: productOffRes;
  handleClose: () => void;
}

const ProductInfo = ({show, productOff, handleClose}: Props) => {

  const uid = useSelector((state:RootState) => state.auth.user?.uid);
  const history = useSelector((state:RootState) => state.auth.historial_consumo);

  const dispatch = useDispatch<AppDispatch>();



  const possibleToasts = [
    "Producto añadido al historial de consumo",
    "Error al añadir producto al historial de consumo"
  ]
  const [toastRes, setToastRes] = useState(0);
  const [toastShow, setToastShow] = useState(false);

  const handleAddConsume = async () => {
    if(uid){
      let cantidad: number | undefined = undefined
      if(productOff.infoProducto.cantidad)
        cantidad = parseInt(productOff.infoProducto.cantidad);

      const res = await addConsumeHistoryDBAndState(uid, {
        id_producto:productOff.producto.referencia,
        cantidad_consumida: cantidad ?? 1,
        nutrientes_ingeridos: infoToNutriments(productOff.infoProducto) as Record<string, string>,
        activo: true,
        fecha_consumo: new Date().toISOString()
      }, history, dispatch);

      if(res?.success){
        setToastRes(0);
      }else{
        setToastRes(1);
      }

      setToastShow(true);
    }
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
        if(key === "cantidad"){

          const cantidad = parseFloat(value as string);
          if(isNaN(cantidad)) return null;

          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{parseFloat(value as string).toFixed(2).replace(/\.?0*$/, "")}</td>
              <td>{infoProductoLower[`unidad${key}`]}</td>
            </tr>
          );
        }
        else
        if(!key.startsWith("unidad") && key !== "imagenfrontalurl" && key !== "nivelesaltos" && value)
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{(value as number).toFixed(2).replace(/\.?0*$/, "")}</td>
              <td>{infoProductoLower[`unidad${key}`]}</td>
            </tr>
          );
      }
    )
  }

  const contructNutriscoreImgPath = (nutriscore?: string) => {
    if(nutriscore && nutriscore !== "unknown") return `/NutriscoreLogos/Nutri-score-${nutriscore.toUpperCase()}.svg`;
    else return "/NutriscoreLogos/nutriscore-unknown.svg";
  }

  return (
    <>
    <ToastContainer className="p-2 px-4 position-fixed" position="bottom-end">
      <Toast show={toastShow} onClose={() => setToastShow(false)} delay={3000} autohide bg={['success', 'danger'][toastRes]} className="text-white">
        <Toast.Header >
          <strong className="me-auto">Historial de consumo</strong>
        </Toast.Header>
        <Toast.Body>{possibleToasts[toastRes]}</Toast.Body>
      </Toast>
    </ToastContainer>
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
                {
                  uid &&
                  <ListGroup.Item>
                    <Button style={{width: "100%"}} variant="primary" onClick={handleAddConsume}>Agregar a consumo</Button>
                  </ListGroup.Item>
                }
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
    </>
    
  );
}

export default ProductInfo;
