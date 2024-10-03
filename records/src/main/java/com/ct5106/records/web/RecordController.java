package com.ct5106.records.web;

import org.springframework.web.bind.annotation.GetMapping;
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
}


