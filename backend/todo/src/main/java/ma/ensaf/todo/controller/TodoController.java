package ma.ensaf.todo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;
import lombok.RequiredArgsConstructor;
import ma.ensaf.todo.service.TodoService;
import ma.ensaf.todo.entity.Todo;;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class TodoController {
    private final TodoService service;

    //afficher toutes  les taches
    @GetMapping
    public List<Todo> findAll(){
        return service.findAll();}
    //ajouter une nouvelle tache
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@RequestBody Todo todo){
        return service.createTodo(todo);
    }
    //modifier une tache
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo){
        return service.update(id, todo);
    }
    //supprimer une tache
    @DeleteMapping ("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        service.delete(id);
    }



    
    
    
}
