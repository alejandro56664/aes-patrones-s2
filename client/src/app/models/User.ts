export interface User {
    id: number;
    nombres: string;
    apellidos: string;
    celular: string;
    correo: string; 
    password: string;
    id_tipo_usuario: string;
    token: string;
    fecha_creacion: Date; 
    fecha_modificacion: Date
}