package com.ait.util;

import com.ait.model.Post;
import com.ait.model.User;
import com.ait.repository.PostRepository;
import com.ait.repository.UserRepository;
import org.fluttercode.datafactory.impl.DataFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DatabaseInitilizer implements ApplicationRunner {
    private static final Logger LOG =
            LoggerFactory.getLogger(DatabaseInitilizer.class);

    private PostRepository postRepository;
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public DatabaseInitilizer(PostRepository postRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {

        LOG.info("Application started with option names : {}",
                Arrays.toString(args.getSourceArgs()));

        String command = Arrays.toString(args.getSourceArgs());

        if(command.equals("[initialize]")) {

            LOG.info("Initilizing Database with random data");
            initilizeData();

        }

    }

    public void initilizeData() {

        DataFactory dataFactory = new DataFactory();
        User user;
        Post post;
        List<User> userArrayList = new ArrayList<>();

        Random rand = new Random();

        for (int i = 0; i < 10; i++) {

            user = new User();
            user.setUsername(dataFactory.getRandomWord(4,10));
            user.setPassword("password");
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            userArrayList.add(user);

        }

        for (int i = 0; i < 100; i++) {

            post = new Post();
            post.setName(dataFactory.getRandomText(30));
            post.setContent(dataFactory.getRandomText(300));
            post.setAuthor(userArrayList.get(rand.nextInt(userArrayList.size())));
            postRepository.save(post);

        }

        System.exit(1);

    }
}
