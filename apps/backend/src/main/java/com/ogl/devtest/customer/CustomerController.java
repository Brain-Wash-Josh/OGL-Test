package com.ogl.devtest.customer;

import com.fasterxml.jackson.databind.JsonNode;
import com.ogl.devtest.map.Geocoding;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerRepository customerRepository;
    private final Geocoding geocoding;

    public CustomerController(CustomerRepository customerRepository, Geocoding geocoding) {
        this.customerRepository = customerRepository;
        this.geocoding = geocoding;
    }
    
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Customer> findAll() {
        return customerRepository.findAll();
    }
    
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> findById(@PathVariable("id") long id) {
        final Optional<Customer> customer = customerRepository.findById(id);
    
        return customer.isPresent() ? ResponseEntity.of(customer) : ResponseEntity.notFound().build();
    }
    
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Customer> save(@RequestBody Customer customer) {
        Boolean isValidPostcode = PostCodeValidation.isValidUkPostcode(customer.getPostcode());
        if (!isValidPostcode) {
            return ResponseEntity.badRequest().build();
        }

        try {
            JsonNode geoData = geocoding.getCoordinates(
                customer.getHouse(),
                customer.getStreet(),
                customer.getCity(),
                customer.getPostcode()
            );

            System.out.println("Geocoding Data: " + geoData.toString());

            if (geoData != null) {
                customer.setLatitude(geoData.get("lat").asDouble());
                customer.setLongitude(geoData.get("lon").asDouble());
            } else {
                return ResponseEntity.status(502).build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(502).build();
        }
        
    
        return ResponseEntity.ok(customerRepository.save(customer));
    }
    
}
