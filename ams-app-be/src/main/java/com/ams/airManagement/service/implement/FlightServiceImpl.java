package com.ams.airManagement.service.implement;

import com.ams.airManagement.dto.ResponseDTO;
import com.ams.airManagement.dto.FlightsDTO;
import com.ams.airManagement.entity.Flights;
import com.ams.airManagement.exception.OurException;
import com.ams.airManagement.repository.FlightsRepository;
import com.ams.airManagement.service.interfac.FlightServiceInterface;
import com.ams.airManagement.utils.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightServiceInterface {

    @Autowired
    private FlightsRepository flightsRepository;

    @Override
    public ResponseDTO addNewFlight(Flights flight, String departureProvinceId, String destinationProvinceId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            if (flightsRepository.existsById(flight.getFlightId())) {
                throw new OurException("Flight with ID " + flight.getFlightId() + " already exists!");
            }

            // Set departure and destination province if provided
            if (flight.getDepartureProvince() == null && departureProvinceId != null) {
                flight.setDepartureProvince(Utils.getProvinceById(departureProvinceId));
            }
            if (flight.getDestinationProvince() == null && destinationProvinceId != null) {
                flight.setDestinationProvince(Utils.getProvinceById(destinationProvinceId));
            }

            Flights savedFlight = flightsRepository.save(flight);
            FlightsDTO flightsDTO = Utils.mapFlightEntityToFlightDTO(savedFlight);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Flight added successfully!");
            responseDTO.setFlightsDTO(flightsDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error while adding flight: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getAllFlights() {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            List<Flights> flightsList = flightsRepository.findAll();
            List<FlightsDTO> flightsDTOList = Utils.mapFlightListEntityToFlightListDTO(flightsList);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Successfully retrieved all flights.");
            responseDTO.setFlightList(flightsDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error while getting all flights: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO getFlightById(String flightId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Flights flight = flightsRepository.findById(flightId)
                    .orElseThrow(() -> new OurException("Flight not found with ID: " + flightId));
            FlightsDTO flightDTO = Utils.mapFlightEntityToFlightDTO(flight);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Flight retrieved successfully.");
            responseDTO.setFlightsDTO(flightDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error while getting flight: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO deleteFlight(String flightId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Flights flight = flightsRepository.findById(flightId)
                    .orElseThrow(() -> new OurException("Flight not found with ID: " + flightId));

            flightsRepository.delete(flight);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Flight deleted successfully.");

        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error while deleting flight: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public ResponseDTO updateFlight(String flightId, Flights updatedFlight) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Flights existingFlight = flightsRepository.findById(flightId)
                    .orElseThrow(() -> new OurException("Flight not found with ID: " + flightId));

            // Cập nhật các trường nếu khác null
            if (updatedFlight.getFlightCode() != null) {
                existingFlight.setFlightCode(updatedFlight.getFlightCode());
            }
            if (updatedFlight.getAirline() != null) {
                existingFlight.setAirline(updatedFlight.getAirline());
            }
            if (updatedFlight.getSymbol() != null) {
                existingFlight.setSymbol(updatedFlight.getSymbol());
            }
            if (updatedFlight.getTakeoffTime() != null) {
                existingFlight.setTakeoffTime(updatedFlight.getTakeoffTime());
            }
            if (updatedFlight.getLandingTime() != null) {
                existingFlight.setLandingTime(updatedFlight.getLandingTime());
            }
            if (updatedFlight.getOriginalPrice() != null) {
                existingFlight.setOriginalPrice(updatedFlight.getOriginalPrice());
            }
            if (updatedFlight.getTax() != null) {
                existingFlight.setTax(updatedFlight.getTax());
            }
            if (updatedFlight.getTotalPrice() != null) {
                existingFlight.setTotalPrice(updatedFlight.getTotalPrice());
            }
            if (updatedFlight.getSeatClass() != null) {
                existingFlight.setSeatClass(updatedFlight.getSeatClass());
            }
            if (updatedFlight.getDepartureProvince() != null) {
                existingFlight.setDepartureProvince(updatedFlight.getDepartureProvince());
            }
            if (updatedFlight.getDestinationProvince() != null) {
                existingFlight.setDestinationProvince(updatedFlight.getDestinationProvince());
            }

            Flights savedFlight = flightsRepository.save(existingFlight);
            FlightsDTO flightsDTO = Utils.mapFlightEntityToFlightDTO(savedFlight);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Flight updated successfully.");
            responseDTO.setFlightsDTO(flightsDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error while updating flight: " + e.getMessage());
        }
        return responseDTO;
    }

    @Override
    public List<FlightsDTO> searchFlights(String departureProvinceId, String destinationProvinceId, String date, String airlines) {
        // Validate date format yyyy-MM-dd
        if (!date.matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new OurException("Invalid date format. Please use yyyy-MM-dd (e.g., 2024-06-01).");
        }

        String datePrefix = date + "%"; // Example: "2024-06-01%"

        List<Flights> flights = flightsRepository.searchByDepartureDestinationAndDate(
                departureProvinceId, destinationProvinceId, datePrefix);

        // Filter by airlines if provided
        if (airlines != null && !airlines.isBlank()) {
            List<String> airlineList = java.util.Arrays.stream(airlines.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
            flights = flights.stream()
                    .filter(flight -> airlineList.contains(flight.getAirline()))
                    .collect(Collectors.toList());
        }

        return Utils.mapFlightListEntityToFlightListDTO(flights);
    }
    @Override
    public double calculateBestScoreDTO(FlightsDTO flights) {
        // Giả sử bạn muốn tính điểm dựa trên giá vé và thời gian bay
        double priceScore = 1.0 / flights.getTotalPrice(); // Điểm càng cao nếu giá càng thấp
        double durationScore = 1.0 / flights.getDuration(); // Điểm càng cao nếu thời gian bay càng ngắn

        // Kết hợp hai điểm này để tính điểm tổng thể
        return (priceScore + durationScore) / 2; // Trung bình cộng
    }

    @Override
    public List<FlightsDTO> sortFlights(List<FlightsDTO> flights, String sortBy, String sortOrder) {
        Comparator<FlightsDTO> comparator;
        if ("totalPrice".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(FlightsDTO::getTotalPrice);
        } else if ("duration".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(FlightsDTO::getDuration);
        } else if ("best".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(this::calculateBestScoreDTO);
        } else {
            comparator = Comparator.comparing(FlightsDTO::getTotalPrice); // Default to price
        }
        if ("desc".equalsIgnoreCase(sortOrder)) {
            comparator = comparator.reversed();
        }
        return flights.stream().sorted(comparator).collect(java.util.stream.Collectors.toList());
    }




    @Override
    public List<FlightsDTO> searchFlightsbytime(String departureProvinceId, String destinationProvinceId, String date) {
        // Xác thực định dạng ngày
        if (!date.matches("\\d{1,2}/\\d{1,2}/\\d{4}")) {
            throw new OurException("Invalid date format. Please use d/M/yy (e.g., 4/1/2021).");
        }

        String datePrefix = date + "%"; // Ví dụ: "4/1/21%"

        List<Flights> flights = flightsRepository.searchByDepartureDestinationAndDate(
                departureProvinceId, destinationProvinceId, datePrefix);

        // Sắp xếp theo takeoffTime
        flights.sort(Comparator.comparing(Flights::getTakeoffTime));

        return Utils.mapFlightListEntityToFlightListDTO(flights);
    }


    @Override
    public List<FlightsDTO> searchFlightsByDateRange(String departureProvinceId, String destinationProvinceId, String startDate, String endDate) {
        // Xác thực định dạng ngày (yyyy-MM-dd)
        if (!startDate.matches("\\d{4}-\\d{2}-\\d{2}") || !endDate.matches("\\d{4}-\\d{2}-\\d{2}")) {
            throw new OurException("Invalid date format. Please use yyyy-MM-dd (e.g., 2024-06-01).");
        }

        List<Flights> flights = flightsRepository.findByDepartureProvince_ProvinceIdAndDestinationProvince_ProvinceIdAndTakeoffDateBetween(
                departureProvinceId, destinationProvinceId, startDate, endDate);

        // Sắp xếp theo takeoffTime
        flights.sort(Comparator.comparing(Flights::getTakeoffTime));

        return Utils.mapFlightListEntityToFlightListDTO(flights);
    }

    public List<FlightsDTO> searchFlightandreturn(String departureProvinceId, String destinationProvinceId, String datecome, String datereturn) {
        // Xác thực định dạng ngày (d/M/yyyy, ví dụ: 4/1/2021)
        if (!datecome.matches("\\d{1,2}/\\d{1,2}/\\d{4}") || !datereturn.matches("\\d{1,2}/\\d{1,2}/\\d{4}")) {
            throw new OurException("Định dạng ngày không hợp lệ. Vui lòng dùng d/M/yyyy (ví dụ: 4/1/2021).");
        }

        String datecomePrefix = datecome + "%"; // Ví dụ: "4/1/2021%"
        String datereturnPrefix = datereturn + "%"; // Ví dụ: "4/2/2021%"

        // Tìm chuyến bay đi
        List<Flights> flights = flightsRepository.searchByDepartureDestinationAndDate(
                departureProvinceId, destinationProvinceId, datecomePrefix);

        // Tìm chuyến bay khứ hồi
        List<Flights> returnFlights = flightsRepository.searchByDepartureDestinationAndDate(
                destinationProvinceId, departureProvinceId, datereturnPrefix);

        // Gộp hai danh sách
        flights.addAll(returnFlights);

        // Sắp xếp theo takeoffTime, rồi đến totalPrice
        SimpleDateFormat sdf = new SimpleDateFormat("d/M/yyyy h:mm a");
        // Sắp xếp theo takeoffTime
        flights.sort(Comparator.comparing(Flights::getTakeoffTime).thenComparing(Flights::getTotalPrice));

        // Chuyển đổi sang DTO
        return Utils.mapFlightListEntityToFlightListDTO(flights);
    }

    @Override
    public ResponseDTO findCheapestFlightsForTrip(String departureProvinceId, List<String> destinationProvinceIds,
                                                  int totalDays, String startDate, String endDate) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            if (destinationProvinceIds == null || destinationProvinceIds.isEmpty()) {
                throw new OurException("No destination provinces provided.");
            }
            if (totalDays < destinationProvinceIds.size() || totalDays > destinationProvinceIds.size() * 2) {
                throw new OurException("Total days must be between " + destinationProvinceIds.size() + " and " + (destinationProvinceIds.size() * 2));
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate currentDate = LocalDate.parse(startDate, formatter);

            // Phân bổ số ngày ở mỗi điểm đến (ít nhất 1 ngày, nhiều nhất 2 ngày)
            int n = destinationProvinceIds.size();
            int minDays = 1, maxDays = 2;
            List<List<Integer>> allocations = new ArrayList<>();
            generateAllocationsHelper(n, totalDays, minDays, maxDays, new ArrayList<>(), allocations);

            List<FlightsDTO> bestTripFlights = null;
            double minTotalCost = Double.MAX_VALUE;

            for (List<Integer> allocation : allocations) {
                List<String> remainingProvinces = new ArrayList<>(destinationProvinceIds);
                List<FlightsDTO> tripFlights = new ArrayList<>();
                double totalCost = 0.0;
                String tempProvince = departureProvinceId;
                LocalDate tempDate = currentDate;
                boolean valid = true;

                for (int idx = 0; idx < allocation.size(); idx++) {
                    String destProvinceId = remainingProvinces.get(idx);
                    int daysAtDestination = allocation.get(idx);

                    Flights cheapestFlight = null;
                    double minPrice = Double.MAX_VALUE;

                    // Tìm chuyến bay rẻ nhất từ tempProvince đến destProvinceId trong 2 ngày gần nhất
                    for (int i = 0; i < 2; i++) {
                        String searchDate = tempDate.plusDays(i).format(formatter) + "%";
                        List<Flights> flights = flightsRepository.searchByDepartureDestinationAndDate(
                                tempProvince, destProvinceId, searchDate);
                        if (!flights.isEmpty()) {
                            Flights cheapest = flights.stream()
                                    .min(Comparator.comparing(Flights::getTotalPrice))
                                    .orElse(null);
                            if (cheapest != null && cheapest.getTotalPrice() < minPrice) {
                                minPrice = cheapest.getTotalPrice();
                                cheapestFlight = cheapest;
                            }
                        }
                    }

                    if (cheapestFlight == null) {
                        valid = false;
                        break;
                    }

                    totalCost += cheapestFlight.getTotalPrice();
                    FlightsDTO flightDTO = Utils.mapFlightEntityToFlightDTO(cheapestFlight);
                    flightDTO.setDaysAtDestination(daysAtDestination);
                    tripFlights.add(flightDTO);

                    tempProvince = destProvinceId;
                    tempDate = tempDate.plusDays(daysAtDestination);
                }

                if (valid && totalCost < minTotalCost) {
                    minTotalCost = totalCost;
                    bestTripFlights = tripFlights;
                }
            }

            if (bestTripFlights == null) {
                throw new OurException("No valid flight plan found for the given trip.");
            }

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Cheapest flights found successfully.");
            responseDTO.setFlightList(bestTripFlights);
        } catch (OurException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error finding cheapest flights: " + e.getMessage());
        }
        return responseDTO;
    }
    // Helper method to generate all possible allocations of days
    private void generateAllocationsHelper(int n, int remaining, int minDays, int maxDays,
                                           List<Integer> current, List<List<Integer>> result) {
        if (n == 0) {
            if (remaining == 0) {
                result.add(new ArrayList<>(current));
            }
            return;
        }
        for (int i = minDays; i <= Math.min(maxDays, remaining); i++) {
            current.add(i);
            generateAllocationsHelper(n - 1, remaining - i, minDays, maxDays, current, result);
            current.remove(current.size() - 1);
        }
    }

//    @Override
//    public ResponseDTO findCheapestFlightsForTrip(List<String> provinceIds, int totalDays) {
//        ResponseDTO responseDTO = new ResponseDTO();
//        try {
//            if (provinceIds == null || provinceIds.isEmpty()) {
//                throw new OurException("No provinces provided.");
//            }
//            if (totalDays < provinceIds.size() || totalDays > provinceIds.size() * 2) {
//                throw new OurException("Total days must be between " + provinceIds.size() + " and " + (provinceIds.size() * 2));
//            }
//
//            String hcmId = "HCM";
//            LocalDate baseDate = LocalDate.of(2025, 6, 15); // From MapPage.jsx
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//            // Generate all possible day allocations
//            List<List<Integer>> dayAllocations = generateDayAllocations(provinceIds.size(), totalDays, 1, 2);
//            List<Map<String, Object>> allTripPlans = new ArrayList<>();
//            double minTotalCost = Double.MAX_VALUE;
//            Map<String, Object> bestTripPlan = null;
//
//            for (List<Integer> allocation : dayAllocations) {
//                LocalDate currentDate = baseDate;
//                double tripCost = 0.0;
//                List<Map<String, Object>> tripFlights = new ArrayList<>();
//
//                for (int i = 0; i < provinceIds.size(); i++) {
//                    String destProvinceId = provinceIds.get(i);
//                    int daysAtProvince = allocation.get(i);
//
//                    // Outbound flight (HCM -> Province)
//                    String outboundDate = currentDate.format(formatter);
//                    List<Flights> outboundFlights = flightsRepository.searchByDepartureDestinationAndDate(
//                            hcmId, destProvinceId, outboundDate + "%");
//                    if (outboundFlights.isEmpty()) {
//                        continue; // Skip this allocation if no flights
//                    }
//                    Flights cheapestOutbound = outboundFlights.stream()
//                            .min(Comparator.comparing(Flights::getTotalPrice))
//                            .orElse(null);
//                    if (cheapestOutbound == null) {
//                        continue;
//                    }
//
//                    // Return flight (Province -> HCM)
//                    LocalDate returnDate = currentDate.plusDays(daysAtProvince);
//                    String returnDateStr = returnDate.format(formatter);
//                    List<Flights> returnFlights = flightsRepository.searchByDepartureDestinationAndDate(
//                            destProvinceId, hcmId, returnDateStr + "%");
//                    if (returnFlights.isEmpty()) {
//                        continue;
//                    }
//                    Flights cheapestReturn = returnFlights.stream()
//                            .min(Comparator.comparing(Flights::getTotalPrice))
//                            .orElse(null);
//                    if (cheapestReturn == null) {
//                        continue;
//                    }
//
//                    // Add flight details
//                    tripCost += cheapestOutbound.getTotalPrice() + cheapestReturn.getTotalPrice();
//                    tripFlights.add(createFlightMap(cheapestOutbound, outboundDate, daysAtProvince));
//                    tripFlights.add(createFlightMap(cheapestReturn, returnDateStr, 0));
//
//                    currentDate = returnDate.plusDays(1); // Move to next travel day
//                }
//
//                if (tripFlights.size() == provinceIds.size() * 2) { // Valid plan
//                    Map<String, Object> tripPlan = new HashMap<>();
//                    tripPlan.put("flights", tripFlights);
//                    tripPlan.put("totalFlightCost", tripCost);
//                    allTripPlans.add(tripPlan);
//
//                    if (tripCost < minTotalCost) {
//                        minTotalCost = tripCost;
//                        bestTripPlan = tripPlan;
//                    }
//                }
//            }
//
//            if (bestTripPlan == null) {
//                throw new OurException("No valid flight combinations found for the given provinces and days.");
//            }
//
//            responseDTO.setStatusCode(200);
//            responseDTO.setMessage("Cheapest flights found successfully.");
//            responseDTO.setTripRequestDTO((com.ams.airManagement.dto.TripRequestDTO) bestTripPlan);
//
//        } catch (OurException e) {
//            responseDTO.setStatusCode(400);
//            responseDTO.setMessage(e.getMessage());
//        } catch (Exception e) {
//            responseDTO.setStatusCode(500);
//            responseDTO.setMessage("Error finding cheapest flights: " + e.getMessage());
//        }
//        return responseDTO;
//    }
//    @Override
//    public Map<String, Object> createFlightMap(Flights flight, String date, int days) {
//        Map<String, Object> flightMap = new HashMap<>();
//        flightMap.put("flightId", flight.getFlightId());
//        flightMap.put("flightCode", flight.getFlightCode());
//        flightMap.put("airline", flight.getAirline());
//        flightMap.put("totalPrice", flight.getTotalPrice());
//        flightMap.put("takeoffTime", flight.getTakeoffTime());
//        flightMap.put("departureProvinceId", flight.getDepartureProvince().getProvinceId());
//        flightMap.put("destinationProvinceId", flight.getDestinationProvince().getProvinceId());
//        flightMap.put("date", date);
//        flightMap.put("daysAtDestination", days);
//        return flightMap;
//    }
//
//    public List<List<Integer>> generateDayAllocations(int n, int total, int minDays, int maxDays) {
//        List<List<Integer>> result = new ArrayList<>();
//        generateAllocationsHelper(n, total, minDays, maxDays, new ArrayList<>(), result);
//        return result;
//    }
//
//    public void generateAllocationsHelper(int n, int remaining, int minDays, int maxDays,
//                                           List<Integer> current, List<List<Integer>> result) {
//        if (n == 0) {
//            if (remaining == 0) {
//                result.add(new ArrayList<>(current));
//            }
//            return;
//        }
//        for (int i = minDays; i <= Math.min(maxDays, remaining); i++) {
//            current.add(i);
//            generateAllocationsHelper(n - 1, remaining - i, minDays, maxDays, current, result);
//            current.remove(current.size() - 1);
//        }
//    }

}
