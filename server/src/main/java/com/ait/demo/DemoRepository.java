package com.ait.demo;

import org.springframework.data.jpa.repository.JpaRepository;

interface DemoRepository extends JpaRepository<Demo, Long> {
}
