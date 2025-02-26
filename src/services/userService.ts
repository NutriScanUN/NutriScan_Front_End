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
                    "url_imagen": `${userData?.photoURL ?? ''}`
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
            "query": "query Query($userQueryId: ID!) {\n  userQuery(id: $userQueryId) {\n    data {\n      url_imagen\n      uid\n      nombres\n      fecha_nacimiento\n      email\n    }\n  }\n}\n",
            "variables": {
                "userQueryId": `${uid}`
            },
            "operationName": "Query"
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

        console.log("result", result);
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

export const updateUserById = async (uid: string, updates: object) => {
    try {
        // const response = await axios.put(`${API_BASE_URL}/${uid}`, updates);
        // return response.data;
        console.log("🚀 ~ updateUser ~ uid:", uid)
        console.log("🚀 ~ updateUser ~ updates:", updates)
        return true
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
