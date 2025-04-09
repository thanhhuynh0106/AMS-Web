package com.example.ams_app_be;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.*;
import java.text.SimpleDateFormat;

import com.opencsv.*;

public class ImportSQL {
    public static void main(String[] args) {
        String path = "src/main/resources/flights.csv";
        String jdbcURL = "jdbc:mysql://localhost:3306/ams";
        String username = "root";
        String password = "thanhleminh0306";

        try (Connection conn = DriverManager.getConnection(jdbcURL, username, password);
             CSVReader reader = new CSVReader(new FileReader(path))) {

            String insertSQL = "INSERT INTO flight_schedules (scheduled_time, updated_time, route, airlines, flights, counter, gate, terminal, statuses, flight_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement ps = conn.prepareStatement(insertSQL);

            String[] nextLine;
            reader.readNext();
            SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM-dd-yyyy");

            while ((nextLine = reader.readNext()) != null) {
                ps.setString(1, nextLine[0]);
                ps.setString(2, nextLine[1]);
                ps.setString(3, nextLine[2]);
                ps.setString(4, nextLine[3]);
                ps.setString(5, nextLine[4]);
                ps.setString(6, nextLine[5]);
                ps.setString(7, nextLine[6]);
                ps.setString(8, nextLine[7]);
                ps.setString(9, nextLine[8]);
                ps.setString(10, nextLine[9]);
                ps.executeUpdate();
            }

            System.out.println("Import successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
