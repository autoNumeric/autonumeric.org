<template>
	<!-- if you want automatic padding use "layout-padding" class -->
	<div class="layout-padding">
		<h5>Documentation</h5>

		<q-icon name="build" size="100px" color="orange"></q-icon>
		<p class="construction">This section is under construction.</p>

		<p>While we are hard at work building it, you can check the <a href="https://github.com/autoNumeric/autoNumeric/blob/master/README.md">documentation from the official repository</a>.</p>

		<h4>Options</h4>
		<div class="options">
			<p>Multiple options allows you to customize precisely how your AutoNumeric-managed element will format your key strokes as you type.<br><i>Note: You can easily generate your custom options object using the <router-link to="configurator">configurator</router-link> on this website.</i></p>
		</div>
		<p>As of now, <strong>{{ options.length }}</strong> options are available and listed below:</p>
		<div class="optionsList table">
			<div class="header">
				<div>Option</div>
				<div>Description</div>
				<div>Default value</div>
			</div>
			<div class="rowGroup">
				<div class="row" v-for="o in options">
					<router-link :to="'#'+o.name"><div class="optionName">{{ o.name }}</div></router-link>
					<div class="desc" v-html="o.descriptionShort"></div>
					<div class="defaultValue"><code>{{ getDefaultValue(o) }}</code></div>
				</div>
			</div>
		</div>

		<div class="optionsDocumentation">
			<autonumeric-option v-for="option in options" :key="option.name"
			                    :name="option.name"
			                    :description="option.description"
			                    :descriptionShort="option.descriptionShort"
			                    :defaultValue="option.defaultValue"
			                    :optionList="option.optionList"
			                    :additionalInfo="option.additionalInfo"
			                    :additionalOptions="option.additionalOptions"
			                    :initialValue="option.initialValue"
			                    :isOptionChoiceOpen="option.isOptionChoiceOpen"
			                    :defaultCustomValue="option.defaultCustomValue"
			></autonumeric-option>
		</div>

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
    import AutonumericOption from '../components/AutonumericOption.vue';
    import AutoNumericOptions from '../mixins/autonumeric-options';

    export default {
        name: 'Documentation',

        components: {
            AutonumericOption,
        },

        mixins: [
            AutoNumericOptions,
        ],

        methods: {
            getDefaultValue(optionObject) {
                const defaultValue = optionObject.optionList.find(option => option.defaultValue !== void(0)).value;

                if (typeof defaultValue === 'string') return `'${defaultValue}'`;
                if (defaultValue === null) return `null`;

                return defaultValue;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" >
	.optionsDocumentation {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	strong {
		font-weight: bold; //TODO Refactor with the other components
	}

	.options {
		margin-bottom : 1rem;
	}

	.optionsList {
		margin-top : 1rem;
	}

	code:not(.javascript),
	.rawValue {
		display          : inline-block;
		font-size        : 85%;
		font-family      : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
		padding          : 0.2rem 0;
		margin           : 0;
		border-radius    : 3px;
		background-color : rgba(27, 31, 35, 0.05);

		&:before,
		&:after {
			letter-spacing : -0.2em;
			content        : "\00a0";
		}
	}

	.defaultValue code {
		background-color : rgba(217, 217, 217, 0.2235) !important;
	}

	.layout-padding {
		display        : flex;
		flex-direction : column;
		align-items    : center;
	}

	.table {
		display   : table;
		font-size : 0.8rem;

		.header {
			display     : table-header-group;
			font-weight : bold;

			& > * {
				display : table-cell;
			}
		}

		.rowGroup {
			display : table-row-group;

			& > div.row {
				display : table-row;

				&:hover {
					background-color: aliceblue;
				}

				& > * {
					display : table-cell;

					&.desc {
						text-align : left;
					}
				}
			}
		}
	}
</style>
