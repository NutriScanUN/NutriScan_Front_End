import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    name: string;
    email: string;
    fecha_nacimiento: Date|string;
    photoURL?: string;
  }
  