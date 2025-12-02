package ma.ensaf.todo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ma.ensaf.todo.repository.TodoRepository;
import ma.ensaf.todo.entity.Todo;
import java.util.*;
@Service
public class TodoService {
    @Autowired
    private TodoRepository repo;

    //la logique metier
    //lister tous les taches
    public List<Todo> findAll(){
        return repo.findAll();
    }
    //lister tous by id
    public Todo findById(Long id){
        return repo.findById(id).orElseThrow(()->new RuntimeException("Todo not found"));
    }
    //creer une tache
    public Todo createTodo(Todo todo) {
        return repo.save(todo);
    }
    //update
    public Todo update(Long id,Todo todo){
        todo.setId(id);
        return repo.save(todo);
    }
    //delete
    public void delete(Long id){
         repo.deleteById(id);
    }

    
}
