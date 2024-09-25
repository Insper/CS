import { carregaEmentas } from "../utils"

export default {
  paths() {
    return carregaEmentas().map((meta) => {
      const { titulo, cargaHoraria, docs, periodo } = meta;
      return {
        params: {
          titulo,
          subtitulo: meta.subtitulo || "",
          disciplina: `periodo${periodo}/${docs.slug}`,
          cargaHoraria,
          periodo,
        },
        content: docs.conteudo,
      }
    });
  }
}
