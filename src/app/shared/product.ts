export interface Product {
        tags?: string[];
        name: string;
        img: string;
        price: number;
        description?: string;
        id: number;
        availableSizes?: {size: string, quantity: number}[]
}
