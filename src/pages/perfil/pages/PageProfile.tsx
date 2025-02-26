import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../stateManagement/store";
import { useDispatch, useSelector } from "react-redux";
import { ActualizarUsuario, FormatDate } from "../../../utils/UserUtils";
import { User } from "../../../models/user";

const ProfileForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("🚀 ~ ProfileForm ~ user:", user)
  const [profile, setProfile] = useState(user);
  const dispatch = useDispatch<AppDispatch>();

  const [isModified, setIsModified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: name === "fecha_nacimiento" ? FormatDate(value) : value
    }));
    setIsModified(true);
  };  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Perfil actualizado:", profile);
    const usuario = {
        uid: profile?.uid ?? '',
        nombres: profile?.nombres ?? '',
        email: profile?.email ?? '',
        fecha_nacimiento: profile?.fecha_nacimiento 
            ? FormatDate(profile.fecha_nacimiento) 
            : ""
    } as User;
    ActualizarUsuario(profile?.uid ?? '',usuario,dispatch)
    setIsModified(false);
  };
  
  const parseDate = (dateString: string|Date) => {
    const [day, month, year] = dateString.toString().split(",")[0].split("/");
    return `${year}-${month}-${day}`;
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <FloatingLabel controlId="name" label="Nombre Completo" className="mb-3">
        <Form.Control 
          type="text" 
          name="name" 
          value={profile?.nombres} 
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
          value={profile?.fecha_nacimiento ? parseDate(profile.fecha_nacimiento) : ""}
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
