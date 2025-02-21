// import axios from "axios";

import { DATOUSERTEST, User } from "../pages/perfil/models/user";

const API_BASE_URL = process.env.BASE_URL_USER_MS;

export const createUser = async (userData: User) => {
    console.log("🚀 ~ API_BASE_URL:", API_BASE_URL)
    try {
        // const response = await axios.post(API_BASE_URL, userData);
        // return response.data;
        return userData as User
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
};

export const getUser = async (uid: string) => {
    try {
        // const response = await axios.get(`${API_BASE_URL}/${uid}`);
        // return response.data;
        DATOUSERTEST.uid = uid
        return DATOUSERTEST
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
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
