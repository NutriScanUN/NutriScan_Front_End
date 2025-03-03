import { Tienda } from "../models/Tienda";
import { createTienda, getTienda, updateQueryTienda, UpdateTienda } from "../services/TiendaService";
import { AppDispatch } from "../stateManagement/store";
import { setTienda } from "../stateManagement/storeSlice";

export async function addStoreToUser(tienda: Tienda, dispatch: AppDispatch){  
  const resp = await createTienda(tienda);

  if(resp.success){
    dispatch(setTienda(tienda))
  }

  return resp;
}

export async function getUserStore(uid: string, dispatch: AppDispatch){
  const resp = await getTienda(uid);
  if(resp && resp.length > 0){
    dispatch(setTienda(resp[0]))
    return true;
  }
  return false;
}

export async function updateUserStore(id: number, tienda: Tienda, dispatch: AppDispatch){
  const auxTienda: UpdateTienda = {
    ...tienda, id_tienda: id
  };

  const resp = await updateQueryTienda(auxTienda);

  if(resp.success){
    dispatch(setTienda(auxTienda as Tienda));
  }

  return resp;
}

export async function deleteUserStore(_id: number, _dispatch: AppDispatch){
  alert("not implemented");
}
