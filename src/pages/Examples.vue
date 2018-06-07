<template>
	<div class="layout-padding">
		<h5>Examples</h5>

		<p>This page shows how powerful AutoNumeric can be, through multiple examples.</p>
		<p>Some are straight from the predefined options, while other are customized. Each examples is shown with a live-input so you can interact and test it, as well as the options used to achieve such result.</p>
		<p>If you want to customize your format, be sure to check the <router-link to="configurator">Configurator page</router-link>.</p>

		<h5>Predefined options</h5>

		<p>AutoNumeric comes with a trove of predefined options that allows you to directly use AutoNumeric by skipping the option configuration step.</p>

		<div class="examples">
			<div v-for="example in examplesArray">
				<h6 :id="example.id">{{ example.title }}</h6>
				<p v-html="example.description"></p>
				<example v-for="ex in example.examples"
				         :key="ex.name"
				         :name="ex.name"
				         :description="ex.description"
				         :longDescription="ex.longDescription"
				         :options="ex.options"
				         :val="ex.value?ex.value:null"
				/>
			</div>
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
    import AutoNumeric from 'autonumeric';
    import Example     from '../components/Example.vue';
    import hljs        from '../../node_modules/highlight.js/lib/highlight';

    export default {
        name: 'Examples',

        components: {
            Example,
        },

        data() {
            return {
                examplesArray: [
                    {
                        id         : 'languageOptions',
                        title      : 'Predefined language options',
                        description: 'Using those predefined language options, you can directly set the country\'s currency.',
                        examples   : [
                            {
                                name           : 'French',
                                description    : 'The format used by the French',
                                longDescription: `By default this use the alternative way of writing numbers; officially the French use the non breakable space <code>' '</code> for the digital group separator.<br>
<br>
However, the dot <code>'.'</code> is more and more used since it allow a better legibility.
You can change that by customizing the <code>digitalGroupSeparator</code> option.`,
                                options        : 'French',
                            },
                            {
                                name           : 'Spanish',
                                description    : 'The format used by the Spanish',
                                longDescription: ``,
                                options        : 'Spanish',
                            },
                            {
                                name           : 'North american',
                                description    : 'The format used by the USA',
                                longDescription: `This is an alias for the <code>'dollar'</code> option.`,
                                options        : 'NorthAmerican',
                            },
                            {
                                name           : 'British',
                                description    : 'The format used by the British',
                                longDescription: ``,
                                options        : 'British',
                            },
                            {
                                name           : 'Swiss',
                                description    : 'The format used by the Swiss',
                                longDescription: ``,
                                options        : 'Swiss',
                            },
                            {
                                name           : 'Japanese',
                                description    : 'The format used by the Japanese',
                                longDescription: ``,
                                options        : 'Japanese',
                            },
                            {
                                name           : 'Chinese',
                                description    : 'The format used by the Chinese',
                                longDescription: ``,
                                options        : 'Chinese',
                            },
                            {
                                name           : 'Brazilian',
                                description    : 'The format used by the Brazilian',
                                longDescription: ``,
                                options        : 'Brazilian',
                            },
                            {
                                name           : 'Turkish',
                                description    : 'The format used by the Turkish',
                                longDescription: ``,
                                options        : 'Turkish',
                            },
                        ],
                    },
                    {
                        id         : 'commonOptions',
                        title      : 'Predefined common options',
                        description: 'The common options like integers, floats and numeric strings.',
                        examples   : [
                            {
                                name           : 'Decimal character as a dot, digit separator as a comma',
                                description    : 'The usual format for some languages',
                                longDescription: ``,
                                options        : 'dotDecimalCharCommaSeparator',
                            },
                            {
                                name           : 'Decimal character as a comma, digit separator as a dot',
                                description    : 'The usual format for other languages',
                                longDescription: ``,
                                options        : 'commaDecimalCharDotSeparator',
                            },
                            {
                                name           : 'Integer',
                                description    : 'Only allows for integers to be entered',
                                longDescription: `Those integers can be positive or negative.`,
                                options        : 'integer',
                            },
                            {
                                name           : 'Positive integer',
                                description    : 'Only allows for positive integers to be entered',
                                longDescription: `Those integers can <strong>only</strong> be positive.`,
                                options        : 'integerPos',
                            },
                            {
                                name           : 'Negative integer',
                                description    : 'Only allows for negative integers to be entered',
                                longDescription: `Those integers can <strong>only</strong> be negative.`,
                                options        : 'integerNeg',
                                value          : -1234567.89,
                            },
                            {
                                name           : 'Float',
                                description    : 'Allows for floats to be entered',
                                longDescription: `Those floats can be positive or negative.`,
                                options        : 'float',
                            },
                            {
                                name           : 'Positive float',
                                description    : 'Only allows for <strong>positive</strong> floats to be entered',
                                longDescription: `Those floats can <strong>only</strong> be positive.`,
                                options        : 'floatPos',
                            },
                            {
                                name           : 'Negative float',
                                description    : 'Only allows for <strong>negative</strong> floats to be entered',
                                longDescription: `Those floats can <strong>only</strong> be negative.`,
                                options        : 'floatNeg',
                                value          : -1234567.89,
                            },
                            {
                                name           : 'Numeric',
                                description    : 'Format the value as a numeric string',
                                longDescription: `The value has no digit group separator, and a dot for the decimal point.`,
                                options        : 'numeric',
                            },
                            {
                                name           : 'Positive numeric',
                                description    : 'Format the value as a numeric string, and only allows for <strong>positive</strong> numeric values to be entered',
                                longDescription: `Those numeric values can <strong>only</strong> be positive.`,
                                options        : 'numericPos',
                            },
                            {
                                name           : 'Negative numeric',
                                description    : 'Format the value as a numeric string, and only allows for <strong>negative</strong> numeric values to be entered',
                                longDescription: `Those numeric values can <strong>only</strong> be negative.`,
                                options        : 'numericNeg',
                                value          : -1234567.89,
                            },
                        ],
                    },
                    {
                        id         : 'commonMonetaryOptions',
                        title      : 'Predefined common monetary options',
                        description: 'Euro and Dollar variants.',
                        examples   : [
                            {
                                name           : 'Euro',
                                description    : 'Format for the Euro currency',
                                longDescription: ``,
                                options        : 'euro',
                            },
                            {
                                name           : 'Positive Euro',
                                description    : 'Format for the Euro currency, that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'euroPos',
                            },
                            {
                                name           : 'Negative Euro',
                                description    : 'Format for the Euro currency, that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'euroNeg',
                                value          : -1234567.89,
                            },
                            {
                                name           : 'Euro with a space as its digit separator',
                                description    : 'Format for the Euro currency with the alternative digit separator',
                                longDescription: `Instead of using the dot <code>'.'</code> as the digit separator, this option uses the non-breakable space <code>'\u00a0'</code>.`,
                                options        : 'euroSpace',
                            },
                            {
                                name           : 'Positive Euro (with a space as its digit separator)',
                                description    : 'Format for the Euro currency, that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'euroSpacePos',
                            },
                            {
                                name           : 'Negative Euro (with a space as its digit separator)',
                                description    : 'Format for the Euro currency, that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'euroSpaceNeg',
                                value          : -1234567.89,
                            },
                            {
                                name           : 'Dollar',
                                description    : 'Format for the Dollar currency',
                                longDescription: ``,
                                options        : 'dollar',
                            },
                            {
                                name           : 'Positive Dollar',
                                description    : 'Format for the Dollar currency, that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'dollarPos',
                            },
                            {
                                name           : 'Negative Dollar',
                                description    : 'Format for the Dollar currency, that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'dollarNeg',
                                value          : -1234567.89,
                            },
                        ],
                    },
                    {
                        id         : 'commonPercentageOptions',
                        title      : 'Predefined percentage options',
                        description: `The predefined percentage options directly sets the <code>rawValueDivisor</code> option so that when entering <code>75%</code>, the <code>rawValue</code> is automatically converted to <code>0.75</code>.`,
                        examples   : [
                            {
                                name           : 'European percentage with 2 decimal places',
                                description    : 'Format the value as a percentage with 2 decimal places',
                                longDescription: `<span class="importantShoot">Important note:</span> When using those predefined options, the percentages are managed in a <strong>special</strong> way; when you enter <code>75,615 %</code>, behind the scene the <code>rawValue</code> is automagically converted to <code>0.75615</code>, thanks to the <code>rawValueDivisor</code> option.<br>Isn't awesome? ;)`,
                                options        : 'percentageEU2dec',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Positive European percentage with 2 decimal places',
                                description    : 'European percentage that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'percentageEU2decPos',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Negative European percentage with 2 decimal places',
                                description    : 'European percentage that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'percentageEU2decNeg',
                                value          : -0.7561481,
                            },
                            {
                                name           : 'European percentage with 3 decimal places',
                                description    : 'Format the value as a percentage with 3 decimal places',
                                longDescription: ``,
                                options        : 'percentageEU3dec',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Positive European percentage with 3 decimal places',
                                description    : 'European percentage that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'percentageEU3decPos',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Negative European percentage with 3 decimal places',
                                description    : 'European percentage that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'percentageEU3decNeg',
                                value          : -0.7561481,
                            },
                            {
                                name           : 'North American percentage with 2 decimal places',
                                description    : 'Format the value as a percentage with 2 decimal places',
                                longDescription: ``,
                                options        : 'percentageUS2dec',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Positive North American percentage with 2 decimal places',
                                description    : 'North American percentage that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'percentageUS2decPos',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Negative North American percentage with 2 decimal places',
                                description    : 'North American percentage that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'percentageUS2decNeg',
                                value          : -0.7561481,
                            },
                            {
                                name           : 'North American percentage with 3 decimal places',
                                description    : 'Format the value as a percentage with 3 decimal places',
                                longDescription: ``,
                                options        : 'percentageUS3dec',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Positive North American percentage with 3 decimal places',
                                description    : 'North American percentage that only allows <strong>positive</strong> values',
                                longDescription: ``,
                                options        : 'percentageUS3decPos',
                                value          : 0.7561481,
                            },
                            {
                                name           : 'Negative North American percentage with 3 decimal places',
                                description    : 'North American percentage that only allows <strong>negative</strong> values',
                                longDescription: ``,
                                options        : 'percentageUS3decNeg',
                                value          : -0.7561481,
                            },
                        ],
                    },
                    {
                        id         : 'styleRules',
                        title      : 'Predefined style rules',
                        description: `AutoNumeric provides hooks so that every value change can be processed.<br>Using the <code>styleRules</code> option, you can modify the CSS class of the element whenever the value change and match a value or a range of values you defined, in a callback.`,
                        examples   : [
                            {
                                name           : 'Display a different CSS class if the value is positive or negative',
                                description    : 'You can configure the CSS classes as you wish',
                                longDescription: `Sets the <code>autoNumeric-positive</code> css class whenever the raw value is <strong>positive</strong>.<br>Sets the <code>autoNumeric-negative</code> css class whenever the raw value is <strong>negative</strong>.`,
                                options        : { styleRules: AutoNumeric.options.styleRules.positiveNegative },
                                value          : 42,
                            },
                            {
                                name           : 'Display a different CSS class based on the rawValue, using ranges',
                                description    : 'You can configure ranges of values to correspond to a particular CSS class',
                                longDescription: `Sets the <code>autoNumeric-red</code> css class whenever the raw value is between <code>0</code> and <code>25</code> excluded.<br>Sets the <code>autoNumeric-orange</code> css class whenever the raw value is between <code>25</code> and <code>50</code> excluded.<br>Sets the <code>autoNumeric-yellow</code> css class whenever the raw value is between <code>50</code> and <code>75</code> excluded.<br>Sets the <code>autoNumeric-green</code> css class whenever the raw value is between <code>75</code> and <code>100</code> excluded.`,
                                options        : { styleRules: AutoNumeric.options.styleRules.range0To100With4Steps },
                                value          : 55,
                            },
                            {
                                name           : 'Display a different CSS class if the value is odd or even',
                                description    : 'You can configure the CSS classes as you wish',
                                longDescription: `Sets the <code>autoNumeric-odd</code> css class whenever the raw value is <strong>odd</strong>.<br>Sets the <code>autoNumeric-even</code> css class whenever the raw value is <strong>even</strong>.<br><br>Do note that the code displayed does not show the <code>callback</code> function. To use this, use <code>{ styleRules: AutoNumeric.options.styleRules.evenOdd }</code>.`,
                                options        : { styleRules: AutoNumeric.options.styleRules.evenOdd },
                                value          : 42,
                            },
                            {
                                name           : 'Display a different CSS class for value ranges',
                                description    : 'This modifiy the CSS classes based on the small ranges around zero, from -1 to 1',
                                longDescription: `Sets the <code>autoNumeric-small-negative</code> css class whenever the raw value is between <code>-1</code> and <code>0</code> excluded.<br>Sets the <code>autoNumeric-zero</code> css class whenever the raw value is equal to <code>0</code>.<br>Sets the <code>autoNumeric-small-positive</code> css class whenever the raw value is between <code>0</code> excluded and <code>1</code>.<br><br>Do note that the code displayed does not show the <code>callback</code> function. To use this, use <code>{ styleRules: AutoNumeric.options.styleRules.rangeSmallAndZero }</code>.`,
                                options        : { styleRules: AutoNumeric.options.styleRules.rangeSmallAndZero },
                                value          : 0.02,
                            },
                        ],
                    },
                ],
                sourceCodeElements : [],
            };
        },

        mounted() {
            // Register the Javascript syntax highlighter
            hljs.registerLanguage('javascript', require('../../node_modules/highlight.js/lib/languages/javascript'));

            // Get the references to the source code elements
            this.sourceCodeElements = [...document.querySelectorAll('.sourceCode')];

            // Update the syntax highlighting of all those elements
            this.sourceCodeElements.forEach(elm => {
                hljs.highlightBlock(elm);
            });
        },

        methods: {
            //
        },
    };
</script>

<style lang="scss">
	.examples {
		display        : flex;
		flex-direction : column;
		align-items    : center;
	}

	.importantShoot {
		font-weight    : bolder;
		text-transform : uppercase;
	}

	//FIXME Refactor with Index.vue
	.autoNumeric-positive {
		background-color : forestgreen !important;
		color            : white !important;;
	}

	//FIXME Refactor with Index.vue
	.autoNumeric-negative {
		background-color : brown !important;;
		color            : white !important;;
	}


	.autoNumeric-red {
		background-color : red !important;;
		color            : white !important;;
	}

	.autoNumeric-orange {
		background-color : orange !important;;
		color            : white !important;;
	}

	.autoNumeric-yellow {
		background-color : yellow !important;;
		color            : #333 !important;;
	}

	.autoNumeric-green {
		background-color : forestgreen !important;;
		color            : white !important;;
	}


	.autoNumeric-even {
		background-color : #90D9FF !important;;
		color            : white !important;;
	}

	.autoNumeric-odd {
		background-color : #B2FFDC !important;;
		color            : #333 !important;;
	}


	.autoNumeric-small-negative {
		background-color : yellow !important;;
		color            : red !important;;
	}

	.autoNumeric-zero {
		background-color : transparent !important;;
		color            : red !important;;
	}

	.autoNumeric-small-positive {
		background-color : limegreen !important;;
		color            : white !important;;
	}
</style>
