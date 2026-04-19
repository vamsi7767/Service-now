package com.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Issue;
import com.model.IssueHistory;
import com.model.Notification;
import com.model.User;
import com.repository.IssueHistoryRepository;
import com.repository.IssueRepository;
import com.repository.NotificationRepository;
import com.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueHistoryRepository historyRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ CREATE ISSUE
    public Issue createIssue(Issue issue) {

        User assignedUser = userRepository.findById(issue.getAssignedTo().getId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        User createdUser = userRepository.findById(issue.getCreatedBy().getId())
                .orElseThrow(() -> new RuntimeException("Created user not found"));

        issue.setAssignedTo(assignedUser);
        issue.setCreatedBy(createdUser);
        issue.setStatus("OPEN");
        issue.setCreatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    // ✅ GET ALL
    public List<Issue> getAll() {
        return issueRepository.findAll();
    }

    // ✅ GET BY ID
    public Issue getById(Long id) {
        return issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
    }

    // ✅ UPDATE ISSUE
    public Issue updateIssue(Long id, Issue updatedIssue) {

        Issue issue = getById(id);

        issue.setTitle(updatedIssue.getTitle());
        issue.setDescription(updatedIssue.getDescription());
        issue.setUpdatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    // 🔥 VALID STATUS FLOW
    private boolean isValidTransition(String oldStatus, String newStatus) {

        oldStatus = oldStatus.toUpperCase();
        newStatus = newStatus.toUpperCase();

        if (oldStatus.equals("OPEN") && newStatus.equals("IN_PROGRESS")) return true;
        if (oldStatus.equals("IN_PROGRESS") && newStatus.equals("COMPLETED")) return true;

        return false;
    }

    // 🔥 UPDATE STATUS (MAIN LOGIC)
    public Issue updateStatus(Long issueId, String newStatus, Long userId) {

        Issue issue = getById(issueId);

        String oldStatus = issue.getStatus();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

     
        // 🔥 Role-based control
        if ("USER".equalsIgnoreCase(user.getRole())) {
            if (!(oldStatus.equals("OPEN") && newStatus.equals("IN_PROGRESS"))) {
                throw new RuntimeException("USER can only move OPEN → IN_PROGRESS");
            }
        }

        // ✅ Update
        issue.setStatus(newStatus);
        issue.setUpdatedAt(LocalDateTime.now());
        issueRepository.save(issue);

        // ✅ History
        IssueHistory history = new IssueHistory();
        history.setIssue(issue);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setUpdatedBy(user);
        history.setUpdatedAt(LocalDateTime.now());
        historyRepository.save(history);

        // ✅ Notification
        Notification notification = new Notification();
        notification.setUser(issue.getAssignedTo());
        notification.setMessage("Issue moved to " + newStatus);
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        return issue;
    }
    @Transactional
    public void deleteIssue(Long id) {

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        // 🔥 Delete child records FIRST
        historyRepository.deleteByIssueId(id);
        notificationRepository.deleteByIssueId(id);

        // ✅ Then delete issue
        issueRepository.delete(issue);
    }

    public List<Issue> getByStatus(String status) {
        return issueRepository.findByStatusIgnoreCase(status);
    }

    // 🔥 REAL FEATURE
    public List<Issue> getByAssignedUser(Long userId) {
        return issueRepository.findByAssignedToId(userId);
    }
   
    public Object[] getOverallStats() {
        return issueRepository.getIssueCounts().get(0); // first row
    }

    public List<Object[]> getStatsPerUser() {
        return issueRepository.getIssueCountsPerUser();
    }
}