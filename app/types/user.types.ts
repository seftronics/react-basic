
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Props {
    userId?: number;
}

export interface State {
    user: User | null;
    loading: boolean;
}