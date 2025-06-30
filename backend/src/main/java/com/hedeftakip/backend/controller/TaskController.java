package com.hedeftakip.backend.controller;

import com.hedeftakip.backend.entity.Task;
import org.springframework.web.bind.annotation.*;
import com.hedeftakip.backend.repository.TaskRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAll(){
        return taskRepository.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task){
        return taskRepository.save(task);
    }
}
