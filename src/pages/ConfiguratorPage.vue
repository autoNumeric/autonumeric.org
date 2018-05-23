<template>
	<div class="layout-padding">
		<h5>Generate your custom configuration options</h5>
		<div class="subtitleInfo">
			<div class="q-subheading">Use the configurator below to generate your custom options object easily</div>

			<div class="information">
				<p>There are a total of <strong>{{ options.length }}</strong> settings/options that controls the format and behavior of the input field.</p>
				<p>For your convenience you'll find below an option code generator ; all you need to do is select the desired options and the code for the options object will be shown at the top of that page, for you to copy and paste into the appropriate document.</p>
				<p>That option object is generated on the fly, either with the <span class="link" @click="configuratorTab = 'simple'">shortest</span> version possible which includes the values for each options, or the <span class="link" @click="configuratorTab = 'detailed'">detailed</span> one which includes references to the <code>AutoNumeric.options</code> object.</p>
			</div>
		</div>

		<configurator :tab="configuratorTab"></configurator>

		<q-btn
				v-back-to-top
				round
				color="light-blue-13"
				class="fixed-bottom-right"
				style="margin: 0 15px 15px 0"
		>
			<q-icon name="keyboard_arrow_up" />
		</q-btn>
	</div>
</template>

<script>
    import AutoNumericOptions from '../mixins/autonumeric-options';
    import Configurator from '../components/Configurator';

    export default {
        name: 'ConfiguratorPage',

        components: {
            Configurator,
        },

        mixins: [
            AutoNumericOptions,
        ],

        data() {
            return {
                configuratorTab: 'simple',
            };
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
	.information p {
		margin-bottom : 1rem;
	}

	.layout-padding {
		max-width      : 1500px;
		display        : flex;
		flex-direction : column;
		align-items    : center;

		.subtitleInfo {
			max-width : 700px; //TODO Remove any hard-coded sizes
		}
	}

	.link {
		color  : #00B0FF; //TODO Use the global colors
		cursor : pointer;

		&:hover {
			text-decoration : underline;
		}
	}
</style>
