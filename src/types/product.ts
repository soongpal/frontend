export interface Product{
    id: number;

    images: { id: number; url: string }[];
    
    title: string;
    content: string;
    price: number;

    url: string;
    location: string;

    category: Category;
    status: Status;

    liked: boolean;
    likeCount: number;
}



export type Category = "USED" | "GROUP";

export type Status = "IN_PROGRESS" | "COMPLETED";
