import { NextApiHandler } from 'next'
import { fetchJson } from "../../lib/api";
import { BackendProduct } from '../../lib/products';

const CMS_URL = process.env.CMS_URL;

export interface CartItem {
    id: number;
    product: {
        title: string;
        id: number;
        price: number;
    };
    quantity: number;
    total: number;
}

interface BackendCartItem {
    id: number;
    attributes: {
        quantity: number;
        product: { data: BackendProduct };
    };
}

const handleGetCarts: NextApiHandler = async (req, res) => {
    const { jwt } = req.cookies;
    if (!jwt) {
        res.status(401).end();
        return;
    }
    try {
        const { data } = await fetchJson(`${CMS_URL}/api/cart-items?populate=product`, {
            headers: { 'Authorization': `Bearer ${jwt}` },
        });
        res.status(200).json(data.map(stripCartItem));
    } catch (error) {
        res.status(401).end();
    }
};

function stripCartItem(cartItem: BackendCartItem): CartItem {
    return {
        id: cartItem.id,
        quantity: cartItem.attributes.quantity,
        product: {
            id: cartItem.attributes?.product?.data?.id,
            title: cartItem.attributes?.product?.data?.attributes?.title,
            price: cartItem.attributes?.product?.data?.attributes?.price,
        },
        total: cartItem.attributes.quantity * cartItem.attributes?.product?.data?.attributes?.price,
    };
}

export default handleGetCarts;
