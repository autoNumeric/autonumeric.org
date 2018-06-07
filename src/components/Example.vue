<template>
	<div class="example" :id="idExample">
		<div class="name">{{ name }}</div>
		<div class="data">
			<div class="descriptions">
				<div class="descriptionShort" v-html="description"></div>
				<div class="descriptionLong" v-html="longDescription"></div>
			</div>
			<div class="playground">

				<vue-autonumeric
						:options="options"
						v-model="rawValue"
						:id="id"
				></vue-autonumeric>
				<div class="rawValueLine">rawValue: <span class="rawValue">{{ rawValue }}</span></div>
			</div>
			<pre class="sourceCode">
				<code class="javascript">{{ codeOptions }}</code>
			</pre>
		</div>
	</div>
</template>

<script type="text/babel">
    import formatting from '../mixins/formatting';
    import VueAutonumeric from 'vue-autonumeric';

    export default {
        name: 'Example',

        components: {
            VueAutonumeric,
        },

        mixins: [
            formatting,
        ],

        props: [
            'name',
            'description',
            'longDescription',
            'options',
            'val', // Can accept an initial predefined value
        ],

        created() {
            if (this.val !== null) {
                this.rawValue = this.val;
            }
        },

        data() {
            return {
                rawValue: 1234567.89,
            };
        },

        computed: {
            idExample() {
                return this.slugify(this.name);
            },

            id() {
                return this.hashCode(this.name);
            },

            /*
            variable() {
                return this.id.replace('-', '');
            },
            */

            codeOptions() {
                // return `const ${this.variable} = new AutoNumeric('#${this.id}', ${this.shownValue(this.options)});`;
                // return `new AutoNumeric('#${this.id}',\n ${this.shownValue(this.options)});`;
                let optionsToShow = '';
                if (typeof this.options === 'object') {
                    optionsToShow = JSON.stringify(this.options, null, 4);
                } else {
                    optionsToShow = this.shownValue(this.options);
                }

                return `new AutoNumeric('#${this.id}', ${optionsToShow});`;
            },
        },

        methods: {
            /**
             * Hash a string
             * This is based on https://stackoverflow.com/a/7616484/2834898
             *
             * @param {string} str
             * @returns {string}
             */
            hashCode(str) {
                let hash = 0;
                let i;
                let chr;
                if (str.length === 0) return hash;

                for (i = 0; i < str.length; i++) {
                    chr  = str.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }

                return String(hash).replace('-', '')
                    .slice(0, 4);
            },

            /**
             * Slugify the given string.
             * Stolen from https://gist.github.com/lilmuckers/5398242, then improved
             *
             * @param {string} str
             * @returns {string}
             */
            slugify(str) {
                // Now we need to do some fiddling with special characters
                const replaceArray = {
                    a  : /à|á|å|â|À|Á/,
                    e  : /è|é|ê|ẽ|ë|É|È/,
                    i  : /ì|í|î|Î|Ï/,
                    o  : /ò|ó|ô|ö|ø|Ò|Ó|Ô|Ö/,
                    u  : /ù|ú|ů|û|Ú|Ù|Û|Ü/,
                    c  : /ç|Ç/,
                    n  : /ñ|Ñ/,
                    ae : /ä|æ/,
                    oe : /ö/,
                    ue : /ü/,
                    Ae : /Ä/,
                    Ue : /Ü/,
                    Oe : /Ö/,
                    ss : /ß/,
                    and: /&/,
                };

                // Replace the strings
                for (const k in replaceArray) {
                    str = str.replace(replaceArray[k], k);
                }

                return str.toLowerCase()
                    .trim()
                    .replace(new RegExp(`[${['.', '=', '-'].join('')}]`, 'g'), ' ') // Replace preserved characters with spaces
                    .replace(/-{2,}/g, ' ')  // Remove duplicate spaces
                    .replace(/[^\w ]/gi, '') // Replaces all non-alphanumeric with empty string
                    .replace(/  /gi, ' ')    // Remove consecutive spaces
                    .replace(/[ ]/gi, '-');  // Convert spaces to dashes
            },
        },
    };
</script>

<style lang="scss">
	.example {
		/*border-top     : 2px solid #1E77C5;*/
		border-top     : 1px solid #ECECEC;
		display        : flex;
		flex-direction : column;
		margin-bottom  : 2rem;
		max-width      : 1200px; //FIXME Remove the hardcoded value?
		width          : 100%;
	}

	.data {
		display : flex;

		& > div,
		& > pre {
			display        : flex;
			flex-direction : column;
			width          : auto;

			&:first-child {
				width: 40%;
				margin-right : 2rem;
			}

			&:last-child {
				width: 40%;
				margin-left : 2rem;
			}
		}
	}

	.name { //FIXME Refactor with AutonumericOption `.optionName`
		font-size     : 1.5rem;
		color         : #073D96;
		margin-top    : 1rem;
		margin-bottom : 0.3rem;
		text-align    : left;
	}

	.descriptions {
		text-align : left;

		.descriptionShort { //FIXME Refactor with AutonumericOption
			font-size     : 1rem;
			margin-top    : 0.4rem;
			margin-bottom : 1rem;
		}

		.descriptionLong { //FIXME Refactor with AutonumericOption
			font-size  : 0.9rem;
			text-align : justify;
			// margin-bottom : $marginBetweenOptionInfoAndTable;
		}
	}

	input { //FIXME Refactor with AutonumericOption / Index.vue
		width            : 270px;
		height           : 40px; //FIXME Finish this: 40px here instead of 30px from the source
		background-color : white;
		border           : 1px solid #D8D8D8;
		border-radius    : 3px;
		color            : #555;
		text-align       : center;
		font-weight      : 400;
		font-size        : 1.5rem; //FIXME Instead of 1.25rem; in AutonumericOption
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

	.sourceCode { //FIXME Refactor with Index.vue
		margin-top    : 0;
		margin-bottom : 0;
		text-align    : left;
		font-size     : 0.7rem;
		min-height    : 120px;
		box-shadow    : 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
	}

	code:not(.javascript), //FIXME Refactor with Documentation.vue
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

	.rawValueLine { //FIXME Refactor with AutonumericOption
		color           : #B3B3B3;
		font-size       : 0.8rem;
		display         : flex;
		justify-content : center;
		align-items     : center;
		margin-top      : 1rem; // 0.5rem by default

		.rawValue {
			font-size   : 1.1rem;
			margin-left : 0.3rem;
		}
	}
</style>
