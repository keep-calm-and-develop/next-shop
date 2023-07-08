import React, { useMemo } from 'react'
import { CartItem } from '../pages/api/cart';

interface CartTableProps {
    cartItems: CartItem[];
}

export const CartTable: React.FC<CartTableProps> = ({
    cartItems,
}) => {
    const grandTotal = cartItems.reduce((acc, curr) => {
        return acc + curr.total;
    }, 0);
    return (
        <table>
            <thead>
                <tr>
                    <th className='px-4 py-2'>Product</th>
                    <th className='px-4 py-2'>Price</th>
                    <th className='px-4 py-2'>Quantity</th>
                    <th className='px-4 py-2'>Total</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((cartItem) => (
                    <tr key={cartItem.id}>
                        <td className='px-4 py-2'>{cartItem.product.title}</td>
                        <td className='px-4 py-2 text-right'>${cartItem.product.price.toFixed(2)}</td>
                        <td className='px-4 py-2 text-right'>{cartItem.quantity.toFixed(2)}</td>
                        <td className='px-4 py-2 text-right'>${cartItem.total.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th className='px-4 py-2 text-left'>
                        Total
                    </th>
                    <th></th>
                    <th></th>
                    <th className='px-4 py-2 text-right'>
                        ${grandTotal}
                    </th>
                </tr>
            </tfoot>
        </table>
    );
}