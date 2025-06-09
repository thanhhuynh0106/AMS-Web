package com.ams.airManagement.service.interfac;

import com.ams.airManagement.dto.FlightsDTO;
import com.ams.airManagement.dto.ResponseDTO;
import com.ams.airManagement.entity.Flights;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface FlightServiceInterface {


    ResponseDTO addNewFlight(Flights flight, String departureProvinceId, String destinationProvinceId);


    ResponseDTO getAllFlights();


    ResponseDTO updateFlight(String flightId, Flights updatedData);


    ResponseDTO deleteFlight(String flightId);

    ResponseDTO getFlightById(String flightId);

    List<FlightsDTO> searchFlights(String departureProvinceId, String destinationProvinceId, String date, String Airline);
    List<FlightsDTO> sortFlights(List<FlightsDTO> Flights, String sortBy, String sortOrder);
    List<FlightsDTO> searchFlightsbytime(String departureProvinceId, String destinationProvinceId, String date);
    double calculateBestScoreDTO(FlightsDTO flights);
    List<FlightsDTO> searchFlightsByDateRange(String departureProvinceId, String destinationProvinceId, String startDate, String endDate);
//
    List<FlightsDTO> searchFlightandreturn(String departureProvinceId, String destinationProvinceId, String datecome, String datereturn);
//
//    List<FlightsDTO> searchFlightandreturn2(String flightId, String datereturn);

    ResponseDTO findCheapestFlightsForTrip(String departureProvinceId, List<String> destinationProvinceIds,
                                                int totalDays, String startDate, String endDate);
//    ResponseDTO findCheapestFlightsForTrip(List<String> provinceIds, int totalDays);
//    Map<String, Object> createFlightMap(Flights flight, String date, int days);
//    List<List<Integer>> generateDayAllocations(int n, int total, int minDays, int maxDays);
//    void generateAllocationsHelper(int n, int remaining, int minDays, int maxDays,
//                                   List<Integer> current, List<List<Integer>> result);

}
