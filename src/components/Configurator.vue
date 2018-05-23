<template>
	<div class="configurator">
		<!--//TODO Update the url so that a particular configuration could be shared with a small link-->
		<div class="result">
			<q-tabs color="transparent" align="center" class="showOptions shadow-2" v-model="localTab">
				<!--Tabs-->
				<q-tab slot="title" name="simple" color="light-blue-13" icon="textsms" label="Simplified code"/> <!--Or 'grey-5'-->
				<q-tab slot="title" name="detailed" color="light-blue-13" icon="chat" label="Detailed code"/>
				<!-- Targets -->
				<q-tab-pane name="simple">
					<!--<pre id="simpleCode"><code class="javascript">{{ codeSimple }}</code></pre>-->
					<!--//TODO Highlighting the code makes the form very laggy. Should we keep doing that?-->
					<pre id="simpleCode"
					     v-highlightjs="codeSimple"
					     class="sourceCode"
					><code class="javascript"></code><div class="hidden">{{ codeSimple }}</div></pre>

				</q-tab-pane>
				<q-tab-pane name="detailed">
					<!--<pre id="detailedCode"><code class="javascript">{{ codeDetailed }}</code></pre>-->
					<pre id="detailedCode"
					     v-highlightjs="codeDetailed"
					     class="sourceCode"
					><code class="javascript"></code><div class="hidden">{{ codeDetailed }}</div></pre>
				</q-tab-pane>
			</q-tabs>
			<div class="playground">
				<div class="try">Try your options directly:</div>
				<vue-autonumeric :options="generatedOptions" class="testInput"></vue-autonumeric>
				<div class="controls">
					<q-btn
					       color="light-blue-13"
					       @click.native="copy(getSelectorForCopy)"
					       :label="copyString"
					       icon="create"
					       v-show="optionCount > 0"
					/>
					       <!--icon="file_copy"-->
					<q-btn flat
					       size="sm"
					       color="blue-grey-4"
					       @click.native="clearForm"
					       label="Clear the form"
					       v-show="optionCount > 0"
					       icon="clear"
					/>
					       <!--icon="delete_forever"-->
				</div>
			</div>
		</div>
		<div class="optionsList table" ref="optionsList">
			<div class="thead">
				<div>Select your options</div>
				<div>Choices</div>
				<div>Value</div>
				<div>Description</div>
			</div>
			<div class="tbody" v-for="(o, index) in options" :key="index">
				<div class="optionInfo">
					<div class="optionName">{{ o.name }}</div>
					<div class="optionDesc" v-html="o.descriptionShort"></div>
				</div>
				<div class="option" :class="{ defaultValue: option.defaultValue }" v-for="option in o.optionList" :key="option.optionChoice" :index="index">
					<div class="selections">
						<q-radio v-model="list[index]"
						         :val="option.optionChoice"
						         :name="`${o.name}-${option.optionChoice}`"
						         :color="(option.defaultValue)?'grey-7':'primary'"
						/>
					</div>
					<div class="choice">{{ option.optionChoice }}</div>
					<div class="value"><code>{{ shownValue(option.value) }}</code></div>
					<div class="description" v-html="option.description"></div>
				</div>
				<div class="option" v-if="o.isOptionChoiceOpen">
					<div class="selections">
						<q-radio v-model="list[index]"
						         val="customOptionAutonumeric.org"
						         :name="`custom-${o.name}`"
						         color="warning"
						/>
					</div>
					<div class="choice">
						<input type="text"
						       placeholder="Enter value here"
						       class="custom"
						       :id="`custom-${o.name}`"
						       v-model="customValues[index]"
						       @input="selectCustomRadio(index)"
						>
					</div>
					<div class="value"></div>
					<div class="description custom"><i>You can customize the value here</i></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
    import AutoNumericOptions from '../mixins/autonumeric-options';
    import formatting from '../mixins/formatting';
    import AutoNumeric from 'autonumeric';
    import VueAutonumeric from 'vue-autonumeric';

    export default {
        name: 'configurator',

        components: {
            VueAutonumeric,
        },

        mixins: [
            AutoNumericOptions,
            formatting,
        ],

        props: {
            tab: {
                type    : String,
                required: false,
                default : 'simple',
            },
        },

        data() {
            return {
                list         : [],
                optionList   : [],
                optionChoices: {},
                optionCount  : 0,
                localTab     : 'simple',
                customValues : [], // Store all the custom values

                // References to the code examples elements
                simpleCodeElement  : null,
                detailedCodeElement: null,
            };
        },

        watch: {
            tab(newVal) {
                //TODO Yeah, I know, it's awful to watch a prop when you could just create a computed. This is only for new comers that search for an easy first PR *wink* ;) (Please DO remove that hideous code block!)
                this.localTab = newVal;
            },
        },

        mounted() {
            // Generate a local copy of the tab model
            this.localTab = this.tab;

            // Cache the often used data
            this.options.forEach(o => {
                this.optionList.push(o.name);

                // Cache the option choices for faster access in the computed code* functions
                this.optionChoices[o.name] = {};
                o.optionList.forEach(oc => {
                    this.optionChoices[o.name][oc.optionChoice] = oc.value;
                });
            });
        },

        computed: {
            /**
             * Generate the real option object, as well as two strings that represents the simple and detailed option object (with the `AutoNumeric.options.*` references).
             *
             * @returns {object}
             */
            generateCodeSnippet() {
                const codeSnippet     = {};
                const simpleOptions   = {};
                const detailedOptions = {};
                let optionCount       = 0;

                this.list.forEach((option, index) => {
                    const optionName        = this.optionList[index];
                    const optionObj         = {};
                    const optionObjSimple   = {};
                    const optionObjDetailed = {};

                    if (option === 'customOptionAutonumeric.org') {
                        // Retrieve the custom value, if the custom field is selected
                        optionObj[optionName]         = this.customValues[index];
                        optionObjSimple[optionName]   = this.customValues[index];
                        optionObjDetailed[optionName] = this.customValues[index];
                    } else {
                        // Otherwise just use the `val` from the radio button
                        optionObj[optionName]         = this.optionChoices[optionName][option];
                        optionObjSimple[optionName]   = this.optionChoices[optionName][option];
                        optionObjDetailed[optionName] = `AutoNumeric.options.${optionName}.${option}`;
                    }

                    // Only keep in the custom objects the values that are different than the default AutoNumeric options
                    if (!this.isDefaultOption(optionObjSimple)) {
                        optionCount++; // Count the options that are actually shown
                        Object.assign(codeSnippet, optionObj);
                        Object.assign(simpleOptions, optionObjSimple);
                        Object.assign(detailedOptions, optionObjDetailed);
                    }
                });

                this.optionCount = optionCount;

                // Validate the generated option object
                try {
                    //FIXME Check the `selectOnFocus` and `caretPositionOnFocus` values before/after, and update the form + generated strings automatically
                    // const shouldFixTheOptions = codeSnippet.hasOwnProperty('selectOnFocus') || codeSnippet.hasOwnProperty('caretPositionOnFocus');
                    //XXX Note that validating the option object can modify it by 'auto-fixing' the caret position and the selectOnFocus options
                    AutoNumeric.validate(codeSnippet, true);
                    /*
                    if (shouldFixTheOptions) {
                        this.updateSimpleOptionsWithValidateFix(simpleOptions, codeSnippet);
                        this.updateDetailedOptionsWithValidateFix(detailedOptions, codeSnippet);
                    }
                    */
                } catch (e) {
                    this.displayNotification('Configuration error in the AutoNumeric options', e.message, 'negative');
                }

                return {
                    object  : codeSnippet, // The real object
                    // Remove the quotes from the object properties for the two following objects
                    simple  : JSON.stringify(simpleOptions, null, 4).replace(/"([^(")"]+)":/g, '$1:'), // The simple object as a string
                    detailed: JSON.stringify(detailedOptions, null, 4) // The detailed object as a string
                        .replace(/"([^(")"]+)":/g, '$1:')
                        .replace(/"(AutoNumeric\.options\..+)"/g, '$1'), // Also remove the quotes from the `AutoNumeric.options.*` strings if any
                };
            },

            /**
             * Return the generated options as an object.
             * Note: this does not remove the default valued options.
             *
             * @returns {object}
             */
            generatedOptions() {
                return this.generateCodeSnippet.object;
            },

            /**
             * Return the generated option object, which makes use wherever possible to the `AutoNumeric.options.*` object.
             * This automatically ignore the selected options that are already set as default values
             *
             * @returns {string}
             */
            codeDetailed() {
                return this.generateCodeSnippet.detailed;
            },

            /**
             * Return the 'simplified' object where each option value are directly used, instead of referring to the `AutoNumeric.options.*` object.
             *
             * @returns {string}
             */
            codeSimple() {
                return this.generateCodeSnippet.simple;
            },

            /**
             * Generate the label for the 'copy to clipboard' button
             *
             * @returns {string}
             */
            copyString() {
                if (this.optionCount === 0) {
                    return `Please select at least one option in order to generate your configuration object`;
                }

                if (this.optionCount === 1) {
                    return `Copy the single option to the clipboard`;
                }

                return `Copy ${this.optionCount} options to the clipboard`;
            },

            /**
             * Returns the selector string to the element content that is copied to the clipboard on click.
             * Note that instead of retrieving the id only, we now get the `id > div.hidden` selector since the non-highlighted content is stored there.
             *
             * @returns {string}
             */
            getSelectorForCopy() {
                if (this.localTab === 'simple') {
                    return '#simpleCode > div.hidden';
                }

                return '#detailedCode > div.hidden';
            },
        },

        methods: {
            /**
             * Select the radio button for the custom value of the given option index, and make Vue aware of the change.
             *
             * @param {int} index This is the option index in the `this.list` array
             */
            selectCustomRadio(index) {
                this.$set(this.list, index, 'customOptionAutonumeric.org');
            },

            /**
             * Clear the form
             */
            clearForm() {
                this.list.splice(0);
                this.customValues.splice(0); // Also clear all the custom values
            },

            /*
            updateSimpleOptionsWithValidateFix(simpleOptions, codeSnippet) {
                if (codeSnippet.hasOwnProperty('selectOnFocus')) {
                    simpleOptions.selectOnFocus = codeSnippet.selectOnFocus;
                }

                if (codeSnippet.hasOwnProperty('caretPositionOnFocus')) {
                    simpleOptions.caretPositionOnFocus = codeSnippet.caretPositionOnFocus;
                }
            },

            updateDetailedOptionsWithValidateFix(detailedOptions, codeSnippet) {
                if (codeSnippet.hasOwnProperty('selectOnFocus')) {
                    if (codeSnippet.selectOnFocus) {
                        detailedOptions.selectOnFocus = 'AutoNumeric.options.selectOnFocus.select';
                    } else {
                        detailedOptions.selectOnFocus = 'AutoNumeric.options.selectOnFocus.doNotSelect';
                    }
                }

                if (codeSnippet.hasOwnProperty('caretPositionOnFocus')) {
                    if (codeSnippet.caretPositionOnFocus === null) {
                        detailedOptions.caretPositionOnFocus = 'AutoNumeric.options.caretPositionOnFocus.doNoForceCaretPosition';
                    } else {
                        detailedOptions.caretPositionOnFocus = `AutoNumeric.options.caretPositionOnFocus.${codeSnippet.caretPositionOnFocus}`;
                    }
                }
            },
            */

            /**
             * Returns `true` if the given option object is a default AutoNumeric option.
             *
             * @param {object|string} option
             *
             * @returns {boolean}
             */
            isDefaultOption(option) {
                const key = Object.keys(option)[0]; // There is always only *one* key in the given option object
                const anOptions = AutoNumeric.getDefaultConfig();

                return anOptions.hasOwnProperty(key) && anOptions[key] === option[key];
            },

            /**
             * Display a notification with the Quasar system
             */
            displayNotification(message, detail, type = 'info', timeout = 6000, position = 'bottom-right') {
// Display a flash message saying the content has been copied
                this.$q.notify({
                    message,
                    timeout, // ms

                    // "type" adds a color and icon,
                    // so you don't need to specify them.
                    // Available values: 'positive', 'negative', 'warning', 'info'
                    type,

                    // color    : 'positive',
                    // textColor: 'black', // if default 'white' doesn't fits

                    // icon  : 'wifi',
                    // or
                    // avatar: 'statics/boy-avatar.png',

                    detail,
                    position,
                });
            },

            /**
             * Copy the content of the given element selector to the clipboard.
             *
             * @param {string} selector
             */
            copy(selector) {
                const element = document.querySelector(selector);
                const content = element.innerHTML;
                this.copyToClipboard(content);
                this.displayNotification(`The options object has been copied to the clipboard`, 'You can now paste it directly in your code');
            },

            /**
             * Copy the given string to the clipboard.
             * See https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
             *
             * @param {string} str
             */
            copyToClipboard(str) {
                const el = document.createElement('textarea');  // Create a <textarea> element
                el.value = str;                                 // Set its value to the string that you want copied
                el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
                el.style.position = 'absolute';
                el.style.left = '-9999px';                      // Move outside the screen to make it invisible
                document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
                const selected =
                          document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                          ? document.getSelection().getRangeAt(0)     // Store selection if found
                          : false;                                    // Mark as false to know no selection existed before
                el.select();                                    // Select the <textarea> content
                document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
                document.body.removeChild(el);                  // Remove the <textarea> element

                if (selected) {                                 // If a selection existed before copying
                    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
                    document.getSelection().addRange(selected);   // Restore the original selection
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	//FIXME Refactor this with Documentation.vue -->
	code:not(.javascript),
	pre,
	.rawValue {
		display          : inline-block;
		font-size        : 0.7rem; //XXX Different than 85%
		font-family      : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
		padding          : 0.2rem 0;
		margin           : 0;
		border-radius    : 3px;
		background-color : rgba(27, 31, 35, 0.05);
	}

	code:not(.javascript) {
		&:before,
		&:after {
			letter-spacing : -0.2em;
			content        : "\00a0";
		}
	}

	.result {
		display         : flex;
		justify-content : space-between;
		align-items     : center;

		text-align    : center;
		margin-top    : 1rem;
		margin-bottom : 2rem;


		.sourceCode {
			text-align : left;
			padding    : 0;
			box-shadow : 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
		}

		.showOptions {
			flex-grow    : 1;
			margin-right : 2rem;
		}

		.playground {
			display        : flex;
			flex-direction : column;
			align-items    : center;

			.controls {
				display         : flex;
				flex-wrap       : wrap;
				justify-content : center;
				flex-direction  : column;

				button {
					margin-bottom : 0.5rem;
				}
			}

			.try {
				margin-bottom : 1rem;
				color         : #304A56;
			}

			.testInput {
				font-size     : 1.8rem;
				height        : 3rem;
				margin-bottom : 1rem;
				width         : 100%;
			}
		}
	}

	.table {
		display : table;
	}

	.thead {
		display     : table-header-group;
		font-weight : 400;

		& > div {
			display : table-cell;
		}
	}

	.tbody {
		display : table-row-group;
	}

	.option {
		display: table-row;

		& > div {
			display : table-cell;
		}

		.value {
			max-width : 150px; //TODO Using fixed value is bad for responsiveness; find a better way
		}
	}

	//FIXME Refactor this with `AutonumericOption.vue` -->
	.optionName {
		font-family : 'Open Sans', sans-serif;
		font-size   : 1.2rem;
		color       : #073D96;
	}

	.optionInfo {
		position       : relative;
		padding-top    : 1.2rem;
		padding-bottom : 0.4rem;
	}

	.optionDesc {
		position      : absolute;
		left          : 100%;
		top           : 41%;
		white-space   : nowrap;
		overflow      : hidden;
		max-width     : 60vw; //FIXME This whole rule is a hack; remove that
		text-overflow : ellipsis;
		font-size     : 1rem;
		color         : #999;
	}

	.description {
		font-size  : 0.8rem;
		text-align : left;

		&.custom {
			color: #c0c0c0;
		}
	}

	$fontWeightLight   : 300;
	.choice {
		font-size   : 0.9rem;
		font-weight : $fontWeightLight;
		min-width   : 100px;
	}

	.defaultValue {
		.selections {
			/*&::after {
				content: ' ⋄';
			}*/
		}

		.choice,
		.description,
		.value code {
			color : #073D96;
		}
	}

	.value {
		min-width   : 100px;

		code {
			display   : inline-block; // Allows better vertical centering
			font-size : 0.7rem;
		}
	}

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

	.hidden { // Redeclaration just in case
		display : none !important;
	}
</style>
