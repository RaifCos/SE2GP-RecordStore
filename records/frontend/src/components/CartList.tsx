import React, { useEffect, useState } from 'react';
import getCarts from '../services/cartController'; // Adjust the path as necessary
import { Cart } from '../interfaces/Cart';

const CartList = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const data = await getCarts();
                console.log(data)
                setCarts(data);
            } catch (error) {
                console.error('Error fetching carts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarts();
    }, []);

    // Calculate total without decimal places, since `price` is an integer
    const calculateTotal = (cartItems: Cart["cartItems"]) => {
        return cartItems.reduce((acc, item) => acc + item.record.price, 0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (carts.length === 0) {
        return <div>No carts found.</div>;
    }

    return (
        <div>
            <h1>Cart List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Cart ID</th>
                        <th>Records</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((cart) => (
                        <tr key={cart.cartID}>
                            <td>{cart.cartID}</td>
                            <td>
                                <ul>
                                    {cart.cartItems?.map((item) => (
                                        <li key={item.record.id}> {/* Unique key based on record.id */}
                                            <strong>{item.record.name}</strong> - ${item.record.price}
                                        </li>
                                    )) || <li>No items in cart</li>} {/* Fallback if cartItem is empty or undefined */}
                                </ul>
                            </td>
                            <td>${calculateTotal(cart.cartItems || [])}</td> {/* Provide empty array as fallback */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;
