package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.model.Comment;
import com.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService service;

    // ✅ Add Comment
    @PostMapping
    public Comment addComment(@RequestParam Long issueId,
                              @RequestParam Long userId,
                              @RequestParam String message) {

        return service.addComment(issueId, userId, message);
    }

    // ✅ Get Comments
    @GetMapping("/{issueId}")
    public List<Comment> getComments(@PathVariable Long issueId) {
        return service.getComments(issueId);
    }
}