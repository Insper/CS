import fs from "fs"
import yaml from "yaml"

type DocsMeta = {
  slug?: string
  conteudo?: string
  slots: number
  trilha: "etica" | "projeto" | "programacao" | "ia" | "matematica" | "profissional" | "eletiva" | "sprint"
}

export type EmentaMeta = {
  titulo: string
  subtitulo?: string
  cargaHoraria: string
  periodo: string
  ordem: number
  docs: DocsMeta
}

const BASE = 'ementario'

export function carregaEmentas(): EmentaMeta[] {
  return fs
    .readdirSync(BASE)
    .filter((nomePeriodo) => fs.statSync(`${BASE}/${nomePeriodo}`).isDirectory())
    .map((nomePeriodo) => {
      return fs.readdirSync(`${BASE}/${nomePeriodo}`)
        .filter((disciplina) => fs.statSync(`${BASE}/${nomePeriodo}/${disciplina}`).isDirectory())
        .map((disciplina) => {
          const conteudoCompleto = fs.readFileSync(`${BASE}/${nomePeriodo}/${disciplina}/index.md`, 'utf-8');
          const [_, metaYaml, ...restante] = conteudoCompleto.split('---');

          const conteudo = restante.join('---').trim();
          const meta = yaml.parse(metaYaml) as EmentaMeta;
          meta.docs.conteudo = conteudo;
          meta.docs.slug = disciplina;
          return meta;
        })
    }).flat()
}

export function carregaEmentasPorPeriodo() {
  const ementas = carregaEmentas();
  const periodos: Record<string, EmentaMeta[]> = {};
  ementas.forEach((ementa) => {
    if (!periodos[ementa.periodo]) {
      periodos[ementa.periodo] = [];
    }
    periodos[ementa.periodo].push(ementa);
  });
  return periodos;
}
