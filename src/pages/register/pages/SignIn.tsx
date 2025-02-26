import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Roles, User } from "../../../models/user";
import { CrearUsuario } from "../../../utils/UserUtils";

const SignIn = () => {

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const nombres = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const fechaNacimiento = form.birthdate.value;

    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Formatear datos para Firestore
      const userData = {
        uid: user?.uid ?? '',
        nombres: nombres ?? '',
        email: email ?? '',
        fecha_nacimiento: new Date(fechaNacimiento),
        rol: Roles.ESTANDAR,
      } as User;

      if(await CrearUsuario(userData)){
        navigate("/login");
      }else{
        alert("Error al crear usuario");
      }
    } catch (error: any) {
      console.error("Error en el registro:", error.message);
      alert(`Error: ${error.message}`);
    }
  };  


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-5 bg-dark-subtle rounded-4">
      <FloatingLabel
        controlId="username"
        label="Nombre de usuario"
        className="mb-3 border rounded"
      >
        <Form.Control placeholder="Nombre de usuario" aria-label="Nombre de usuario" required/>
        <Form.Control.Feedback className="px-3 pb-1" type="invalid">El nombre de usuario es obligatorio</Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel
        controlId="birthdate"
        label="Fecha de nacimiento"
        className="mb-3 border rounded"
      >
        <Form.Control type="date" placeholder="Fecha de nacimiento" aria-label="Fecha de nacimiento" required/>
        <Form.Control.Feedback className="px-3 pb-1" type="invalid">La fecha de nacimiento es obligatoria</Form.Control.Feedback>
      </FloatingLabel>
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
        Registrarse
      </Button>
    </Form>
  );
};

export default SignIn;
