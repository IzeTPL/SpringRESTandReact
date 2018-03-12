package com.ait.demo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class DemoController {
    private DemoRepository demoRepository;

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

/*    @PutMapping("/customers/{id}")
    public ResponseEntity<Demo> updateCustomer(@PathVariable("id") String id, @RequestBody Demo demo) {

        Demo data = demoRepository.findOne(id);
        if (demo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        data.setName(demo.getName());
        Demo update = demoRepository.save(data);
        return new ResponseEntity<>(update, HttpStatus.OK);
    }*/

/*    @DeleteMapping("/customers/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") String id) {
        System.out.println("Delete Customer with ID = " + id + "...");

        demoRepository.delete(id);

        return new ResponseEntity<>("Entry has been deleted!", HttpStatus.OK);
    }*/

    @DeleteMapping("/customers/delete")
    public ResponseEntity<String> deleteAllCustomers() {
        System.out.println("Delete All Customers...");

        demoRepository.deleteAll();

        return new ResponseEntity<>("All entries have been deleted!", HttpStatus.OK);
    }

}