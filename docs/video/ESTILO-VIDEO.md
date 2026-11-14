# Guia de estilo: vídeos de retenção do Radar de Ofertas

Referência: `canetas_retencao_v6` (creme de avelã, 33 s). Todos os valores abaixo foram medidos no arquivo original, não estimados.

Objetivo do formato: **segurar a pessoa até o fim e levar ao clique na oferta**. Cada regra aqui existe para isso.

---

## 1. Especificações técnicas

| Item | Original (para redes) | Versão do site |
|---|---|---|
| Formato | Vertical 9:16, 1080×1920 | 720×1280 |
| Frame rate | 29,97 fps | 29,97 fps |
| Duração | 30–35 s | igual |
| Vídeo | H.264 | H.264 High, CRF 26, `+faststart` |
| Áudio | AAC 48 kHz estéreo | AAC 96 kbps |
| Loudness | **−13,5 LUFS** integrado, LRA 4,6 LU, pico −0,6 dB | igual |
| Peso | ~16 MB | **~4 MB** (máx. 6 MB) |

Áudio: mire em **−14 LUFS ±1** e pico máximo de −1 dB. O original está no limite (−0,6 dB). Abaixe 0,5 dB no master para não distorcer no TikTok e no Reels.

Comando para gerar a versão do site:

```bash
ffmpeg -i ORIGINAL.mp4 -vf scale=720:1280 -c:v libx264 -preset slow -crf 26 \
  -profile:v high -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart \
  public/videos/<pasta>/<nome-do-produto>.mp4
```

---

## 2. Paleta

| Token | Hex | Uso |
|---|---|---|
| `amarelo` | `#FDE500` | Barra de progresso, caixas de destaque, números grandes, palavra-chave |
| `preto-caixa` | `#0A0E0F` | Caixa de texto secundária ("DA NUTELLA?") |
| `fundo-escuro` | `#252324` | Telas de dado, com textura de listras diagonais e brilho amarelo |
| `fundo-claro` | `#EDEDE8` | Tela da "lupa" (rótulo nutricional) |
| `branco` | `#FFFFFF` | Texto principal, com contorno preto |

Regra: **só amarelo, preto e branco nos grafismos.** A cor vem da filmagem e do B-roll. O amarelo é a única cor de destaque, por isso o olho vai direto nele.

---

## 3. Tipografia

| Papel | Estilo | Fonte sugerida |
|---|---|---|
| Legenda principal | Caixa alta, bold condensado, itálico leve, contorno preto de 4–6 px | Montserrat Black Italic / Anton |
| Palavra-chave | Mesma fonte, **texto preto dentro de caixa amarela** | Montserrat Black Italic |
| Palavra de ênfase emocional | **Serifada itálica, minúscula, amarela** ("metade", "avelã", "lupa") | Playfair Display Italic / Instrument Serif Italic |
| Tag de B-roll | Caixa alta, sem serifa, extrabold, sem itálico | Inter ExtraBold / Montserrat ExtraBold |
| Número de dado | Ultra black, ~280–320 px de altura, amarelo | Inter Black / Montserrat Black |

Os três estilos de legenda juntos (caps branco + caixa amarela + serifa itálica) são a marca visual do formato. Não troque por legenda automática simples.

---

## 4. Elementos fixos

### Barra de progresso (topo)
- Altura de **14 px**, cor `#FDE500`, colada no topo (y = 0), crescendo da esquerda para a direita, linear com a duração.
- Função: mostra que o vídeo é curto e "está quase acabando", o que reduz o abandono.

### Gancho no topo (0–1,5 s)
- Pergunta em **2 linhas**: linha 1 em caixa amarela com texto preto, linha 2 em caixa preta com texto branco.
- Posição: centralizado, entre y ≈ 130 e 345 px (topo, fora da zona dos botões das redes).
- Fica visível também durante o primeiro B-roll, para segurar o contexto.

---

## 5. Tipos de tela

| Tipo | Quando usar | Layout |
|---|---|---|
| **A. Fala** (podcast/apresentador) | Argumento, opinião | Rosto no terço superior; legenda cinética de 2–3 linhas em **y ≈ 1000–1400 px**, sobre o microfone |
| **B. B-roll + tag** | Ilustrar um substantivo (avelã, prateleira, caneta, doces) | Imagem na metade superior; faixa escura em degradê embaixo; tag amarela + linha branca centralizadas em y ≈ 1200–1450 |
| **C. Dado** | Número que prova a promessa (−50%, 11 g, 0 g) | Fundo escuro texturizado com brilho amarelo; rótulo pequeno em cima, número gigante, rótulo branco embaixo; opcional: barra comparativa (COMUM 100% × ESTE 50%) |
| **D. Lupa** | Comparação com o rótulo frontal (alto em açúcar/gordura) | Fundo claro `#EDEDE8`; caixa preta imitando o selo; item ativo em amarelo; pergunta curta embaixo ("JÁ VIU AQUELA LUPA?") |

Entrada das telas C e D: corte seco ou fade rápido de 3–5 frames, nunca transição de efeito.

---

## 6. Ritmo e estrutura

**19 cortes em 33 s, ou seja, um plano a cada 1,7 s em média.** Nunca passe de 3 s no mesmo plano sem mudar algo (corte, zoom, grafismo).

Linha do tempo do vídeo de referência:

| Tempo | Tela | Função |
|---|---|---|
| 0–1,5 s | A + gancho no topo | **Gancho:** pergunta com número ("metade das calorias da…?") |
| 1,5–3 s | B: avelãs | Prova visual: "tem avelã de verdade" |
| 3–5 s | A | Repete a promessa: "tem a **metade** das calorias" |
| 5–7 s | A (2º rosto) | Reação/validação: "isso aí" |
| 7–9 s | B: prateleira | Inimigo comum: "indústria de alimentação" |
| 9–14 s | A / B: caneta / A | Contexto e tensão: "o desafio", "caneta emagrecedora", "as pessoas…" |
| 12–13 s | B: doces | Dor: "resistem ao doce" |
| 15–16 s | C: −50% | **Prova 1** |
| 17–20 s | A / B: comparação | Reforço da comparação |
| 21–24 s | C: 11 g · A · C: 0 g | **Prova 2 e 3** |
| 25–31 s | D: lupa | **Prova 4:** "ele não tem lupa" |
| 32–33 s | A | Fecho: "ele não tem **lupa**" |

Fórmula: **Gancho com número → prova visual → inimigo/dor → 3–4 provas em telas de dado → fecho com a frase mais forte.**

---

## 7. Thumbnail

Template pronto: `docs/video/thumbnail-template.html`, com 1080×1920. Troque `foto.jpg`, a tag, o título e os 2 números.

- Tag amarela no topo ("CREME DE AVELÃ COM"), título em 2 linhas com 1 palavra em amarelo.
- Foto do produto ou ingrediente no meio, **sem rosto de terceiros**.
- 2 cards de número embaixo (a promessa em dados).
- Barra amarela na base, para manter a mesma identidade da barra de progresso.
- Exporte em 720×1280 JPG (~130 KB) para `public/videos/<pasta>/thumb-<produto>.jpg`.

Para gerar o PNG do template:

```bash
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+process.cwd()+'/docs/video/thumbnail-template.html');await p.screenshot({path:'thumb.png'});await b.close()})()"
```

---

## 8. Checklist antes de publicar

- [ ] Gancho com número ou pergunta nos primeiros 1,5 s
- [ ] Barra de progresso de 14 px no topo
- [ ] Nenhum plano com mais de 3 s sem mudança
- [ ] Pelo menos 3 telas de dado (C/D)
- [ ] **Números consistentes.** No v6 aparece "11 g de proteína" na tela e "tem 15 gramas" na fala. Escolha um e indique a porção ("por 30 g").
- [ ] Afirmações nutricionais conferidas no rótulo do produto
- [ ] Direito de uso dos trechos de terceiros (podcast, imagens de marcas)
- [ ] Loudness −14 LUFS ±1, pico ≤ −1 dB
- [ ] Versão do site ≤ 6 MB com `+faststart`
- [ ] Link de afiliado cadastrado no painel (botão "Ver oferta")

## 9. Como medir

No Vercel Analytics, eventos da seção de vídeos da home:

- `video_play`: quantas pessoas deram play
- `video_complete`: quantas assistiram até o fim (retenção)
- `video_cta_click`: quantas clicaram em "Ver oferta"

Métricas: **taxa de conclusão** = `video_complete ÷ video_play`; **CTR do vídeo** = `video_cta_click ÷ video_play`. Ao testar uma variação deste guia (outro gancho, outra thumbnail), mude **uma coisa por vez** e compare essas duas taxas.
