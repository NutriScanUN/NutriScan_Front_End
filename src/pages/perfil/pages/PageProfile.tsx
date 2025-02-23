import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { useDispatch, useSelector } from "react-redux";
import { ActualizarUsuario } from "../../../utils/UserUtils";
import { User } from "../../../models/user";

const ProfileForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState(user);
  const dispatch = useDispatch<AppDispatch>();

  const [isModified, setIsModified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [e.target.name]: e.target.value ?? ""
    }));
    setIsModified(true);
  };  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Perfil actualizado:", profile);
    const usuario = {
        uid: profile?.uid ?? '',
        name: profile?.name ?? '',
        email: profile?.email ?? '',
        fecha_nacimiento: profile?.fecha_nacimiento 
            ? profile.fecha_nacimiento.toString().split("T")[0] 
            : ""
    } as User;
    ActualizarUsuario(profile?.uid ?? '',usuario,dispatch)
    setIsModified(false);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <FloatingLabel controlId="name" label="Nombre Completo" className="mb-3">
        <Form.Control 
          type="text" 
          name="name" 
          value={profile?.name} 
          onChange={handleChange} 
          required 
        />
      </FloatingLabel>

      <FloatingLabel controlId="email" label="Correo Electrónico" className="mb-3">
        <Form.Control 
          type="email" 
          name="email" 
          value={profile?.email} 
          onChange={handleChange} 
          required 
        />
      </FloatingLabel>

      <FloatingLabel controlId="fecha_nacimiento" label="Fecha de Nacimiento" className="mb-3">
        <Form.Control 
          type="date" 
          name="fecha_nacimiento" 
          value={profile?.fecha_nacimiento ? profile.fecha_nacimiento.toString().split("T")[0] : ""}
          onChange={handleChange} 
          required 
        />
      </FloatingLabel>

      <Button type="submit" variant="primary" disabled={!isModified}>
        Guardar Cambios
      </Button>
    </Form>
  );
};

export default ProfileForm;
