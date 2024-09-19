import re
from pathlib import Path
import yaml


HERE = Path(__file__).parent
OUT = HERE / 'out'
EMENTARIO = HERE / 'ementario'


def carrega_capa():
    with open(EMENTARIO / 'capa.md') as capa_file:
        capa = capa_file.read()
    return capa


def carrega_template():
    with open(HERE / 'templates' / 'ementa.md') as template_file:
        template = template_file.read()
    return template


def carrega_ementas():
    ementas = {}
    for periodo in EMENTARIO.iterdir():
        if periodo.name == 'capa.md':
            continue
        if not periodo.is_dir():
            print(f'{periodo} não é um diretório')
            continue

        for disciplina in sorted(periodo.iterdir()):
            if not disciplina.is_dir():
                print(f'{disciplina} não é um diretório')
                continue

            with open(disciplina / 'index.md') as disciplina_file:
                disciplina_content = disciplina_file.read()

            meta_re = re.compile(r'^---\n(.*?)\n---\n', re.DOTALL)
            meta = meta_re.search(disciplina_content)
            if not meta:
                print(f'{disciplina} não tem metadados')
                continue
            ementa = meta_re.sub('', disciplina_content)

            meta = yaml.safe_load(meta.group(1))
            meta['ementa'] = ementa.strip()
            ementas.setdefault(periodo.name, []).append(meta)
    for disciplinas in ementas.values():
        disciplinas.sort(key=lambda disciplina: disciplina['ordem'])
    return ementas


if __name__ == '__main__':
    capa = carrega_capa()
    template = carrega_template()
    ementas = carrega_ementas()

    conteudo = capa + '\n\n\\newpage\n\n\\newpage\n\n'
    for periodo in sorted(ementas):
        periodo_ementas = ementas[periodo]
        for disciplina in periodo_ementas:
            conteudo += template.format(**disciplina) + '\n\n\\newpage\n\n'
    OUT.mkdir(exist_ok=True)
    with open(OUT / 'ementario.md', 'w') as outfile:
        outfile.write(conteudo)

