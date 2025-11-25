package com.ogl.devtest.map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Geocoding {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String apiUrl;

    @Autowired
    public Geocoding(
        RestTemplate restTemplate,
        @Value("${geocoding.api.key}") String apiKey,
        @Value("${geocoding.api.url}") String apiUrl
    ) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        System.out.println("Geocoding initialized with apiKey: " + (apiKey != null ? "PRESENT" : "NULL"));
        System.out.println("Geocoding initialized with apiUrl: " + apiUrl);
    }

    public JsonNode getCoordinates(String house, String street, String city, String postcode) throws Exception {
        String address = String.format("%s %s, %s, %s", house, street, city, postcode);
        String url = String.format("%s?q=%s&api_key=%s", apiUrl, address.replace(" ", "+"), apiKey);

        System.out.println("Geocoding URL: " + url);

        if(apiKey == null || apiKey.isEmpty()) {
            throw new Exception("API key is missing");
        }

        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("Geocoding Response: " + response);
        JsonNode root = mapper.readTree(response);
        System.out.println("Parsed JSON: " + root.toString());

        if (root.isArray() && root.size() > 0) {
            System.out.println("Geocoding Result: " + root.get(0).toString());
            return root.get(0);
        } else {
            throw new Exception("No geocoding results found");
        }
    }
}
