package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// TODO: Refactor to change List<Record> into List<Product>.

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cart {

    // Generate Cart ID
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cartID;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnore
    private AppUser user;


    @OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Record> records;


    private double total;

    /**
     * Constructor
     * @param user, to be assigned to user.
     * @param records, to be assigned to user.
     */
    public Cart(AppUser user, List<Record> records) {
        this.user = user;
        this.records = records;
    }

    /**
     * Empty Constructor
     */
    public Cart() {

    }

    /**
     * Getter Method for cartID.
     * @return cartID.
     */
    public long getID() { return cartID; }

    /**
     * Setter Method for cartID.
     * @param cartID, to be assigned to cartID.
     */
    public void setID(long cartID) { this.cartID = cartID; }

    /**
     * Getter Method for user.
     * @return user.
     */
    public AppUser getUser() { return user; }

    /**
     * Setter Method for user
     * @param user, to be assigned to user.
     */
    public void setUser(AppUser user) { this.user = user; }

    /**
     * Getter Method for records.
     * @return records.
     */
    public List<Record> getRecords() { return records; }

    /**
     * Setter Method for records
     * @param records, to be assigned to records.
     */
    public void setRecords(List<Record> records) { this.records = records; }

    /**
     * Getter Method for total.
     * @return total.
     */
    public double getTotal() { return total; }

    /**
     * Setter Method for Total (No Parameters as Total is defined by records).
     */
    public void setTotal() {
        total = 0.0f;
        // Get the Sum of each Price in the Cart.
        for(Record r : records) { total += r.getPrice(); }
        // Round to 2 Decimal Places
        total = (Math.round(total * 100f)) / 100f;
    }
}