package com.hedeftakip.backend.controller;

import com.hedeftakip.backend.entity.Task;
import org.springframework.http.ResponseEntity;
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


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(taskRepository.existsById(id)){
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build(); //204 no content
        } else {
            return ResponseEntity.notFound().build(); // 404 not found
        }
    }
}
