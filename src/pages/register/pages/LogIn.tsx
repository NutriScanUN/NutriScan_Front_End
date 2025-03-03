import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { auth } from "../../../firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stateManagement/store";
import { ObtenerUsuario } from "../../../utils/UserUtils";
import { checkUserExists } from "../../../services/userService";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
import { GetHistorialBusqueda } from "../../../utils/SearchHistoryUtils";
import { getUserStore } from "../../../utils/TiendaUtils";

const LogIn = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(await checkUserExists(userCredential.user.uid)){
        console.log("Usuario autenticado:", userCredential.user);
        ObtenerUsuario(userCredential.user.uid,dispatch);
        GetHistorialBusqueda(userCredential.user.uid,dispatch);
        getUserStore(userCredential.user.uid, dispatch);
        navigate('/')
      }else{
        Alert(<p>No estas registrado.</p>)
        navigate('/signIn')
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error de autenticación. Verifica tus credenciales.");
    }
  
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-5 bg-dark-subtle rounded-4">
      <FloatingLabel
        controlId="email"
        label="Correo electronico"
        className="mb-3 border rounded"
      >
        <Form.Control type="email" placeholder="name@example.com" aria-label="Email" required/>
        <Form.Control.Feedback className="px-3 pb-1" type="invalid">El correo electronico es obligatorio</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="password"
        label="Password"
        className="mb-3 border rounded"
      >
        <Form.Control type="password" placeholder=".Password" aria-label="Password" required/>
        <Form.Control.Feedback className="px-3 pb-1" type="invalid">La contraseña es obligatoria</Form.Control.Feedback>
      </FloatingLabel>
      <Button type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default LogIn;
