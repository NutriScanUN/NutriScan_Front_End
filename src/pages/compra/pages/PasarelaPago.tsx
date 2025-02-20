import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../stateManagement/authSlice";
import { Roles, User } from "../../perfil/models/user";

const PasarelaPago = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handlePurchase = () => {
      const usuario: Partial<User> = { rol: Roles.PAGADO }; // Actualiza el rol del usuario
      dispatch(updateUser(usuario));
      navigate("/compra/receive");
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 text-center" style={{ width: "300px" }}>
          <Card.Body>
            <Card.Title>Plan Tienda</Card.Title>
            <Card.Text>Precio: 40.000 COP</Card.Text>
            <Button variant="primary" onClick={handlePurchase}>
              Comprar
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
}

export default PasarelaPago

