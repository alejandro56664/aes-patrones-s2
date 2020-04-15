import { Cotizable } from "./cotizable";
import { Cotizacion } from "./cotizacion";

export class SolicitudCotizacion {
  id: number;
  cantidad: number;
  fechaCreacion: Date;
  cotizable: Cotizable;
  cotizaciones: Cotizacion[];

}
