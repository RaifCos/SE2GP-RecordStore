package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @JsonManagedReference
    @ManyToOne()
    @JoinColumn(name = "artistid")
    private Artist artist;

    private String genre;
    private int yearReleased;
    private double price;

    public Record() {
        super();
    }

    public Record(String name, Artist artist, String genre, int yearReleased, double price) {
        super();
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.yearReleased = yearReleased;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return this.name;
    }

    public Artist getArtist() {
        return this.artist;
    }

    public String getGenre() {
        return this.genre;
    }

    public int getYearReleased() {
        return this.yearReleased;
    }

    public double getPrice() {
        return this.price;
    }
    @Override
    public String toString() {
        return "Record{" +
                "title='" + name + '\'' +
                ", artist=" + (artist != null ? artist.getName() : "Unknown") +
                ", price=" + price +
                '}';
    }

}
