export class Usuario {
    id: number;
    nome: string;
    email: string;
    password_hash: string;
    admin: boolean;
    deleted: boolean;
    token?: string;
}