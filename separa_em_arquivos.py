from pathlib import Path
from collections import defaultdict
import unicodedata
import re


HERE = Path(__file__).parent
EMENTARIO = HERE / 'ementario'


def main():
    with open(HERE / 'ementario.md', 'r') as f:
        ementario_completo = f.read()
    indice = defaultdict(list)

    for ementa in ementario_completo.split('\\newpage'):
        ementa = ementa.strip()
        if not ementa:
            continue
        titulo, slug, semestre, carga_horaria, conteudo = parse_ementa(ementa)
        if titulo == 'Insper Computer Science':
            continue
        if titulo and slug and semestre and carga_horaria and conteudo:
            indice[semestre].append((titulo, slug))
            salva_ementa(titulo, slug, semestre, carga_horaria, conteudo)
        else:
            imprime_erro(ementa, titulo, slug, semestre, carga_horaria, conteudo)

    # # Imprime índice
    # for semestre, materias in indice.items():
    #     if not materias:
    #         continue
    #     print(f'## {semestre}º período\n')
    #     for titulo, slug in materias:
    #         print(f'- [{titulo}](./periodo{semestre}/{slug})')
    #     print()


    # # Imprime sidebar
    # entradas = []
    # for semestre, materiais in indice.items():
    #     if not materiais:
    #         continue
    #     items = ',\n'.join([f"          {{ text: '{titulo}', link: '/ementario/periodo{semestre}/{slug}' }}" for titulo, slug in materiais])
    #     entradas.append(f'''      {{
    #         text: "{semestre}º período",
    #         items: [
    # {items}
    #         ]
    #     }}''')
    # print(',\n'.join(entradas))


def parse_ementa(ementa):
    titulo, slug, semestre, carga_horaria, linhas_conteudo = None, None, None, None, []
    for linha in ementa.split('\n'):
        if not titulo:
            titulo = extrai_regex(linha, r'# (.*)')
            if titulo:
                slug = extrai_slug(titulo)
                continue
        if not semestre:
            semestre = extrai_regex(linha, r'(\d+)(.*)\s+período')
            if semestre:
                continue
        if not carga_horaria:
            carga_horaria = extrai_regex(linha, r'Carga [Hh]orária:\s+(\d+)')
            if carga_horaria:
                continue
        linhas_conteudo.append(linha)
    return titulo, slug, semestre, carga_horaria, '\n'.join(linhas_conteudo)


def salva_ementa(titulo, slug, semestre, carga_horaria, conteudo):
    diretorio = EMENTARIO / f'periodo{semestre}' / slug
    diretorio.mkdir(parents=True, exist_ok=True)
    with open(diretorio / 'index.md', 'w') as f:
        f.write(conteudo.strip() + '\n')
    with open(diretorio / 'meta.yml', 'w') as f:
        f.write(f'''titulo: {titulo}
cargaHoraria: {carga_horaria}
periodo: {semestre}
''')


def imprime_erro(ementa, titulo, slug, semestre, carga_horaria, conteudo):
    print(f'Erro ao processar:\n{ementa}\n')
    if not titulo:
        print('Título não encontrado')
    if not slug:
        print('Slug não encontrado')
    if not semestre:
        print('Semestre não encontrado')
    if not carga_horaria:
        print('Carga horária não encontrada')
    if not conteudo:
        print('Conteúdo não encontrado')


def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
        if unicodedata.category(c) != 'Mn')


def extrai_regex(linha, regex):
    match = re.search(regex, linha)
    if not match:
        return None
    return match.group(1).strip()


def extrai_slug(titulo):
    if 'Developer Life' in titulo:
        titulo = 'Vida de Desenvolvedor de Software'
    return strip_accents(titulo.replace(',', '').replace(' ', '-').lower())


if __name__ == '__main__':
    main()
