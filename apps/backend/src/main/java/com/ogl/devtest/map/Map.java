package com.ogl.devtest.map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "customer_geolocation")
public class Map {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Missing latitude")
    private double latitude;
    @NotNull(message = "Missing longitude")
    private double longitude;

    @Column(name = "customer_id", nullable = false)
    @NotNull(message = "Missing customer ID")
    private long customerId;

    /* 
    private Map(double latitude, double longitude, long customerId) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.customerId = customerId;
    }
        */

    public long getId() {
        return id;
    }
    
    public long setId(long id) {
        return this.id = id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

}
