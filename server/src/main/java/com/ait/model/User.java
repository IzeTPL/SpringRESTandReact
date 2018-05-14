package com.ait.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "user")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String username;

    private String password;

    private List<String> posts;

    @Transient
    private boolean keepLogged;

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isKeepLogged() {
        return keepLogged;
    }

    public void setKeepLogged(boolean keepLogged) {
        this.keepLogged = keepLogged;
    }
}
