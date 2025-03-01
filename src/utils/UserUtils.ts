import { User } from "../models/user";
import { checkUserExists, createUser, deleteUser, getUser, updateUserById } from "../services/userService";
import { login, logout, updateUser, } from "../stateManagement/authSlice";

const ActualizarUsuario = async (
  userId: string,
  updates: User|null,
  dispatch: any
) => {
  console.log("🚀 ~ ActualizarUsuario ~ userId:", userId);
  if(updates === null) return false;
  try {
    const updatedUser = await updateUserById(userId, updates);
    if(updatedUser){
      dispatch(updateUser(updates));
      alert("Usuario actualizado correctamente");
    }else{
      alert("Error al actualizar usuario");
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

const ObtenerUsuario = async (userId: string, dispatch: any) => {
  try {
    const user = await getUser(userId);
    if(user !== null){
      dispatch(login(user));
    }
    return user
  } catch (error) {
    console.error("Error al obtener usuario:", error);
  }
};

const CrearUsuario = async (userData: User) => {
  //Cambiar para produccion
  if(await VerificarUsuarioExiste(userData.uid)){
    try {
      const newUser = await createUser(userData);
      console.log("🚀 ~ CrearUsuario ~ newUser:", newUser)
      if(newUser) alert("Usuario creado correctamente");
      return newUser
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  }
};

const EliminarUsuario = async (userId: string, dispatch: any) => {
  try {
    await deleteUser(userId);
    dispatch(logout());
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
};

const VerificarUsuarioExiste = async (userId: string) => {
  try {
    return await checkUserExists(userId);
  } catch (error) {
    console.error("Error al verificar existencia del usuario:", error);
    return false;
  }
};

const FormatDate = (dateString: string|Date) => {
  console.log("🚀 ~ FormatDate ~ dateString:", dateString)
  const date = new Date(dateString);
  console.log("🚀 ~ FormatDate ~ date:", date)
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'p. m.' : 'a. m.';
  const formattedTime = `${hours % 12}:${minutes}:${seconds} ${ampm}`;
  console.log("🚀 ~ FormatDate ~ ${day}/${month}/${year}, ${formattedTime}:", `${day}/${month}/${year}, ${formattedTime}`)
  return `${day}/${month}/${year}, ${formattedTime}`;
};

export {
  FormatDate,
  ActualizarUsuario,
  ObtenerUsuario,
  CrearUsuario,
  EliminarUsuario,
  VerificarUsuarioExiste,
};
