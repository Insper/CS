import { EmentaMeta, carregaEmentasPorPeriodo } from "../utils"

export default {
  paths() {
    const ementasPorPeriodo = carregaEmentasPorPeriodo();
    adicionaUltimosSemestres(ementasPorPeriodo);

    let grade = '<div class="grade">\n';
    Object.entries(ementasPorPeriodo).forEach(([periodo, ementas]) => {
      const ementasSemSprint = ementas.filter(e => e.docs.trilha !== "sprint");

      grade += `  <div class="grade--header">${periodo}º SEM</div>\n`;
      grade += ementasSemSprint.sort((e1, e2) => getIndiceTrilha(e1) - getIndiceTrilha(e2)).map(({ titulo, subtitulo, docs }) => {
        const { slots, trilha, slug } = docs;
        let classList = ["grade--cell", `trilha--${trilha}`];
        if (slots > 1) {
          classList.push(`grade--span--${slots}`);
        }
        if (slug) {
          return `  <a href="./periodo${periodo}/${slug}" class="${classList.join(" ")}">${titulo}${subtitulo ? " - " + subtitulo : ""}</a>`
        }
        return `  <span href="./periodo${periodo}/${slug}" class="${classList.join(" ")}">${titulo}${subtitulo ? " - " + subtitulo : ""}</span>`
      }
      ).join("\n");
      if (parseInt(periodo) <= 4) {
        const sprint = ementas.find(e => e.docs.trilha === "sprint");
        if (sprint) {
          const { titulo, subtitulo, docs } = sprint;
          const className = "grade--span--6 trilha--sprint";
          const tituloCompleto = `${titulo}${subtitulo ? " - " + subtitulo : ""}`;
          if (docs.slug) {
            grade += `  <a href="./periodo${periodo}/${docs.slug}" class="${className}">${tituloCompleto}</a>\n`;
          } else {
            grade += `  <span class="${className}">${tituloCompleto}</span>\n`;
          }
        } else {
          grade += `  <div class="grade--span--6 trilha--sprint">Sessão Sprint ${periodo}</div>\n`;
        }
      }
    });
    grade += "</div>\n";

    return [
      {
        params: {
          index: "index",
        },
        content: `${grade}`,
      },
    ]
  }
}

function getIndiceTrilha(ementa: EmentaMeta) {
  const trilhas = ["projeto", "etica", "matematica", "programacao", "ia", "eletiva", "profissional"];
  return trilhas.indexOf(ementa.docs.trilha);
}

function criaEletiva(periodo: number) {
  return {
    titulo: "Eletiva",
    cargaHoraria: 72,
    periodo,
    docs: {
      slots: 1,
      trilha: "eletiva"
    }
  }
}

function adicionaUltimosSemestres(ementasPorPeriodo) {
  ementasPorPeriodo['7'] = [
    criaEletiva(7), criaEletiva(7), criaEletiva(7), {
      titulo: "Estágio Supervisionado 1",
      cargaHoraria: 140,
      periodo: 7,
      docs: {
        slots: 2,
        trilha: "profissional"
      }
    }
  ]
  ementasPorPeriodo['8'] = [
    criaEletiva(8), criaEletiva(8), criaEletiva(8), {
      titulo: "Estágio Supervisionado 2",
      cargaHoraria: 140,
      periodo: 8,
      docs: {
        slots: 2,
        trilha: "profissional"
      }
    }
  ]
}
