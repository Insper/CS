import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { carregaEmentasPorPeriodo } from '../utils'

const ementasPorPeriodo = carregaEmentasPorPeriodo()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Insper Computer Science",
  description: "Ementário do bacharelado em Ciência da Computação do Insper",
  lang: 'pt-BR',

  vite: {
    plugins: [pagefindPlugin({
      locales: {
        root: {
          btnPlaceholder: 'Buscar',
          placeholder: 'Buscar ementa...',
          emptyText: 'Sem resultados',
          heading: 'Total: {{searchResult}} resultados.',
        }
      }
    })],
  },

  transformPageData: (pageData) => {
    if (!pageData.params) {
      pageData.params = {};
    }
    if (pageData.params.titulo) {
      pageData.title = pageData.params.titulo
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Ementário', link: '/ementario' }
    ],
    search: {
      provider: 'local'
    },

    sidebar: Object.entries(ementasPorPeriodo).map(([periodo, ementas]) => ({
      text: `${periodo}º período`,
      items: ementas.map(({ titulo, subtitulo, docs }) => ({
        text: titulo + (subtitulo ? " - " + subtitulo : ''),
        link: `/ementario/periodo${periodo}/${docs.slug}`
      }))
    })),

    docFooter: {
      prev: 'Anterior',
      next: 'Próximo'
    },

    outline: {
      label: 'Nesta página'
    },

    lastUpdated: {
      text: 'Atualizado em',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: 'Alterar Idioma',
    returnToTopLabel: 'Voltar ao Topo',
    sidebarMenuLabel: 'Menu Lateral',
    darkModeSwitchLabel: 'Tema Escuro',
    lightModeSwitchTitle: 'Mudar para Modo Claro',
    darkModeSwitchTitle: 'Mudar para Modo Escuro'
  }
});
