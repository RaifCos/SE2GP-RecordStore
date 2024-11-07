package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cartID;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "user_id") // Foreign key column in Cart table
    private AppUser user;

    @JsonManagedReference // This handles the serialization of CartItem relationships
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems;

    private double total;

    // Constructor for creating cart with user and empty cartItems
    public Cart(AppUser user) {
        this.user = user;
    }

    // Empty Constructor
    public Cart() {
    }

    // Constructor for adding cartItems to Cart
    public Cart(AppUser user, List<CartItem> cartItems) {
        this.user = user;
        this.cartItems = cartItems;
        calculateTotal();  // Calculate the total price based on cartItems
    }


    // Getters and Setters
    public long getCartID() {
        return cartID;
    }

    public void setCartID(long cartID) {
        this.cartID = cartID;
    }

    public AppUser getUser() {
        return user;
    }

    public void setUser(AppUser user) {
        this.user = user;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
        calculateTotal();  // Recalculate total when cartItems change
    }

    // Method to calculate total based on cartItems
    public void calculateTotal() {
        total = 0.0;
        for (CartItem item : cartItems) {
            total += item.getRecord().getPrice();  // Assuming CartItem has a reference to Record
        }
        total = Math.round(total * 100.0) / 100.0;  // Round to two decimal places
    }

    public double getTotal() {
        return total;
    }
}
