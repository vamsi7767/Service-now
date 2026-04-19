package com.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Comment;
import com.model.Issue;
import com.model.User;
import com.repository.CommentRepository;
import com.repository.IssueRepository;
import com.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private IssueRepository issueRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ Add Comment
    public Comment addComment(Long issueId, Long userId, String message) {

        Issue issue = issueRepo.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setIssue(issue);
        comment.setUser(user);
        comment.setMessage(message);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepo.save(comment);
    }

    // ✅ Get Comments
    public List<Comment> getComments(Long issueId) {
        return commentRepo.findByIssueId(issueId);
    }
}