<template>
	<div class="option" :id="name">
		<!--//TODO i18n this component-->
		<div class="optionInfo">
			<div class="optionNameAndCount">
				<router-link :to="'#'+name"><div class="optionName">{{ name }}</div></router-link>
				<div class="count">{{ optionList.length }} choice{{ (optionList.length > 1)?'s':'' }}{{ isOptionChoiceOpen?` (You can customize the option value)`:''}}</div>
			</div>
			<div class="descriptions">
				<div class="descriptionShort" v-html="descriptionShort"></div>
				<div class="descriptionLong" v-if="descriptionShort !== description" v-html="description"></div>
			</div>
		</div>
		<div class="additionalInfo" v-if="additionalInfo" v-html="additionalInfo"></div>
		<div class="table">
			<div class="thead">
				<div>Choices</div>
				<div>Value</div>
				<div>Playground</div>
				<div>Description</div>
			</div>

			<div class="tbody">
				<div :class="{ optionDetail: true, defaultValue: option.defaultValue }"
				     v-for="(option, index) in optionList"
				     :key="option.optionChoice"
				     @mouseenter="hoveredChoice = option.optionChoice"
				     @mouseleave="hoveredChoice = ''"
				     :id="`${name}-${option.optionChoice}`"
				>
					<div>{{ option.optionChoice }}</div>
					<div><code>{{ shownValue(option.value) }}</code></div>
					<div>
						<vue-autonumeric
							:options="autoNumericOptionObject(name, option.value, additionalOptions)"
							v-model="initialValueToUse"
							@focus.native="hoveredChoice = option.optionChoice"
							@blur.native="hoveredChoice = ''"
							v-on:autoNumeric:rawValueModified.native="updateRawValueDisplay"
						></vue-autonumeric>
					</div>
					<div class="description" v-if="option.defaultValue">
						<div>
							<div v-html="option.description"></div>
							<div class="defVal">Default value</div>
						</div>
					</div>
					<div v-else v-html="option.description"></div>
				</div>

				<!--Add an additional row if the choice is customizable-->
				<div v-if="isOptionChoiceOpen"
				     class="customChoice"
				     @mouseenter="hoveredChoice = null"
				     @mouseleave="hoveredChoice = ''"
				>
					<div></div>
					<div>
						<input type="text"
						       placeholder="Custom value"
						       v-model="customChoice"
						       ref="custom"
						>
					</div>
					<div>
						<vue-autonumeric
								:options="customOptions"
								v-model="initialValueToUse"
								@focus.native="hoveredChoice = null"
								@blur.native="hoveredChoice = ''"
								v-on:autoNumeric:rawValueModified.native="updateRawValueDisplay"
						></vue-autonumeric>
					</div>
					<div>You can use a custom choice for this option</div>
				</div>
			</div>
		</div>
		<div class="rawValueLine">
			<div>
				<span>rawValue:</span>
				<span class="rawValue">{{ rawValue }}</span>
			</div>
			<span class="codeExample">{{ codeExample }}</span>
		</div>
	</div>
</template>

<script type="text/babel">
    import formatting from '../mixins/formatting';
    import AutoNumeric from 'autonumeric';
    import VueAutonumeric from 'vue-autonumeric';

    export default {
        name: 'AutonumericOption',

        components: {
            VueAutonumeric,
        },

        mixins: [
            formatting,
        ],

        props: {
            /**
             * Option name
             */
            name: {
                type    : String,
                required: true,
            },

            /**
             * Option description
             */
            description: {
                type    : String,
                required: true,
            },

            /**
             * Option description - short version
             */
            descriptionShort: {
                type    : String,
                required: true,
            },

            /**
             * List of the values the option can accept
             */
            optionList: {
                type    : Array,
                required: true,
            },

            /**
             * Additional information
             */
            additionalInfo: {
                type    : String,
                required: false,
            },

            /**
             * Additional options needed to be used in conjunction with the tested one
             */
            additionalOptions: {
                type    : Object,
                required: false,
            },

            /**
             * The initial value to use and format on load
             */
            initialValue: {
                type    : [Number, String],
                required: false,
            },

            /**
             * If this is `true`, then the option accepts a custom choice. If `false`, only the choice given in `optionList` are accepted
             */
            isOptionChoiceOpen: {
                type    : Boolean,
                required: true,
            },

            /**
             * If passed, this is used as the default value for the custom input element
             */
            defaultCustomValue: {
                type    : [Number, String, Boolean, Object],
                required: false,
            },
        },

        data() {
            return {
                rawValue         : '',
                initialValueToUse: 0, // The initial value to use when creating the AutoNumeric element
                hoveredChoice    : '', //
                customChoice     : '', // The custom choice value entered by the user. Modifying this will automatically update the AutoNumeric options.
                customInput      : null, // Reference to the DOM input element where the user enter its custom options
            };
        },

        computed: {
            codeExample() {
                if (this.hoveredChoice !== '') {
                    //TODO Keep that displayed if one of the input has the focus OR enough for the user to be able to select and copy it?
                    let result;
                    if (this.hoveredChoice === null) {
                        // Special case when the option is custom, where we need to convert the custom value to a number instead of a string, and display the empty string `''` as such
                        // Try to typecast to a number
                        let customValue;
                        if (this.customChoice === '') {
                            customValue = `''`;
                        } else {
                            const customChoiceAsNumber = Number(this.customChoice);
                            if (isNaN(customChoiceAsNumber)) {
                                // That was not a number
                                customValue = `'${this.customChoice}'`;
                            } else {
                                customValue = customChoiceAsNumber;
                            }
                        }

                        result = `{ ${this.name} : ${customValue} }`;
                    } else {
                        result = `{ ${this.name} : AutoNumeric.options.${this.name}.${this.hoveredChoice} }`;
                    }

                    return result;
                } else {
                    return '';
                }
            },

            /**
             * This function return only valid AutoNumeric options, based on the custom entries from the user.
             *
             * @returns {object}
             */
            customOptions() {
                if (this.customInput !== null) {
                    const customOptions = this.autoNumericOptionObject(this.name, this.customChoice, this.additionalOptions);

                    // Use AutoNumeric.validate() to check if the custom user entry is valid
                    if (AutoNumeric.areSettingsValid(customOptions)) {
                        this.customInput.setCustomValidity('');
                        return customOptions;
                    }

                    this.customInput.setCustomValidity('The custom options is invalid');
                }

                // If the custom option is invalid, do not use it and use no options instead
                return {};
            },
        },

        methods: {
            /**
             * Update the rawValue to display
             *
             * @param {Event} event
             */
            updateRawValueDisplay(event) {
                this.rawValue = event.detail.newRawValue;
            },

            /**
             * Return a single object that merge the option name, the option value, and any other options needed to demonstrate the effect.
             * For instance, when testing the `currencySymbolPlacement` option name with the `'p'` value, you need to set a `currencySymbol` otherwise you won't see anything.
             * The generated object will be:
             * {
             *     currencySymbol : '€',
             *     currencySymbolPlacement : 'p',
             * }
             *
             * @param {string} optionName
             * @param {null|string|number} optionValue
             * @param {object} additionalOptions
             * @returns {{}}
             */
            autoNumericOptionObject(optionName, optionValue, additionalOptions) {
                return Object.assign({}, { [optionName]: optionValue }, additionalOptions); // Merge the options together
            },
        },

        mounted() {
            this.initialValueToUse = this.initialValue;
            this.customInput = this.$refs.custom;

            if (this.defaultCustomValue !== void(0)) { // The default value for the custom input
                this.customChoice = this.defaultCustomValue;
            }
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	$fontWeightLight   : 300;
	$fontWeightRegular : 400;
	$fontWeightMedium  : 500;

	.option {
		font-family    : 'Open Sans', sans-serif;
		color          : #333;
		padding-bottom : 0.5rem;
		margin-top     : 2rem;
		max-width      : 1000px;

		&:not(:last-of-type) {
			border-bottom  : 2px solid #1E77C5;
		}
	}

	.optionInfo {
		display: flex;
		align-items: flex-start;

		& > div {
			width: 50%;
		}

		$marginBetweenOptionInfoAndTable : 0.5rem;
		.optionNameAndCount {
			text-align: left;
			position: relative;

			& > a:hover:before {
				content  : '# ';
				position : absolute;
				left     : -15px;
				top      : 8px;
				color    : #d8d8d8;
			}

			.optionName {
				font-size : 1.5rem;
				color     : #073d96;
				margin-bottom: 0.3rem;
			}

			.count {
				font-size     : 0.7rem;
				font-family   : 'Noto Mono', sans-serif;
				color         : #A9B7C6;
				margin-bottom : $marginBetweenOptionInfoAndTable;
			}
		}

		.descriptions {
			text-align : left;

			.descriptionShort {
				font-size     : 1rem;
				margin-top    : 0.4rem;
				margin-bottom : 1rem;
			}

			.descriptionLong {
				font-size     : 0.9rem;
				margin-bottom : $marginBetweenOptionInfoAndTable;
			}
		}
	}

	.additionalInfo {
		background-color : aliceblue;
		border-radius    : 4px;
		padding          : 0.4rem 1rem;
		font-size        : 0.8rem;
	}

	.rawValueLine {
		color           : #B3B3B3;
		font-size       : 0.8rem;
		display         : flex;
		justify-content : center;
		align-items     : center;
		margin-top      : 0.5rem;

		& > * {
			width : 50%;
		}

		.rawValue {
			font-size : 1.1rem;
		}

		.codeExample {
			color     : #A9B7C6;
			font-size : 0.7rem;
		}
	}

	/*code:not(.javascript), //XXX This is declared in the parent 'Documentation.vue' component
	.rawValue {
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
	}*/

	/*.sourceCode {
		text-align : left;
		font-size  : 0.7rem;
		min-height : 120px;
		box-shadow : 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
	}*/

	$defaultValueBgColor    : #073D96;
	$defaultValueRadiusSize : 4px;
	input {
		width            : 200px;
		height           : 30px;
		background-color : white;
		border           : 1px solid #D8D8D8;
		border-radius    : 3px;
		color            : #555;
		text-align       : center;
		font-weight      : 400;
		font-size        : 1.25rem;
		transition       : all 0.3s ease;

		&:hover,
		&:focus {
			border-color    : #9db7e0;
			background-color: #f3f9ff;
			outline         : none;
		}

		&::placeholder {
			color: #bcbcbc;
			font-size: 0.8rem;
			font-variant: all-small-caps;
		}

		&:invalid {
			background-color : #FFEBEB;
			color            : #6D6D6D;
			border-color     : #EFB3B3;
		}

		/*&:valid {
			border-color: forestgreen;
		}*/

		&:read-only {
			background-color : #DADADA;
			border-color     : #B3B3B3;
			color            : #ABABAB;
		}
	}

	.table {
		display         : table;
		width           : 1000px;
		border-spacing  : 0px 8px;
		// position        : relative;
		background-color: white;

		.thead {
			display: table-header-group;

			// Header cells
			& > div { // th
				display: table-cell;
				border-bottom : 1px solid #E7E7E7;
				font-family   : 'Roboto', sans-serif;
				font-size     : 0.8rem;
				font-weight   : $fontWeightLight !important;
				text-align    : center;
				padding-bottom: 0.4rem;
			}
		}

		.tbody {
			display: table-row-group;

			& > div { // tr
				display: table-row;

				&:hover {
					background-color: aliceblue;
					// border-radius   : $defaultValueRadiusSize; //FIXME That does not work
				}

				&.defaultValue {
					position         : relative; //XXX This is needed by the `& > *::after` rule
					background-color : $defaultValueBgColor;
					color            : white;

					& > div:first-child,
					& > div:last-child {
						position : relative; //XXX This is needed by Chromium only, that considers that the parent element of an ::after is the element itself!

						&::after,
						&::after {
							content         : "";
							position        : absolute;
							top             : 0;
							bottom          : 0;
							left            : 0;
							right           : 0;
							z-index         : -1;
							background-color: $defaultValueBgColor;
							margin-right    : -$defaultValueRadiusSize;
							margin-left     : -$defaultValueRadiusSize;
							border-radius   : $defaultValueRadiusSize;
						}
					}

					.description > div {
						display         : flex;
						justify-content : space-between;
						align-items     : center;

						.defVal {
							margin-left : 1rem;
							font-size  : 0.7rem;
							font-weight: $fontWeightLight;
							text-align : center;
						}
					}

					/*code { //XXX This is defined in the parent 'Documentation.vue' component
						background-color : rgba(217, 217, 217, 0.2235) !important;
					}*/
				}

				& > * { // td
					display       : table-cell;
					text-align    : center;
					vertical-align: middle;
					padding       : 5px;
				}

				// Choices
				& > *:nth-child(0n+1) {
					font-size   : 1.2rem;
					font-weight : $fontWeightLight;
					min-width   : 100px;
				}

				// Value
				& > *:nth-child(0n+2) {
					min-width   : 100px;

					code {
						display   : inline-block; // Allows better vertical centering
						font-size : 0.7rem;
					}
				}

				// Playground
				& > *:nth-child(0n+3) {
					//
				}

				// Description
				& > *:nth-child(0n+4) {
					font-size  : 0.8rem;
					text-align : left;
				}
			}

			.customChoice {
				background-color: #f8f8f8;

				// Value
				& > *:nth-child(0n+2) {
					input {
						width : 100px;
					}
				}

				// Description
				& > *:nth-child(0n+4) {
					color : #b4b4b4;
					transition: color 0.3s ease;
				}

				&:hover {
					// Description
					& > *:nth-child(0n+4) {
						color : #416274 !important;
					}
				}
			}
		}
	}

	// --------------- styleRules specific CSS rules
	.autoNumeric-positive {
		background-color: green !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-negative {
		background-color: red !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-red {
		background-color: red !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-orange {
		background-color: orange !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-yellow {
		background-color: yellow !important;
		color           : #333 !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-green {
		background-color: forestgreen !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-even {
		background-color: #A48AFF !important;
		color           : #333 !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-odd {
		background-color: #39DFFF !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-small-negative {
		background-color: #B5FF96 !important;
		color           : #333 !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-zero {
		background-color: #FF6B6A !important;
		color           : white !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	.autoNumeric-small-positive {
		background-color: #D1FAFF !important;
		color           : #333 !important;
		border-color    : transparent;

		&:hover {
			border-color : transparent !important;
		}
	}

	strong {
		font-weight : bold;
	}
</style>
