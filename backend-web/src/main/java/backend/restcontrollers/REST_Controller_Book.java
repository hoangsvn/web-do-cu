package backend.restcontrollers;

import java.util.Base64;
import java.util.Optional;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import backend.models.Books;
import backend.models.Category;
import backend.payload.request.Request_Book;
import backend.payload.response.Response_Message;
import backend.repository.Repository_Book;
import backend.repository.Repository_Category;
import org.springframework.security.access.prepost.PreAuthorize;

@CrossOrigin
@RestController
@RequestMapping("/api/book")
public class REST_Controller_Book {

    @Autowired
    private Repository_Book bookRepository;

    @Autowired
    private Repository_Category categoryRepository;

    @PostMapping("/add")
    public ResponseEntity<?> AddBook(@Valid @RequestBody Request_Book book) {

        try {
            Books books = new Books();
            books.setAuthor(book.getAuthor());
            books.setName(book.getName());
            books.setCount(book.getCount());
            books.setImage(book.getImage());
            bookRepository.save(books);
            return ResponseEntity.ok(new Response_Message("Book Add successfully!", "Add Book", true));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response_Message("Book Add Fail!", "Add Book", false));
        }

    }
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/update")
    public ResponseEntity<?> UpdateBook(@Valid @RequestBody Request_Book book) {

        try {
            Books books = bookRepository.findById(book.getId()).get();
            books.setAuthor(book.getAuthor());
            books.setName(book.getName());
            books.setCount(book.getCount());
            book.getCategorys().forEach(item -> {
                Optional<Category> ca = categoryRepository.findById(item);
                books.getCategorys().add(ca.get());
            });
            books.setImage(book.getImage());
            bookRepository.save(books);
            return ResponseEntity.ok(new Response_Message("Book Update successfully!", "Update Book", true));

        } catch (Exception e) {
            return ResponseEntity.ok(new Response_Message("Book Update Fail!", "Update Book", false));
        }
    }

    @GetMapping("/bookid={id}")
    public ResponseEntity<?> IdBook(@PathVariable String id) {
        try {
            Long bid = Long.parseLong(id);
            if (bookRepository.existsById(bid)) {
                Books books = bookRepository.findById(bid).get();
                String gson = new Gson().toJson(books);
                return ResponseEntity.ok(gson);
            } else {
                return ResponseEntity.ok(new Response_Message("Book ID Not Found!", "Find Book by Id", false));
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(new Response_Message("Book ID Is Mumber!", "Find Book by Id", false));
        }
    }

    @GetMapping("/img/bookid={bid}")
    @ResponseBody
    public ResponseEntity<?> Book(@PathVariable String bid) {
        try {
            Books books = bookRepository.findById(Long.parseLong(bid)).get();
            byte[] data = Base64.getDecoder().decode(books.getImage());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).header(HttpHeaders.CONTENT_DISPOSITION).body(data);
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(new Response_Message("Img Not Found", "Photo Book", false));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> AllBook() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    @GetMapping("/search={search}")
    public ResponseEntity<?> Search(@PathVariable String search) {
        try {
            String gson = new Gson().toJson(bookRepository.Search(search));
            return ResponseEntity.ok(gson);
        } catch (Exception e) {
            return ResponseEntity.ok(new Response_Message("Not Found!", "Find Search", false));
        }
    }

}
