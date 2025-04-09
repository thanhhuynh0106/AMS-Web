package com.example.ams_app_be.controller;


import com.example.ams_app_be.model.Flight;
import com.example.ams_app_be.repository.FlightRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:5173")
public class FlightController {

    private final FlightRepository flightRepository;

    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping
    public List<Flight> getFlightsByDate(@RequestParam String flightDate) {
        DateTimeFormatter inputFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter dbFormat = DateTimeFormatter.ofPattern("M/d/yyyy");

        LocalDate parsedDate = LocalDate.parse(flightDate, inputFormat);
        String formattedDate = parsedDate.format(dbFormat);

        return flightRepository.findByFlightDate(formattedDate);
    }
}