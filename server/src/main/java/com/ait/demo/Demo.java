package com.ait.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Demo {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Demo() {}

    public Demo(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TEST{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}