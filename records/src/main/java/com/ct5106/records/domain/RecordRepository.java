package com.ct5106.records.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource
public interface RecordRepository extends CrudRepository<Record, Long> {
    @Override
    Optional<Record> findById(Long id);
    @Override
    List<Record> findAll();
}
