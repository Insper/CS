# CS

Repositório para documentos colaborativos do BCC.

## Versão completa do ementário em DOCX

Para gerar o arquivo DOCX com o ementário completo (também é gerado um arquivo Markdown com todo o conteúdo), execute o comando:

```
make docx
```

O arquivo é composto pela capa (arquivo `ementario/capa.md`) seguido pelas ementas de cada disciplina, que são renderizadas utilizando o template `templates/ementa.md`. Todo arquivo de ementa de disciplina deve seguir o padrão `ementario/periodoX/slug-da-disciplina/index.md` e deve começar com o seguinte cabeçalho:

```
---
titulo: Nome da disciplina
cargaHoraria: 80
periodo: 1
ordem: 1
---
```

- `titulo`: nome oficial da disciplina;
- `cargaHoraria`: número inteiro representando a carga horária em horas;
- `periodo`: semestre no qual a disciplina ocorre (número inteiro entre 1 e 8);
- `ordem`: número inteiro utilizado para ordenar as disciplinas de um mesmo período no ementário.
