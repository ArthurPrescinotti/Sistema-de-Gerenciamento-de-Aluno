package org.CadastroAlunos.Model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter @Setter
public class Aluno {
    @Id
    private String id;
    private String nome;
    private String telefone;
    private String email;
    private String endereco;
}
