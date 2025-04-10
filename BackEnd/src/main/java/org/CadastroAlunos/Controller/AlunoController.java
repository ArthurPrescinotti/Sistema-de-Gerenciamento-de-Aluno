package org.CadastroAlunos.Controller;


import org.CadastroAlunos.Constant.Constant;
import org.CadastroAlunos.Model.Aluno;
import org.CadastroAlunos.Service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE})
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping(Constant.API_ALUNO_CADASTRO)
    public ResponseEntity<Aluno> createAluno(@RequestBody Aluno aluno){
        Aluno savedAluno = alunoService.save(aluno);
        return  ResponseEntity.status(HttpStatus.CREATED).body(savedAluno);
    }

    @PutMapping(Constant.API_ALUNO_CADASTRO)
    public ResponseEntity<Aluno> updateAluno(@RequestBody Aluno aluno){
        Aluno savedAluno = alunoService.save(aluno);
        return ResponseEntity.ok(savedAluno);
    }

    @DeleteMapping(Constant.API_ALUNO_CADASTRO + "/{id}")
    public ResponseEntity<Aluno> deleteById (@PathVariable("id") String id){
        alunoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constant.API_ALUNO_CONSULTA)
    public ResponseEntity<List<Aluno>> findAll(){
        return ResponseEntity.ok(alunoService.findAll());
    }

    @GetMapping(Constant.API_ALUNO_CONSULTA + "/{id}")
    public ResponseEntity<Optional<Aluno>> findById(@PathVariable("id") String id){
        return ResponseEntity.ok(alunoService.findById(id));
    }

}
