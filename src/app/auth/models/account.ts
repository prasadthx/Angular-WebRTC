export class Account {
    id: string;
    defaultName: string;
    firstName: string;
    lastName: string;
    email: string;
    jwtToken?: string;
    meetings:{};
    createdAt: Date;
}