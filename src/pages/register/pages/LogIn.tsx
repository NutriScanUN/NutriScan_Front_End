import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { signInWithEmailAndPassword } from "../../../services/userService";

const LogIn = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      console.log("🚀 ~ handleSubmit ~ userCredential:", userCredential)
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
        Registrarse
      </Button>
    </Form>
  );
};

export default LogIn;
