package com.ait.repository;

import com.ait.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

        User findByUsername(String username);

}
