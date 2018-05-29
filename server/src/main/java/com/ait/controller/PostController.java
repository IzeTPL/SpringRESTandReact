package com.ait.controller;

import com.ait.model.Post;
import com.ait.repository.CommentRepository;
import com.ait.repository.PostRepository;
import com.ait.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.ait.model.User;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
public class PostController {

    private PostRepository postRepository;
    private UserRepository userRepository;
    private CommentRepository commentRepository;

    public PostController(PostRepository repository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = repository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    @GetMapping("/post")
    public List<Post> listAll() {

        return postRepository.findAll();

    }

    @GetMapping("/post/tag/{tags}")
    public List<Post> findByTag(@PathVariable("tags") String tags) {

        return postRepository.findAllByTags(tags);

    }

    @PostMapping("/post/create")
    public Post createPost(@Valid @RequestBody Post post) {

        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());

        User user = userRepository.findByUsername( (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal() );

        post.setAuthor(user.getUsername());

        return postRepository.save(post);

    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Post> getPost(@PathVariable("id") String id) {

        if(postRepository.findById(id).isPresent()) {

            return new ResponseEntity<>(postRepository.findById(id).get(), HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("/post/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") String id, @RequestBody Post post) {

        if(postRepository.findById(id).isPresent()) {

            Post data = postRepository.findById(id).get();
            Post update = postRepository.save(data);
            return new ResponseEntity<>(update, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") String id) {

        postRepository.deleteById(id);
        commentRepository.deleteAllByPostId(id);
        return new ResponseEntity<>("Entry and it's comments has been deleted!", HttpStatus.OK);

    }

}
