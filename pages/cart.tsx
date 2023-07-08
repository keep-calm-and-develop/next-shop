import React from 'react'
import Page from '../components/Page';
import { fetchJson } from '../lib/api';
import { useQuery } from 'react-query';
import { CartItem } from './api/cart';
import { CartTable } from '../components/CartTable';

interface CartPageProps {
}

const CartPage: React.FC<CartPageProps> = () => {
    const cartItems = useGetCartItems();
    return (
        <Page title="Cart">
            {cartItems && <CartTable cartItems={cartItems}/>}
        </Page>
    );
};

const useGetCartItems = (): CartItem[] | undefined => {
    const query = useQuery('cartItems', () => fetchJson('/api/cart'));
    const cartItems = query.data;
    return cartItems;
};

export default CartPage;
