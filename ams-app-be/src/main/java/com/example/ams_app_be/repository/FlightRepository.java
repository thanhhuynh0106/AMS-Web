package com.example.ams_app_be.repository;

import com.example.ams_app_be.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByFlightDate(String flightDate);
}