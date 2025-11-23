package com.ogl.devtest.customer;

public class PostCodeValidation {
    
    public static boolean isValidUkPostcode(String postcode) {
        String regex = "^[A-Z]{1,2}[0-9R][0-9A-Z]?[0-9][ABD-HJLNP-UW-Z]{2}$";
        String normalizedPostcode = postcode.toUpperCase().replaceAll("\\s+", "");
        return normalizedPostcode.matches(regex);
    }       

}
