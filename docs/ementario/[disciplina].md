---
title: {$params.titulo}
---

<script setup>
import { useData } from 'vitepress'
const { params } = useData()
</script>

# {{ $params.titulo }}

<div v-if="params.subtitulo" :class="$style.subtitulo">{{ params.subtitulo }}</div>

<div :class="$style.infobox">
  <p><strong>Carga Horária:</strong> {{ $params.cargaHoraria }} horas</p>
  <span :class="$style.badge">{{ $params.periodo }}º período</span>
</div>

<!-- @content -->

<style module>
.subtitulo {
  color: var(--vp-c-text-2);
  font-size: 1.5em;
}

.badge {
  color: var(--vp-c-white);
  font-weight: bold;
  background-color: var(--vp-c-brand-3);
  font-size: 0.8em;
  width: fit-content;
  padding: 0.1em 0.4em;
  border-radius: 0.2em;
}

.infobox {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
}

.infobox p {
  margin: 0;
}
</style>
