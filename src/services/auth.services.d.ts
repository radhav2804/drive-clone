import type { RegisterInput, LoginInput } from '../schemes/auth.schema';
export declare class AuthService {
    static register(data: RegisterInput): Promise<{
        user: {
            name: string;
            email: string;
            password: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    static login(data: LoginInput): Promise<{
        user: {
            name: string;
            email: string;
            password: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.services.d.ts.map