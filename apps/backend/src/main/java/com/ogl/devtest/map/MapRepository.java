package com.ogl.devtest.map;


import org.springframework.data.repository.CrudRepository;


public interface MapRepository extends CrudRepository<Map, Long> {
    <Optional> Map findByCustomerId(long customerId);
}
