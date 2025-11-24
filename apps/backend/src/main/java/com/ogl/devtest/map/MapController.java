package com.ogl.devtest.map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ogl.devtest.customer.Customer;
import com.ogl.devtest.customer.CustomerRepository;
import com.ogl.devtest.customer.PostCodeValidation;

import java.util.Optional;

@RestController
@RequestMapping("/map")
public class MapController {
    private final MapRepository mapRepository;
    
    public MapController(MapRepository mapRepository) {
        this.mapRepository = mapRepository;
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Map> findAll() {
        return mapRepository.findAll();
    }

    /* 
    @GetMapping(value = "/{customerId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map> findByCustomerId(@PathVariable("customerId") long customerId) {
        final Optional<Map> map = mapRepository.findByCustomerId(customerId);
        return map.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }*/

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map> save(@RequestBody Map map) {
        
        return ResponseEntity.ok(mapRepository.save(map));
    }


}
