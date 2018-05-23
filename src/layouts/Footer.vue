<template>
	<div id="footer">
		<ul class="nav">
			<li><router-link to="guide">Documentation</router-link></li>
			<li><router-link to="examples">Examples</router-link></li>
			<li><router-link to="configurator">Configuration generator</router-link></li>
			<li><router-link to="contacts">Contact</router-link></li>
			<li><router-link to="support">Donate</router-link></li>
		</ul>
		<p class="copyright">Copyright 2018 © <a href="mailto:alexandre.bonneau@linuxfr.eu">Alexandre Bonneau</a></p>
		<router-link to="/">
			<svg class="logo"><use xlink:href="/statics/svg-defs.svg#logo_AutoNumeric_flat"></use></svg>
		</router-link>
	</div>
</template>

<script>
    export default {
        data() {
            return {};
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
