docx: build_single_markdown
	pandoc -f gfm -s out/ementario.md -o out/ementario.docx --lua-filter pandoc-filters/pagebreak.lua

build_single_markdown:
	python build_single_markdown.py
