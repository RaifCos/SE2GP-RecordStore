package com.ct5106.records.web;

import com.ct5106.records.domain.Artist;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ct5106.records.domain.Record;
import com.ct5106.records.domain.RecordRepository;

@RestController
public class RecordController {
    private final RecordRepository repository;
    public RecordController(RecordRepository repository)
    {
        this.repository = repository;
    }

    @GetMapping("/records")
    public Iterable<Record> getRecords()
    {
        return repository.findAll();
    }

    @GetMapping("/records/{id}/artist")
    public Artist getArtistByRecord(@PathVariable Long id) {
        return repository.findById(id)
                .map(Record::getArtist)
                .orElseThrow(() -> new ResourceNotFoundException("Artist not found for record with id " + id));
    }
}


