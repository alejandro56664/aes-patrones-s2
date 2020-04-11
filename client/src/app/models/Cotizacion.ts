import { User } from "./User";
import { Product } from "./Product";

export interface Cotizacion {
    id: number;
    product: Product;
    user: User;
    fecha_creacion: Date
    fecha_modificacion: Date
}