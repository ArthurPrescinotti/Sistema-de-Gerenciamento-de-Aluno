package org.CadastroAlunos.Service;


import org.CadastroAlunos.Model.Aluno;
import org.CadastroAlunos.Repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno save(Aluno aluno){
        alunoRepository.save(aluno);
        return aluno;
    }

    public List<Aluno> findAll(){
        return alunoRepository.findAll();
    }

    public Optional<Aluno> findById(String id){
        return alunoRepository.findById(id);
    }

    public void deleteById(String id){
        alunoRepository.deleteById(id);
    }
}
