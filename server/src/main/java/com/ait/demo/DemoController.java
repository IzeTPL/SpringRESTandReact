package com.ait.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class DemoController {
    private DemoRepository repository;

    public DemoController(DemoRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/test")
    public Collection<Demo> goodBeers() {
        return repository.findAll().stream()
                .filter(this::isGreat)
                .collect(Collectors.toList());
    }

    private boolean isGreat(Demo demo) {
        return !demo.getName().equals("Budweiser") &&
                !demo.getName().equals("Coors Light") &&
                !demo.getName().equals("PBR");
    }
}