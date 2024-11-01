package com.ct5106.records.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long artistID;

    private String name;

    public int getNumMembers() {
        return numMembers;
    }

    private int numMembers;
    @JsonIgnore
    @OneToMany(mappedBy = "artist")

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

    @Override
    public String toString() {
        return name;
    }
}
