package com.ait.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class DemoCommandLineRunner implements CommandLineRunner {

    private final DemoRepository repository;

    public DemoCommandLineRunner(DemoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Stream.of("Ale", "to", "jest", "to",
                "jest", "fajna", "niespodzianka").forEach(name ->
                repository.save(new Demo(name))
        );
        repository.findAll().forEach(System.out::println);
    }
}
