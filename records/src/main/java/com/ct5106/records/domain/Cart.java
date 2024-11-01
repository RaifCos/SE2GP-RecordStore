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

    // Constructors
    public Cart(AppUser user) {
        this.user = user;
    }

    public Cart() {
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
    }
}
