package com.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "notifications")
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private Boolean isRead = false; // ✅ default

    private LocalDateTime createdAt;

    // 🔥 Link to user
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 🔥 Link to issue (IMPORTANT)
    @ManyToOne
    @JoinColumn(name = "issue_id")
    private Issue issue;

    // getters & setters
}