import { fetchJson } from "./api";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    pictureURL: string;
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

const CMS_URL = process.env.CMS_URL;

export const getProduct = async(id: string): Promise<Product> => {
    const { data }: { data: BackendProduct } = await fetchJson(`${CMS_URL}/api/products/${id}?populate=picture`);
    return stripProduct(data);
};

export const getProducts = async(): Promise<Product[]> => {
    const res = await fetchJson(`${CMS_URL}/api/products?populate=picture`);
    const { data }: { data: BackendProduct[] } = res;
    return data.map(stripProduct);
};

function stripProduct(product: BackendProduct): Product {
    return {
        id: product.id,
        title: product.attributes.title,
        description: product.attributes.description,
        price: product.attributes.price,
        pictureURL: `${CMS_URL}${product.attributes.picture.data.attributes.url}`,
    };
}