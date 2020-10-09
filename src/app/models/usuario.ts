export class Usuario {
    constructor(
        public id: number = null,
        public email: string = '',
        public contrasena: string = '',
        public nombre: string = '',
        public apellido: string = '',
        public fechaNacimiento: Date = null,
        public notificaciones: boolean = false,
        public accessToken: string = ''
    ) {}
}