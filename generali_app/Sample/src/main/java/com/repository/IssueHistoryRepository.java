package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.IssueHistory;

import jakarta.transaction.Transactional;

public interface IssueHistoryRepository extends JpaRepository<IssueHistory, Long> {
    
	@Transactional
	void deleteByIssueId(Long id);

 
	
}
