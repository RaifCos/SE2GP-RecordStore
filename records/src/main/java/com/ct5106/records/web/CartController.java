package com.ct5106.records.web;

import com.ct5106.records.domain.*;
import com.ct5106.records.domain.Record;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/carts") // Base URL for the records
public class CartController {
    private final CartRepository cartRepository;

    public CartController(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Get all records
    @GetMapping
    public List<Cart> getAllCarts() {
        return (List<Cart>) cartRepository.findAll();
    }

    // Get a record by ID
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getRecordById(@PathVariable(value = "id") Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + cartId));
        return ResponseEntity.ok().body(cart);
    }

    // Create a new record (optional, if you want to allow adding records)
    @PostMapping
    public ResponseEntity<Cart> createRecord(@RequestBody Cart cart) {
        Cart savedCart = cartRepository.save(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCart);
    }

    // Update a record (optional, if you want to allow updates)
//    @PutMapping("/{id}")
//    public ResponseEntity<Record> updateRecord(@PathVariable(value = "id") Long recordId, @RequestBody Record recordDetails) {
//        Record record = repository.findById(recordId)
//                .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + recordId));
//
//        // Update fields as necessary
//        record.setTitle(recordDetails.getTitle());
//        record.setArtist(recordDetails.getArtist());
//        record.setGenre(recordDetails.getGenre());
//        record.setYearReleased(recordDetails.getYearReleased());
//        record.setPrice(recordDetails.getPrice());
//        // ... Update other fields if necessary
//
//        final Record updatedRecord = repository.save(record);
//        return ResponseEntity.ok(updatedRecord);
//    }

    // Delete a record by ID (optional, if you want to allow deletion)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable(value = "id") Long cartId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + cartId));

        cartRepository.delete(cart);
        return ResponseEntity.noContent().build();
    }
}