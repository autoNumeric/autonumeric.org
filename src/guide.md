---
layout: AnPage
title: Options
lead: This page has moved.
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=/options
---

<script setup>
import { onMounted } from 'vue';

// Keeps old links such as /guide#decimalPlaces working
onMounted(() => window.location.replace(`/options${window.location.hash}`));
</script>

The option reference is now on the [Options](/options) page.
