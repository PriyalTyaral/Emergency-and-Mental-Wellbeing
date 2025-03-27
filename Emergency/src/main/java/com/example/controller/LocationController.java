package com.example.controller;

import com.example.repository.LocationRepository;
import com.example.model.Location;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React frontend
@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationRepository locationRepository;

    // Constructor to inject the repository
    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    // ✅ Get Location by Phone Number (Database Only)
    @GetMapping("/get")
    public ResponseEntity<?> getLocation(@RequestParam String phoneNumber) {
        // Search for location by phone number in the database
        Optional<Location> location = locationRepository.findByPhoneNumber(phoneNumber);

        // If location found, return the details
        if (location.isPresent()) {
            Location loc = location.get();
            return ResponseEntity.ok(loc);
        } else {
            // If location not found, return 404 with an appropriate message
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Location not found for phone number: " + phoneNumber);
        }
    }

    // ✅ Save a New Location Entry
    @PostMapping("/save")
    public ResponseEntity<String> saveLocation(@RequestBody Location location) {
        // Validate that phone number, address, latitude, and longitude are provided
        if (location.getPhoneNumber() == null || location.getAddress() == null || 
            location.getLatitude() == 0 || location.getLongitude() == 0) {
            return ResponseEntity.badRequest().body("Phone number, address, latitude, and longitude are required!");
        }

        // Save the location to the database
        locationRepository.save(location);
        return ResponseEntity.ok("Location saved successfully!");
    }

    // ✅ Delete Location by Phone Number
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLocation(@RequestParam String phoneNumber) {
        Optional<Location> location = locationRepository.findByPhoneNumber(phoneNumber);

        if (location.isPresent()) {
            locationRepository.delete(location.get());
            return ResponseEntity.ok("Location deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Location not found for phone number: " + phoneNumber);
        }
    }
}
