export interface User {
    id: number;
    nombres: string;
    apellidos: string;
    correo: string; 
    password: string;
    tipo_usuario: string;
    token: string;
    fecha_creacion: Date; 
    fecha_modificacion: Date
}