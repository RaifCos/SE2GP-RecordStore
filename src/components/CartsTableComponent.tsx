import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { CartJSON } from "../types";
import {CartItem } from "../types"

interface ApiResponse {
  _embedded: {
    carts: CartJSON[];
  };
}

const fetchcarts = async (): Promise<CartItem[]> => {
    const response = await axios.get<CartJSON>(
      "http://localhost:8081/api/carts"
    );
    return response.data._embedded.carts; 
  };

const cartsTableComponent = () => {
  useEffect(() => {
    console.log("Fetching carts...");
  }, []);

  const { isLoading, error, data } = useQuery<CartItem[], Error>(
    "carts",
    fetchcarts
  );

  //handle loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //handle error
  if (error) {
    return <div>Error fetching carts: {error.message}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ backgroundColor: 'black', color: 'white' }}>Carts Table</th>
        </tr>
        <tr>
          <th>Cart ID</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((cart) => (
          <tr key={cart._links.self.href}>
            <td>{cart.id}</td>
            <td>{cart.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default cartsTableComponent;
