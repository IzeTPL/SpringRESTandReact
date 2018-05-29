package com.ait.controller;

import com.ait.model.Comment;
import com.ait.model.User;
import com.ait.repository.CommentRepository;
import com.ait.repository.PostRepository;
import com.ait.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
public class CommentController {

    private UserRepository userRepository;
    private CommentRepository commentRepository;

    public CommentController(UserRepository userRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping("/comment/postId/{postId}")
    public List<Comment> getByPostId(@PathVariable("postId") String postId) {

        return commentRepository.findAllByPostId(postId);

    }

    @PostMapping("/comment/create")
    public Comment createPost(@Valid @RequestBody Comment comment) {

        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        User user = userRepository.findByUsername( (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal() );

        comment.setAuthor(user.getUsername());

        return commentRepository.save(comment);

    }

    @GetMapping("/comment/{id}")
    public ResponseEntity<Comment> getPost(@PathVariable("id") String id) {

        if(commentRepository.findById(id).isPresent()) {

            return new ResponseEntity<>(commentRepository.findById(id).get(), HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("/comment/{id}")
    public ResponseEntity<Comment> updatePost(@PathVariable("id") String id, @RequestBody Comment post) {

        if(commentRepository.findById(id).isPresent()) {

            Comment data = commentRepository.findById(id).get();
            Comment update = commentRepository.save(data);
            return new ResponseEntity<>(update, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") String id) {

        commentRepository.deleteById(id);
        return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);

    }

}
