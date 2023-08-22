
export interface User {
    createdAt: Date;
    name: string;
    id: number;
    avatar: string;
    email: string;
    username: string;
    departments: string
}


export interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
}
