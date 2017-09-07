<template>
	<div class="homepage">
		<!--<img src="~assets/quasar-logo-full.svg" alt="Quasar PWA">-->
		<h5>Welcome to your Quasar PWA</h5>
		<ul>
			<li><a href="http://quasar-framework.org" target="_blank" rel="noopener">Docs</a></li>
			<li><a href="http://forum.quasar-framework.org" target="_blank" rel="noopener">Forum</a></li>
			<li><a href="https://gitter.im/quasarframework/Lobby" target="_blank" rel="noopener">Gitter Chat</a></li>
			<li><a href="https://twitter.com/quasarframework" target="_blank" rel="noopener">Twitter</a></li>
		</ul>
		<p class="caption" v-for="n in 100">
			<em>Center elements to scroll</em>
		</p>
	</div>
</template>

<script>
    export default {
        name: 'hello',
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
	@import '~variables'

	.homepage
		margin-top 50px
		a
			color #35495E

	ul
		list-style-type none
		padding 0

	li
		display inline-block
		margin 0 10px
</style>
