import { Roles, User } from "../models/user";

export const createUser = async (userData: User) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": "mutation Mutation($input: CreateUserInput!) {\r\n  createUser(input: $input) {\r\n    success\r\n  }\r\n}",
            "operationName": "Mutation",        
            "variables": {
                "input": {
                    "uid": `${userData.uid}`,
                    "nombres": `${userData.nombres}`,
                    "email": `${userData.email}`,
                    "fecha_nacimiento": `${userData.fecha_nacimiento}`,
                    "fecha_registro": `${userData?.fecha_registro ?? new Date()}`,
                    "rol": `${userData?.rol ?? Roles.ESTANDAR}`,
                    "url_imagen": `${userData?.url_imagen ?? ''}`
                }
            },
        });
        console.log("🚀 ~ createUser ~ raw:", raw)

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions)
        const result = await response.json()  // 👈 Parseamos JSON en lugar de .text(
        if(result.data.createUser.success){
            console.log("result",result.data.createUser.success);
            return true
        }
        return false
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
};

export const getUser = async (uid: string): Promise<User|null> => {
    console.log("🚀 ~ getUser ~ uid:", uid)
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": "query UserQuery($userQueryId: ID!) {\r\n  userQuery(id: $userQueryId) {\r\n    success\r\n    data {\r\n      uid\r\n      nombres\r\n      email\r\n      url_imagen\r\n      fecha_registro\r\n      fecha_nacimiento\r\n      rol\r\n    }\r\n  }\r\n}",
            "variables": {
                "userQueryId": uid
            },
            "operationName": "UserQuery"
        });

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions);
        const result = await response.json();

        if (result?.data?.userQuery?.data?.fecha_nacimiento?._seconds) {
            result.data.userQuery.data.fecha_nacimiento = new Date(
                result.data.userQuery.data.fecha_nacimiento._seconds * 1000
            ).toISOString();
        }
        if (result?.data?.userQuery?.data?.fecha_registro?._seconds) {
            result.data.userQuery.data.fecha_registro = new Date(
                result.data.userQuery.data.fecha_registro._seconds * 1000
            ).toISOString();
        }

        console.log("result user", result);
        return result.data.userQuery.data as User;
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return null;
    }
};

export const checkUserExists = async (uid: string) => {
    try {
        // const response = await axios.get(`${API_BASE_URL}/${uid}/exists`);
        // return response.data;
        
        console.log("🚀 ~ checkUserExists ~ uid:", uid)
        return true
    } catch (error) {
        console.error("Error al verificar existencia de usuario:", error);
        throw error;
    }
};

export const updateUserById = async (uid: string, updates: User) => {
    console.log("🚀 ~ updateUserById ~ updates:", updates)
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": "mutation UpdateUser($input: CreateUserInput!) {\r\n  updateUser(input: $input) {\r\n    success\r\n    message\r\n    code\r\n  }\r\n}",
            "variables": {
                "input": {
                    "uid": uid,
                    "nombres": updates.nombres,
                    "email": updates.email,
                    "url_imagen": updates.url_imagen, 
                    "fecha_registro": updates.fecha_registro,
                    "fecha_nacimiento": updates.fecha_nacimiento,
                    "rol": updates.rol
                }
            },
            "operationName": "UpdateUser"
        });

        const requestOptions: RequestInit  = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://34.2.5.32:3003/", requestOptions);
        console.log("🚀 ~ updateUserById ~ requestOptions:", requestOptions)
        const result = await response.json();
        console.log("🚀 ~ updateUserById ~ result:", result)
        
        return result?.data?.updateUser?.success ?? false;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
    }
};

export const deleteUser = async (uid: string) => {
    console.log("🚀 ~ deleteUser ~ uid:", uid)
    try {
        // await axios.delete(`${API_BASE_URL}/${uid}`);
        return true
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
};
