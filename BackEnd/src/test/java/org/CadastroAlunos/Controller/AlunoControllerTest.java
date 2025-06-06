package org.CadastroAlunos.Controller;

import org.CadastroAlunos.Constant.Constant;
import org.CadastroAlunos.Model.Aluno;
import org.CadastroAlunos.Service.AlunoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@SpringBootTest
class AlunoControllerTest {

//    @Autowired
//    private TestRestTemplate restTemplate;

    @Autowired
    private AlunoService alunoService;

//    String apiCadastro= "http://localhost:8090/projeto/api/v1/alunoCadastro";
//    String apiConsulta= "http://localhost:8090/projeto/api/v1/alunoConsulta";

    @Test
    void createAluno() {
        Aluno aluno = new Aluno();
        aluno.setNome("a");
        aluno.setEmail("a");
        aluno.setTelefone("1");
        aluno.setEndereco("a");

//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Aluno> request = new HttpEntity<>(aluno, headers);
//
//        ResponseEntity<Aluno> response = restTemplate.postForEntity(apiCadastro, request, Aluno.class);
//
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
//        assertThat(response.getBody()).isNotNull();

        alunoService.save(aluno);
        List<Aluno> alunos = alunoService.findAll();

        boolean alunoEncontrado = false;

        for (Aluno aux : alunos){
            if(aux.getNome().equals(aluno.getNome())){
                alunoEncontrado = true;
                break;
            }
        }
        assertThat(alunoEncontrado).isTrue();
    }


    @Test
    void updateAluno() {
//        Aluno alunoCriado = criarAlunoTeste();
//        alunoCriado.setNome("b");
//        alunoCriado.setEmail("b");
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Aluno> request = new HttpEntity<>(alunoCriado, headers);
//
//        ResponseEntity<Aluno> response = restTemplate.exchange(apiCadastro, HttpMethod.PUT, request, Aluno.class);
//
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(response.getBody()).isNotNull();
//        assertThat(response.getBody().getNome()).isEqualTo("b");
//        assertThat(response.getBody().getEmail()).isEqualTo("b");

        Aluno aluno = new Aluno();
        aluno.setNome("a");
        aluno.setEmail("a");
        aluno.setTelefone("1");
        aluno.setEndereco("a");

        alunoService.save(aluno);

        aluno.setNome("b");
        aluno.setEmail("b");
        aluno.setTelefone("b");
        aluno.setEndereco("b");

        alunoService.save(aluno);


        Optional<Aluno> alunoAtualizado  = alunoService.findById(aluno.getId());

        assertThat(alunoAtualizado).isPresent();
        assertThat(alunoAtualizado.get().getNome()).isEqualTo("b");
        assertThat(alunoAtualizado.get().getEmail()).isEqualTo("b");
        assertThat(alunoAtualizado.get().getTelefone()).isEqualTo("b");
        assertThat(alunoAtualizado.get().getEndereco()).isEqualTo("b");
    }

    @Test
    void deleteById() {
//        String idDelete = "1";
//        String url = apiCadastro + '/' + idDelete;
//
//        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.DELETE, null, Void.class);
//
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

        Aluno aluno = new Aluno();
        aluno.setNome("a");
        aluno.setEmail("a");
        aluno.setTelefone("1");
        aluno.setEndereco("a");

        alunoService.save(aluno);

        alunoService.deleteById(aluno.getId());

        Optional<Aluno> alunoDeletado = alunoService.findById(aluno.getId());

        assertThat(alunoDeletado).isEmpty();
        assertThat(alunoDeletado.isPresent()).isFalse();

    }

    @Test
    void findAll() {
//        ResponseEntity<Aluno[]> response = restTemplate.getForEntity(apiConsulta, Aluno[].class);
//
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(response.getBody()).isNotNull();
//
//        Aluno[] alunos = response.getBody();
//        assertThat(alunos.length).isGreaterThanOrEqualTo(0);

        Aluno aluno = new Aluno();
        aluno.setNome("a");
        aluno.setEmail("a");
        aluno.setTelefone("1");
        aluno.setEndereco("a");

        alunoService.save(aluno);
        List<Aluno> alunos = alunoService.findAll();

        boolean alunoEncontrado = false;

        for (Aluno aux : alunos){
            if(aux.getNome().equals(aluno.getNome())){
                alunoEncontrado = true;
                break;
            }
        }
        assertThat(alunoEncontrado).isTrue();
    }

    @Test
    void findById() {
//        Aluno alunoCriado = criarAlunoTeste();
//        String idFind = alunoCriado.getId();
//        String url = apiConsulta + '/' + idFind;
//
//        ResponseEntity<Aluno> response = restTemplate.getForEntity(url, Aluno.class);
//
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//        assertThat(response.getBody()).isNotNull();
//        Aluno aluno = response.getBody();
//        assertThat(aluno.getId()).isEqualTo(idFind);

        Aluno aluno = new Aluno();
        aluno.setNome("a");
        aluno.setEmail("a");
        aluno.setTelefone("1");
        aluno.setEndereco("a");

        alunoService.save(aluno);

        Optional<Aluno> alunoBuscado = alunoService.findById(aluno.getId());

        assertThat(alunoBuscado).isPresent();
        assertThat(alunoBuscado.get().getNome()).isEqualTo("a");
    }

//    private Aluno criarAlunoTeste() {
//        Aluno aluno = new Aluno();
//        aluno.setNome("a");
//        aluno.setEmail("a");
//        aluno.setTelefone("1");
//        aluno.setEndereco("a");
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Aluno> request = new HttpEntity<>(aluno, headers);
//        ResponseEntity<Aluno> response = restTemplate.postForEntity(apiCadastro, request, Aluno.class);
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
//        return response.getBody();
//    }
}