<template>
	<div class="configurator">
		<div v-for="(o, key, index) in options" :key="o.name">Item:{{ o }} | key:{{ key }} | index:{{ index }}</div>
		<div class="optionsList table">
			<div class="thead">
				<div>Select your options</div>
				<div>Choices</div>
				<div>Value</div>
				<div>Description</div>
			</div>
			<div class="tbody" v-for="(o, index) in options" :key="o.name">
				<div class="optionInfo">
					<div class="optionName">{{ o.name }}</div>
					<div class="optionDesc" v-html="o.descriptionShort"></div>
				</div>
				<div class="option" :class="{ defaultValue: option.defaultValue }" v-for="(option, i) in o.optionList" :key="`${o.name}-${o.optionList.optionChoice}`">
					<div class="selections">
						<!--//FIXME Finish this ->-->
						<!--<q-radio v-model="list" :val="option.optionChoice" :name="`${o.name}-${option.optionChoice}`"/>-->
						<!--<q-radio v-model="list" :val="option.optionChoice" :name="`${o.name}`"/>-->
						<!--<q-radio v-model="list[index]" :val="option.optionChoice" :name="`${o.name}`"/>-->
						<!--<q-radio v-model="list[index]" :val="option.optionChoice"/>-->
						<q-radio v-model="list[index]" :val="`${o.name}-${option.optionChoice}`"/>
						<!--<q-radio v-model="list[index]" :val="`${o.name}-${i}`"/>-->
					</div>
					<div class="choice">{{ option.optionChoice }}</div>
					<div class="value"><code>{{ shownValue(option.value) }}</code></div>
					<div class="description" v-html="option.description"></div>
				</div>
				<div v-if="o.isOptionChoiceOpen">Custom value: <input type="text" placeholder="Enter value here"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/babel">
    import {
        QRadio,
    } from 'quasar-framework';
    import AutoNumericOptions from '../mixins/autonumeric-options';

    export default {
        name: 'configurator',

        components: {
            QRadio,
        },

        mixins: [
            AutoNumericOptions,
        ],

        props: [],

        data() {
            return {
                list: [], //FIXME Finish this
            };
        },

        computed: {
            //
        },

        methods: {
            /**
             * Add quotes if the given value is a String
             *
             * @param {*|string} value
             * @returns {*}
             */
            shownValue(value) { //FIXME Refactor this with AutonumericOption.vue
                if (typeof value === 'string') {
                    return `'${value}'`;
                } else if (value === null) {
                    return 'null';
                } else {
                    return value;
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.configurator {
		//
	}

	.table {
		display : table;
	}

	.thead {
		display : table-header-group;

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
	}

	//FIXME Refactor this with `AutonumericOption.vue` -->
	.optionName {
		font-family : 'Open Sans', sans-serif;
		font-size   : 1.5rem;
		color       : #073D96;
	}

	.description {
		font-size  : 0.8rem;
		text-align : left;
	}

	$fontWeightLight   : 300;
	.choice {
		font-size   : 1.2rem;
		font-weight : $fontWeightLight;
		min-width   : 100px;
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

	//FIXME Refactor this with Documentation.vue -->
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
</style>
