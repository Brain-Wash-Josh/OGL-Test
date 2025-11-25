package com.ogl.devtest.map;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;


public interface MapRepository extends CrudRepository<Map, Long> {
    Optional<Map> findByCustomerId(Long customerId);
}
