package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long artistID;

    private String name;
    private int numMembers;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "artist", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Record> records;


    public Artist(String name, int numMembers) {
        this.name = name;
        this.numMembers = numMembers;
    }

    public Artist() {

    }

    public Long getArtistID() {
        return artistID;
    }

    public void setArtistID(Long artistID) {
        this.artistID = artistID;
    }

    public String getName() {
        return name;
    }

    public List<Record> getRecords() {
        return records;
    }

    public void setRecords(List<Record> records)
    {
        this.records = records;
    }

    @Override
    public String toString() {
        return name;
    }
}
