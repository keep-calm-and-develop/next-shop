import { fetchJson } from "./api";

export interface Product {
    id: string;
    title: string;
    description: string;
}

interface BackendProduct {
    id: string;
    attributes: {
        title: string;
        description: string;
        picture: any;
        price: number;
    };
}

const CMS_URL = 'http://127.0.0.1:1337';

export const getProduct = async(id: string): Promise<Product> => {
    const { data }: { data: BackendProduct } = await fetchJson(`${CMS_URL}/api/products/${id}`);
    return stripProduct(data);
};

export const getProducts = async(): Promise<Product[]> => {
    const { data }: { data: BackendProduct[] } = await fetchJson(`${CMS_URL}/api/products`);
    return data.map(stripProduct);
};

function stripProduct(product: BackendProduct): Product {
    return {
        id: product.id,
        title: product.attributes.title,
        description: product.attributes.description,
    };
}