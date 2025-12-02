package ma.ensaf.todo.repository;
import ma.ensaf.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
} 