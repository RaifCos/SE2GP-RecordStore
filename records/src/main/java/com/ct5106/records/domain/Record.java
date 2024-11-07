package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Record {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    //these other entity fields will be automatically mapped to the DB too
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistID")
    @JsonBackReference
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
    public void setName(String name) {
        this.name = name;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setYearReleased(int yearReleased) {
        this.yearReleased = yearReleased;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    public void setArtist(Artist artist) {
        this.artist = artist;
    }


    public Long getId() {
        return id;
    }
    public String getName(){
        return this.name;
    }
    public Artist getArtist(){
        return this.artist;
    }
    public String getGenre(){
        return this.genre;
    }
    public int getYearReleased(){
        return this.yearReleased;
    }
    public double getPrice(){
        return this.price;
    }
}
