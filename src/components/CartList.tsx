import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Cart } from '../interfaces/Cart';

// Fetching carts from the API
const fetchcarts = async (): Promise<Cart[]> => {
  const response = await axios.get<Cart[]>("http://localhost:8081/api/carts");
  console.log(response.data); 
  return response.data; 
};

const CartsTableComponent = () => {
  useEffect(() => {
    console.log("Fetching carts...");
  }, []);

  // Using react-query to fetch data
  const { isLoading, error, data } = useQuery<Cart[], Error>(
    "carts",
    fetchcarts
  );

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching carts: {error.message}</div>;
  }

  return (
    <div>
      <h1>Carts List</h1>
    <table>
      <thead>
        <tr>
          <th>Cart ID</th>
          <th>Records</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((cart) => (
          <tr key={cart.cartID}>
            <td>{cart.cartID}</td>
            <td>
              <ul>
                {cart.cartItems && cart.cartItems.length > 0 ? (
                  cart.cartItems.map((item) => (
                    <li key={item.id}>
                      {item.record.name} - {item.record.genre} ({item.record.yearReleased}) - ${item.record.price}
                    </li>
                  ))
                ) : (
                  <li>No items in this cart</li>
                )}
              </ul>
            </td>
            <td>{cart.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default CartsTableComponent;

