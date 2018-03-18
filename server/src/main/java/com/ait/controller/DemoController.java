package com.ait.controller;

import com.ait.model.Demo;
import com.ait.repository.DemoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
public class DemoController {
    private final DemoRepository demoRepository;

    public DemoController(DemoRepository repository) {
        this.demoRepository = repository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/demo")
    public List<Demo> listAll() {

        return demoRepository.findAll();

    }

    @PostMapping("/demo/create")
    public Demo createEntry(@Valid @RequestBody Demo demo) {

        return demoRepository.save(demo);

    }

    @PutMapping("/demo/{id}")
    public ResponseEntity<Demo> updateCustomer(@PathVariable("id") String id, @RequestBody Demo demo) {

        if(demoRepository.findById(id).isPresent()) {

            Demo data = demoRepository.findById(id).get();
            data.setName(demo.getName());
            Demo update = demoRepository.save(data);
            return new ResponseEntity<>(update, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);


    }

    @DeleteMapping("/demo/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {

        demoRepository.deleteById(id);
        return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);

    }

    @DeleteMapping("/demo/delete")
    public ResponseEntity<String> deleteAllCustomers() {

        demoRepository.deleteAll();
        return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);

    }

}