export interface Product{
    id: number;

    images: string[];
    
    title: string;
    content: string;
    price: number;

    url: string;
    location: string;

    category: Category;
    status: Status;

    liked: boolean;
    likeCount: number;

    seller:{
        sellerId: number;
        sellerName: string;
    }
}

export type Category = 'USED' | 'GROUP';

export type Status = 'IN_PROGRESS' | 'COMPLETED';
