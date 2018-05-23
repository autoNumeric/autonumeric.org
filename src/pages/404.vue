<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <br>
    <p class="text-faded">Whoops, there is nothing here...apart a shiny <strong>error 404</strong>!</p>
    <br>
    <p class="text-faded">You can check out the <router-link to="guide">documentation</router-link> or the <router-link to="configurator">option configurator</router-link> if you feel like it.</p>
    <br>
    <br>
    <p class="text-faded">That, or you can try to push this button:</p>
    <br/>
    <q-btn
      color="primary"
      style="width:200px;"
      @click="$router.push('/')"
    >Push me</q-btn>
    <br>
    <br>
    <p class="text-faded"><i>We know you want to ;)</i></p>
  </div>
</template>
