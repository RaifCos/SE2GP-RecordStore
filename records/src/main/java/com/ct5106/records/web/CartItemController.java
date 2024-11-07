package com.ct5106.records.web;

import com.ct5106.records.domain.CartItem;
import com.ct5106.records.domain.CartItemRepository;
import com.ct5106.records.domain.Record;
import com.ct5106.records.domain.RecordRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cartItems") // Base URL for the records
public class CartItemController {
    private final CartItemRepository cartItemRepository;

    public CartItemController(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    // Get all records
    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    // Get a record by ID
    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getRecordById(@PathVariable(value = "id") Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + cartItemId));
        return ResponseEntity.ok().body(cartItem);
    }

    // Create a new record (optional, if you want to allow adding records)
    @PostMapping
    public ResponseEntity<CartItem> createRecord(@RequestBody CartItem cartItem) {
        CartItem savedCartItem = cartItemRepository.save(cartItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCartItem);
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
    public ResponseEntity<Void> deleteRecord(@PathVariable(value = "id") Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Record not found with id " + cartItemId));

        cartItemRepository.delete(cartItem);
        return ResponseEntity.noContent().build();
    }
}