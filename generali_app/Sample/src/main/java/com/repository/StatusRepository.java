package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Status;


public interface StatusRepository extends JpaRepository<Status, Long> {
	Optional<Status> findByName(String name);
}
