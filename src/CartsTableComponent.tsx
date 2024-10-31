import React, { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { CartJSON } from "./types";


interface ApiResponse {
  _embedded: {
    carts: CartJSON[];
  };
}

const fetchartists = async (): Promise<CartJSON[]> => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8081/api/carts"
  );
  return response.data._embedded.carts;
};

const cartsTableComponent = () => {
    useEffect(() => {
        console.log("Fetching carts...");
      }, []);

  const { isLoading, error, data } = useQuery<CartJSON[], Error>(
    "carts",
    fetchartists
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
                </tr>
            </thead>
            <tbody>
                {data?.map((cart: CartJSON) => (
                    <tr key={cart._links.self.href}>
                        <td>{cart.cartID}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default cartsTableComponent;
