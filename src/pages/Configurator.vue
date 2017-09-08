<template>
	<!-- if you want automatic padding use "layout-padding" class -->
	<div class="layout-padding">
		<!-- your content -->
		<h5>Configurator</h5>

		<q-icon name="build" size="100px" color="orange"></q-icon>
		<p class="construction">This section is under construction.</p>

		<p>While we are hard at work building it, you can check the <a href="https://github.com/autoNumeric/autoNumeric/blob/master/README.md">documentation from the official repository</a>.</p>
		<p>If you feel lucky, you can also take a look at the old (and <strong>deprecated</strong>) <a href="http://www.decorplanit.com/plugin/">configuration generator</a> from the previous website.</p>
	</div>
</template>

<script>
    import {
        QIcon,
    } from 'quasar-framework';

    export default {
        name: 'Configurator',

        components: {
            QIcon,
        },

        data() {
            return {};
        },
    };
</script>

<style>
</style>
