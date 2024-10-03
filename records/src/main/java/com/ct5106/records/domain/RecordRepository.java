package com.ct5106.records.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.List;

@RepositoryRestResource
public interface RecordRepository extends CrudRepository<Record, Long> {
    List<Record> findByName (String name);
    List<Record> findByGenre (String genre);
    List<Record> findByYearReleased (int yearReleased);

    // Fetch cars by price range using SQL
    @Query("select c from Record c where c.price between ?1 and ?2")
    List<Record> findByPriceBetween(@Param("low") double low, @Param("high") double high);
}
