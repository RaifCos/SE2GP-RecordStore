package com.ct5106.records.web;

import com.ct5106.records.domain.Artist;
import com.ct5106.records.domain.Record;
import com.ct5106.records.domain.ArtistRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArtistController {
    private final ArtistRepository repository;

    public ArtistController(ArtistRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/artists")
    public Iterable<Artist> getArtists() {
        return repository.findAll();
    }

    @GetMapping("/artists/{id}/records")
    public Iterable<Record> getRecordsByArtist(@PathVariable Long id) {
        Artist artist = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found with id " + id));
        return artist.getRecords(); // Assumes `Artist` entity has a `getRecords()` method
    }
}
