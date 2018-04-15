package com.ait.controller;

import com.ait.model.Post;
import com.ait.repository.PostRepository;
import com.ait.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.ait.model.User;

import javax.validation.Valid;
import java.util.List;

@RestController
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository repository) {
        this.postRepository = repository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/post")
    public List<Post> listAll() {

        return postRepository.findAll();

    }

    @PostMapping("/post/create")
    public Post createEntry(@Valid @RequestBody Post post) {

        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = new User();

        post.setAuthor(user);

        return postRepository.save(post);

    }

    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updateCustomer(@PathVariable("id") String id, @RequestBody Post post) {

        if(postRepository.findById(id).isPresent()) {

            Post data = postRepository.findById(id).get();
            //data.setName(demo.getName());
            Post update = postRepository.save(data);
            return new ResponseEntity<>(update, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {

        postRepository.deleteById(id);
        return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);

    }

    @DeleteMapping("/post/delete")
    public ResponseEntity<String> deleteAllCustomers() {

        postRepository.deleteAll();
        return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);

    }

}
