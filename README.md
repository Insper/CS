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

onde

- `titulo`: nome oficial da disciplina;
- `cargaHoraria`: número inteiro representando a carga horária em horas;
- `periodo`: semestre no qual a disciplina ocorre (número inteiro entre 1 e 8);
- `ordem`: número inteiro utilizado para ordenar as disciplinas de um mesmo período no ementário.

## Site com o ementário em Vitepress

Sugerimos utilizar o [devcontainer](https://code.visualstudio.com/docs/devcontainers/containers) disponibilizado neste repositório, que já configura todas as dependências. Os seguintes comandos estão disponíveis:

- `yarn docs:dev`: executa a versão de desenvolvimento com hot reload em `http://localhost:5173`;
- `yarn docs:build`: gera a página estática (normalmente você não vai executar este comando);
- `yarn docs:preview`: serve a página estática gerada a partir do comando anterior em `http://localhost:4173` (normalmente você não vai executar este comando);

Além do cabeçalho obrigatório para o ementário em DOCX, o site depende dos seguintes valores:

```
docs:
  slots: 1
  trilha: "projeto"
```

onde

- `slots`: número de slots ocupados na grade (ver grade horária na página do ementário);
- `trilha`: string que indica a trilha à qual a disciplina pertence (os valores possíveis são `"etica"`, `"projeto"`, `"programacao"`, `"ia"`, `"matematica"`, `"profissional"`, `"eletiva"`, `"sprint"`).
