import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const SignIn = () => {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
