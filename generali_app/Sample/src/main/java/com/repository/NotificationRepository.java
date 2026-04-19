package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Notification;

import jakarta.transaction.Transactional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	
	 List<Notification> findByUserId(Long userId);
     
	 @Transactional
	 void deleteByIssueId(Long id);
}
