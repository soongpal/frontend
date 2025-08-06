export interface Product{
    id: number;
    title: string;
    description: string;
    price: number;
    createdAt: string;

    sellerId: number;
    sellerNickname: string;

    status: Status;

    likeCount: number;
    liked: boolean;

    chatCount: number;

    images: string[];

    category: Category;

    location: string;

    link?: string;

}

export type Status = 'ON_SALE' | 'SOLD_OUT';

export type Category = 'USED_TRADE' | 'GROUP_PURCHASE';