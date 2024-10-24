package com.ct5106.records.domain;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ArtistRepository extends CrudRepository<Artist, Long> {
    @Query("select a from Artist a where a.name = :name")
    List<Artist> findByName(@Param("name") String name);

    @Query("select a from Artist a where a.numMembers = :numMembers")
    List<Artist> findByNumMembers(@Param("numMembers") int numMembers);

    @Query("select c from Artist c where c.numMembers between ?1 and ?2")
    List<Artist> findByMembersBetween(@Param("low") double low, @Param("high") double high);
}
