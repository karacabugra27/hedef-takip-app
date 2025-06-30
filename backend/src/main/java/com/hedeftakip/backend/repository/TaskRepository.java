package com.hedeftakip.backend.repository;

import com.hedeftakip.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
