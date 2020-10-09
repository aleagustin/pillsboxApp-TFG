import { Posologia } from './posologia';

export class MedicationUser {
    constructor(
        public id: number,
        public pillsboxId: number = null,
        public nombreComercial: String = "",
        public principioActivo: String = "",
        public fechaInicio:Date = new Date(),
        public fechaFin: Date = new Date(),
        public ultimaToma: Date = null,
        public proxNotificacion: Date = null,
        public tomas: Posologia [] = []
    ) {}
}