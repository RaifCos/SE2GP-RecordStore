package com.ct5106.records.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    // Method to find all artists
    @Override
    List<Artist> findAll();
}
