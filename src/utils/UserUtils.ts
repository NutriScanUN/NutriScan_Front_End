import { User } from "../models/user";
import { checkUserExists, createUser, deleteUser, getUser, updateUserById } from "../services/userService";
import { login, logout, updateUser, } from "../stateManagement/authSlice";

const ActualizarUsuario = async (
  userId: string,
  updates: Partial<User>,
  dispatch: any
) => {
  console.log("🚀 ~ ActualizarUsuario ~ userId:", userId);
  try {
    const updatedUser = await updateUserById(userId, updates);
    console.log("🚀 ~ updatedUser:", updatedUser)
    dispatch(updateUser(updates));
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
  }
};

const ObtenerUsuario = async (userId: string, dispatch: any) => {
  try {
    const user = await getUser(userId);
    console.log("🚀 ~ ObtenerUsuario ~ user:", user)
    dispatch(login(user));
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
      return true
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

export {
  ActualizarUsuario,
  ObtenerUsuario,
  CrearUsuario,
  EliminarUsuario,
  VerificarUsuarioExiste,
};
