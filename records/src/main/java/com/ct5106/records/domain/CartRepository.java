package com.ct5106.records.domain;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface CartRepository extends CrudRepository<Cart, Long> {
    @Query("select c from Cart c where c.user = :user")
    List<Cart> findByName(@Param("user") AppUser user);
}
