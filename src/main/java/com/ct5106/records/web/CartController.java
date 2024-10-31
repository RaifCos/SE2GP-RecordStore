package com.ct5106.records.web;

import com.ct5106.records.domain.Artist;
import com.ct5106.records.domain.Record;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ct5106.records.domain.Cart;
import com.ct5106.records.domain.CartRepository;

@RestController
public class CartController {

    private final CartRepository repository;

    public CartController(CartRepository repository) {
        this.repository = repository;
    }

    // Endpoint to retrieve all carts
    @GetMapping("/carts")
    public Iterable<Cart> getCarts() {
        return repository.findAll();
    }

    // Endpoint to retrieve a specific cart by ID
    @GetMapping("/carts/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + id));
    }
}

