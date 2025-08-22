export interface Product{
    id: number;
    
    title: string;
    content: string;
    price: number;

    url: string;
    location: string;

    category: Category;
    status: Status;

    authorNickname: string;

    createdAt: string;

    imageUrls: { id: number; url: string }[];

    likeCount: number;
    liked: boolean;
}



export type Category = "USED" | "GROUP";

export type Status = "IN_PROGRESS" | "COMPLETED";
