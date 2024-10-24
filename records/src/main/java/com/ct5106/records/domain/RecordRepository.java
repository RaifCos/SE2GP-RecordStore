package com.ct5106.records.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


import java.util.List;

@RepositoryRestResource
public interface RecordRepository extends CrudRepository<Record, Long> {
    @Query("select r from Record r join r.artist a where a.name = :artistName")
    List<Record> findByArtistName(@Param("artistName") String artistName);

    @Query("select r from Record r where r.name = :name")
    List<Record> findByRecordName(@Param("name") String name);


    @Query("select r from Record r where r.genre = :genre")
    List<Record> findByGenre(@Param("genre") String genre);


    @Query("select r from Record r where r.yearReleased = :yearReleased")
    List<Record> findByYearReleased(@Param("yearReleased") int yearReleased);

    @Query("select r from Record r where r.id = :id")
    List<Record> findByRecordId(@Param("id") Long id);

    @Query("select c from Record c where c.price between ?1 and ?2")
    List<Record> findByPriceBetween(@Param("low") double low, @Param("high") double high);
}
