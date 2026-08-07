# Espaço Karolyna Beauty

Landing page responsiva desenvolvida a partir do protótipo visual fornecido. O projeto usa HTML, CSS e JavaScript puros, sem etapa de build.

## Executar

Abra `index.html` diretamente no navegador ou inicie um servidor local:

```powershell
python -m http.server 4180
```

Depois, acesse `http://localhost:4180`.

## Publicacao no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` publica o site automaticamente
quando houver um push para a branch `main`. Tambem e possivel iniciar uma
publicacao manual pela aba **Actions** do repositorio.

Depois do primeiro deploy, o site fica disponivel em:

`https://hygoroliveira615-max.github.io/espaco-karolyna-beauty/`

Para acompanhar a publicacao pelo terminal:

```powershell
gh run list --workflow deploy-pages.yml
gh run watch
```

## Personalização antes de publicar

- Substitua o link genérico do WhatsApp em `script.js` pelo número oficial no formato `https://wa.me/55DDDNUMERO?text=...`.
- Confirme o perfil do Instagram usado em `index.html`.
- Troque os recortes em `assets/images` pelos arquivos originais em alta resolução quando estiverem disponíveis.
