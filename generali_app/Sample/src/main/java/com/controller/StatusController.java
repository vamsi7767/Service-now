package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.model.Status;
import com.repository.StatusRepository;

@RestController
@RequestMapping("/api/status")
@CrossOrigin
public class StatusController {

    @Autowired
    private StatusRepository statusRepository;

    // ✅ Get all statuses (for dropdown)
    @GetMapping
    public List<Status> getAll() {
        return statusRepository.findAll();
    }

    // ✅ Get status by ID
    @GetMapping("/{id}")
    public Status getById(@PathVariable Long id) {
        return statusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Status not found"));
    }

    // ✅ Get status by name (used internally)
    @GetMapping("/name/{name}")
    public Status getByName(@PathVariable String name) {
        return statusRepository.findByName(name.toUpperCase())
                .orElseThrow(() -> new RuntimeException("Status not found"));
    }

    // 🔥 Create new status (ADMIN use)
    @PostMapping
    public Status create(@RequestBody Status status) {

        if (statusRepository.findByName(status.getName()).isPresent()) {
            throw new RuntimeException("Status already exists");
        }

        status.setName(status.getName().toUpperCase());
        return statusRepository.save(status);
    }

    // 🔥 Delete status (optional)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        statusRepository.deleteById(id);
        return "Status deleted";
    }
}