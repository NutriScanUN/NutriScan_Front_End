import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Roles, User } from "../../../models/user";
import { ActualizarUsuario } from "../../../utils/UserUtils";
import { RootState } from "../../../stateManagement/store";

const PasarelaPago = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePurchase = () => {
    const usuario: User = {...user} as User
    usuario.rol = Roles.PAGADO; // Actualiza el rol del usuario
    ActualizarUsuario(usuario.uid,usuario,dispatch)
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

