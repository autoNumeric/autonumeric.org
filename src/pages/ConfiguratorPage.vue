<template>
	<div class="layout-padding">
		<h5>Configurator</h5>

		<q-icon name="build" size="100px" color="orange"></q-icon>
		<p class="construction">This section is under construction.</p>

		<p>While we are hard at work building it, you can check the <a href="https://github.com/autoNumeric/autoNumeric/blob/master/README.md">documentation from the official repository</a>.</p>
		<p>If you feel lucky, you can also take a look at the old (and <strong>deprecated</strong>) <a href="http://www.decorplanit.com/plugin/">configuration generator</a> from the previous website.</p>

		<configurator class="configurator"></configurator>
	</div>
</template>

<script>
    import {
        QIcon,
    } from 'quasar-framework';
    import Configurator from '../components/Configurator';

    export default {
        name: 'ConfiguratorPage',

        components: {
            Configurator,
            QIcon,
        },

        data() {
            return {};
        },
    };
</script>

<style>
</style>
