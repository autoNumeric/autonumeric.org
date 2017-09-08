<template>
	<div class="landingPage">
		<q-layout
				ref="layout"
				:view="layoutStore.view"
				:left-breakpoint="layoutStore.leftBreakpoint"
				:right-breakpoint="layoutStore.rightBreakpoint"
				:reveal="layoutStore.reveal"
		>
			<!-- Left Side Panel -->
			<q-scroll-area slot="left" style="width: 100%; height: 100%">
				<q-list-header>Navigation</q-list-header>
				<q-side-link item to="/">
					<q-item-side icon="home" />
					<q-item-main label="Home" sublabel="AutoNumeric homepage" />
					<q-item-side right icon="grade" />
				</q-side-link>
				<q-side-link item to="/guide">
					<q-item-side icon="collections_bookmark" />
					<q-item-main label="Documentation" sublabel="View the guide" />
				</q-side-link>
				<q-side-link item to="/examples">
					<q-item-side icon="euro_symbol" />
					<q-item-main label="Examples" sublabel="View thy code source" />
				</q-side-link>
				<q-side-link item to="/configurator">
					<q-item-side icon="developer_board" />
					<q-item-main label="Configurator" sublabel="Generate your custom options" />
				</q-side-link>
				<q-side-link item to="/contacts">
					<q-item-side icon="question_answer" />
					<q-item-main label="Contacts" sublabel="Contact us" />
				</q-side-link>
				<q-side-link item to="/support">
					<q-item-side icon="thumb_up" />
					<q-item-main label="Support" sublabel="Donate to support development" />
				</q-side-link>
			</q-scroll-area>
		<a href="https://github.com/autoNumeric/autoNumeric/"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"></a>
		<q-btn flat @click="toggleLeft" class="burger">
			<q-icon name="menu" />
		</q-btn>
		<div class="firstScreen">
			<div class="hero">
				<ul class="nav">
					<li><router-link to="guide">Documentation</router-link></li>
					<li><router-link to="examples">Examples</router-link></li>
					<li><router-link to="configurator">Configuration generator</router-link></li>
					<li><router-link to="contacts">Contact</router-link></li>
					<li><router-link to="support">Donate</router-link></li>
				</ul>
				<div class="heroMain">
					<router-link to="/">
						<svg class="logo"><use xlink:href="/statics/svg-defs.svg#logo_AutoNumeric_flat"></use></svg>
					</router-link>
					<p class="heroTitle">AutoNumeric.js</p>
					<p class="heroSubText">Automatically format your numbers and currencies</p>
				</div>
				<div>
					<div class="heroActions">
						<router-link to="guide">
							<!--@click="$router.push('/guide')"-->
							<q-btn icon="help" big>Get started</q-btn>
						</router-link>
						<router-link to="configurator">
							<q-btn icon="list" outline big>
								Generate your formatting options
								<q-tooltip
										:delay="1500"
										:offset="[0, 15]"
								>Use the configuration generator to ease the creation of your custom format</q-tooltip>
							</q-btn>
						</router-link>
					</div>
					<p class="support">Help AutoNumeric by <router-link to="support">supporting</router-link> it</p>
				</div>
			</div>
			<div class="keyFeatures">
				<div class="v-centering">
					<div class="cards">
						<p class="title">Easy to use</p>
						<p class="details">
							Natural syntax allows to easily setup and configure any element to be formatted.
						</p>
					</div>
					<div class="cards">
						<p class="title">Versatile</p>
						<p class="details">
							Very high configurability with more than 40 options available.
							Define your format as you wish.
						</p>
					</div>
					<div class="cards">
						<p class="title">Powerful</p>
						<p class="details">
							ES6-ready, Function chaining, Shared options, Web Workers compatible. Actively maintained open-source code.
						</p>
					</div>
				</div>
			</div>
			<router-link to="#whatisit" class="nextScreen">
				<q-btn flat>
					<q-icon name="keyboard_arrow_down" color="blue"/>
				</q-btn>
			</router-link>
		</div>
		<div id="whatisit">
			<div class="description">
				<div class="title">What is AutoNumeric?</div>
				<div class="subTitle">AutoNumeric is a Javascript library that provides live <span class="italic">as-you-type</span> formatting for international numbers and currencies</div>
			</div>
			<div class="examples">
				<div class="try">
					<p class="title">Want to try before you <del>buy</del> get it for free?</p>
					<p class="subTitle">The <code>&lt;input&gt;</code> element below is managed by AutoNumeric, would you care trying it?</p>
					<input
							type="text"
							id="test"
							value="1234567.89"
							v-on:autoNumeric:rawValueModified="updateRawValue"
					>
					<p class="showRawValue">The <code>rawValue</code> is equal to <code>{{ rawValue }}</code>
						<q-tooltip
								:delay="250"
								:offset="[0, 15]"
								anchor="bottom middle"
								self="top middle"
						><div class="rawValueTooltip">You can <strong>always</strong> access the unformatted raw value using `<code>aNElement.getNumericString()</code>`</div></q-tooltip>
					</p>
					<div class="controls">
						<q-btn @click="previousOption" small flat icon="keyboard_arrow_left" color="grey">Previous options</q-btn>
						<q-btn @click="nextOption" small flat icon-right="keyboard_arrow_right" color="grey">Next options</q-btn>
					</div>
				</div>
				<div class="source">
					<p class="title">Source code for that input</p>
					<pre id="sourceCode"><code class="javascript">new AutoNumeric('#input', {
    currencySymbol : ' €',
    decimalCharacter : ',',
    digitGroupSeparator : '.',
});</code>
</pre>
					<ul id="pagination">
						<li v-for="item in optionsArray"></li>
					</ul>
					<!--<div class="note">Note: While the input value is formatted, you can always access the unformatted raw value using <code>aNElement.getNumericString()</code></div>-->
				</div>
			</div>
			<p class="configurator">Use the <router-link to="configurator">configuration generator</router-link> to easily setup the format <strong>you</strong> want.</p>
			<div class="more">Want to know more? Check out the <router-link to="examples">examples</router-link>.</div>
		</div>
		<div class="otherFeatures">
			<div class="line">
				<div class="point">
					<div class="title">Speed & Efficiency</div>
					<div class="details">AutoNumeric focuses on efficiency and speed making all your input interactions blazing fast.</div>
				</div>
				<div class="point">
					<div class="title">Web Workers-enabled</div>
					<div class="details">Got lots of formatting to do? Need even more speed? AutoNumeric supports being used in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>.</div>
				</div>
				<div class="point">
					<div class="title">Independant</div>
					<div class="details">No <a href="https://github.com/autoNumeric/autoNumeric/#dependencies">dependencies</a> are needed to use AutoNumeric.<br>No Jquery, no Lodash, no nothing!</div>
				</div>
			</div>
			<div class="line">
				<div class="point">
					<div class="title">Future proof</div>
					<div class="details">Written in <a href="http://exploringjs.com/es6/index.html">ES6</a>, AutoNumeric uses the latest technologies and is prepared for the future.</div>
				</div>
				<div class="point">
					<div class="title">Android support</div>
					<div class="details">While the Android platform makes input management <a href="https://medium.com/outsystems-experts/javascript-events-unmasked-how-to-create-an-input-mask-for-mobile-fc0df165e8b2">hard to play with</a>, AutoNumeric supports it.</div>
				</div>
				<div class="point">
					<div class="title">Super documentation</div>
					<div class="details">Crystal clear <router-link to="guide">documentation</router-link> that provides great tips and <router-link to="examples">examples</router-link> with source code available.</div>
				</div>
			</div>
		</div>
		<div id="footer">
			<div class="line">
				<div class="title">Contribute</div>
				<div class="subTitle">Help build AutoNumeric</div>
				<div class="details">AutoNumeric is and always will be 100% free and open-source under the MIT license.<br>Fork it on GitHub and help make it bettter.</div>
				<!--<a href="https://github.com/autoNumeric/autoNumeric/#fork-destination-box" target="_blank">Fork on Github</a>-->
				<q-btn flat @click="openURL('https://github.com/autoNumeric/autoNumeric/#fork-destination-box')">Fork on Github</q-btn>
				<div class="title">Donate</div>
				<div class="subTitle">Support AutoNumeric development</div>
				<div class="details">Help pay for dedicated dev time so that AutoNumeric can move forward and evolve.<br>If you are a company that uses AutoNumeric daily, your support means a lot!</div>
				<!--<a href="https://www.patreon.com/user?u=4810062" target="_blank" id="donate">Donate</a>-->
				<q-btn flat @click="openURL('https://www.patreon.com/user?u=4810062')" id="donate">Donate</q-btn>
				<div class="title">Feedback</div>
				<div class="subTitle">Your ideas are precious</div>
				<div class="details">Your ideas and comments are very important to us.<br>Open up an issue on Github for any feature requests or problems, and we'll get on it.<br>Alternatively, if you have a question ping us on our <a href="https://gitter.im/autoNumeric/autoNumeric" target="_blank">Gitter channel</a> or <a href="https://webchat.freenode.net/#autoNumeric" target="_blank">IRC</a>.</div>
				<!--<a href="https://github.com/autoNumeric/autoNumeric/issues/new" target="_blank">Open an issue</a>-->
				<q-btn flat @click="openURL('https://github.com/autoNumeric/autoNumeric/issues/new')">Open an issue</q-btn>
			</div>
			<ul class="nav">
				<li><router-link to="guide">Documentation</router-link></li>
				<li><router-link to="examples">Examples</router-link></li>
				<li><router-link to="configurator">Configuration generator</router-link></li>
				<li><router-link to="contacts">Contact</router-link></li>
				<li><router-link to="support">Donate</router-link></li>
			</ul>
			<p class="copyright">Copyright 2017 © <a href="mailto:alexandre.bonneau@linuxfr.eu">Alexandre Bonneau</a></p>
			<router-link to="/">
				<svg class="logo"><use xlink:href="/statics/svg-defs.svg#logo_AutoNumeric_flat"></use></svg>
			</router-link>
		</div>

		</q-layout>
	</div>
</template>

<script>
    import {
        QBtn,
        QIcon,
        QCard,
        QCardMain,
        QCardTitle,
        QCardSeparator,
        QTooltip,
        QLayout,
        QListHeader,
        QSideLink,
        QItemSide,
        QItemMain,
        QScrollArea,
        openURL,
    } from 'quasar-framework';
//    import AutoNumeric from '../../node_modules/autonumeric/src/main'; // Use that to get the IDE Autocompletion
    import AutoNumeric from '../../node_modules/autonumeric/dist/autoNumeric.min'; // Use that for building the website, since Uglify does not correctly support ES6 yet (cf. https://github.com/mishoo/UglifyJS2/issues/659 and https://github.com/joeeames/WebpackFundamentalsCourse/issues/3)
    import hljs from '../../node_modules/highlight.js/lib/highlight';

    export default {
        name: 'homepage',

        components: {
            QBtn,
            QIcon,
            QCard,
            QCardMain,
            QCardTitle,
            QCardSeparator,
            QTooltip,
            QLayout,
            QListHeader,
            QSideLink,
            QItemSide,
            QItemMain,
            QScrollArea,
        },

        data() {
            return {
                layoutStore: {
                    view           : 'lhr Lpr lff',
                    reveal         : true,
                    leftScroll     : true,
                    rightScroll    : false,
                    leftBreakpoint : 3000,
                    rightBreakpoint: 9999,
                    hideTabs       : true,
                },

                aNElement   : null,
                rawValue    : null,
                /**
                 * AutoNumeric options array, to cycle through
                 */
                optionsArray: [
                    {
                        options: AutoNumeric.getPredefinedOptions().French,
                        source : `new AutoNumeric('#test').french();`,
//                        value  : 1234567.891234,
                    },
                    {
                        options: AutoNumeric.getPredefinedOptions().NorthAmerican,
                        source : `new AutoNumeric('#test').northAmerican();`,
                    },
                    {
                        options: {
                            currencySymbol : 'Ω',
                            decimalCharacter : ',',
                            digitGroupSeparator : '.',
                        },
                        source : `new AutoNumeric('#test', {
    currencySymbol : 'Ω',
    decimalCharacter : ',',
    digitGroupSeparator : '.',
});`,
                    },
                    {
                        options: AutoNumeric.getPredefinedOptions().percentageEU2dec,
                        source : `new AutoNumeric('#test',
    AutoNumeric.getPredefinedOptions().percentageEU2dec);`,
                    },
                    {
                        options: {
                            styleRules: AutoNumeric.options.styleRules.positiveNegative,
	                        //FIXME AutoNumeric does not update the css classes when modifying `styleRules` via an `update()` (Should it remove those classes when changing the styleRules option too?)
                        },
                        source : `new AutoNumeric('#test', {
    styleRules:
        AutoNumeric.options.styleRules.positiveNegative,
});`,
                    },
/*
                    {
                        options: {
                            readOnly : true,
                        },
                        source : `new AutoNumeric('#test', { readOnly : true });`, //FIXME This fail in AutoNumeric
                    },
                    */
                    {
                        options: {
                            currencySymbol         : ' XPF',
                            digitGroupSeparator    : '\'',
                            decimalPlaces          : 3,
                            currencySymbolPlacement: AutoNumeric.options.currencySymbolPlacement.suffix,
                        },
                        source : `new AutoNumeric('#test', {
    currencySymbol         : ' XPF',
    digitGroupSeparator    : '\\'',
    decimalPlaces          : 3,
    currencySymbolPlacement:
    AutoNumeric.options.currencySymbolPlacement.suffix,
});`,
                    },
                    {
                        options: {
                            decimalPlacesRawValue     : 6,
                            decimalPlacesShownOnBlur  : 3,
                            decimalPlacesShownOnFocus : 4,
                            emptyInputBehavior        : 'zero',
                            minimumValue              : -273.15,
                            negativeBracketsTypeOnBlur: '(,)',
                            showPositiveSign          : true,
                            symbolWhenUnfocused       : ' ℃',
                            valuesToStrings           : {
                                '-273.15': 'Absolute zero',
                                0        : 'Freezing',
                                22.5     : 'Warm',
                                30       : 'Hot',
                                100      : 'Boiling',
                                666      : 'Hellish',
                            },
                            wheelStep                 : 2.5,
                        },
                        source : `new AutoNumeric('#test', {
    decimalPlacesRawValue     : 6,
    decimalPlacesShownOnBlur  : 3,
    decimalPlacesShownOnFocus : 4,
    emptyInputBehavior        : 'zero',
    minimumValue              : -276,
    negativeBracketsTypeOnBlur: '(,)',
    showPositiveSign          : true,
    symbolWhenUnfocused       : ' ℃',
    valuesToStrings           : {
        '-273.15': 'Absolute zero',
        0        : 'Freezing',
        22.5     : 'Warm',
        30       : 'Hot',
        100      : 'Boiling',
        666      : 'Hellish',
    },
    wheelStep                 : 2.5,
});`,
                    },
                ],

                currentOptionIndex: 0,

                sourceCodeElement: null,
            };
        },

        mounted() {
            // Initialize the AutoNumeric element
            this.aNElement = new AutoNumeric('#test').french();
            this.updateRawValue();

            // Get the references to the interesting elements
            this.sourceCodeElement = document.querySelector('#sourceCode');
            this.sourceCodePagination = document.querySelector('#pagination');

            // Register the Javascript syntax highlighter
            hljs.registerLanguage('javascript', require('../../node_modules/highlight.js/lib/languages/javascript'));

            // Update the syntax highlighting
            hljs.highlightBlock(this.sourceCodeElement);
            this.setPagination(0);
        },

        methods: {
            openURL,

            toggleLeft() {
                this.$refs.layout.toggleLeft();
            },

            nextOption() {
                if (this.currentOptionIndex === this.optionsArray.length - 1) {
                    // Loop if at the end of the array
                    this.currentOptionIndex = 0;
                } else {
                    this.currentOptionIndex++;
                }

                this.resetInputCssClasses();
                this.updateOption(
                    this.optionsArray[this.currentOptionIndex].options,
                    this.optionsArray[this.currentOptionIndex].source,
                );
                this.setPagination(this.currentOptionIndex);
            },

            previousOption() {
                if (this.currentOptionIndex === 0) {
                    // Loop if at the start of the array
                    this.currentOptionIndex = this.optionsArray.length - 1;
                } else {
                    this.currentOptionIndex--;
                }

                this.resetInputCssClasses();
                this.updateOption(
                    this.optionsArray[this.currentOptionIndex].options,
                    this.optionsArray[this.currentOptionIndex].source,
                );
                this.setPagination(this.currentOptionIndex);
            },

            updateOption(options, source) {
                // Update with the new AutoNumeric options
                this.aNElement.options.reset().update(options);
                this.updateRawValue();

                // Update the source code shown
                this.sourceCodeElement.innerHTML = source;

                // Update the syntax highlighting
                hljs.highlightBlock(this.sourceCodeElement);
            },

            setPagination(index) {
                this.resetPagination();
                this.sourceCodePagination.childNodes[index].classList.add('selected');
            },

            resetPagination() {
                const elements = [... this.sourceCodePagination.querySelectorAll('li')];
                elements.forEach(elm => {
                    elm.classList.remove('selected');
                });
            },

            resetInputCssClasses() {
                this.aNElement.node().classList.remove('autoNumeric-positive', '.autoNumeric-negative');
            },

            updateRawValue() {
                if (this.aNElement !== null) {
                    this.rawValue = this.aNElement.getNumericString();
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	//
</style>

<style lang="scss" rel="stylesheet/scss">
	$primary   : #0094FF;
	$secondary : #1d6a91;
	$colorText : #333;

	$colorLinkHero              : white;
	$colorLinkHeroHovered       : #AED9FF;
	$colorLinkHeroDonate        : #BCCEE0;
	$colorLinkHeroDonateHovered : #0A2642;
	$colorBgLightBlue           : #EDF5FB;
	$colorLinkNavFooter         : #c9c9c9;

	$fontWeightLight   : 300;
	$fontWeightRegular : 400;
	$fontWeightMedium  : 500;

	$colorBgFooterPrimary   : #295375;
	$colorBgFooterSecondary : #224460;

	@import url('https://fonts.googleapis.com/css?family=Open+Sans:300|Roboto:300,400,500');

	body {
		color       : #333;
		font-family : 'Roboto', sans-serif;
		font-weight : $fontWeightLight;
	}

	a:focus { // This rule is missing from the default quasar.mat.css file
		color: #027be3;
		text-decoration: underline;
	}

	.logo {
		width  : 66.34px;
		height : 64.7px;
	}

	/*main {
		// This is needed to prevent the <q-layout><main> element to add an unneeded margin-top
		margin-top : 0;
	}*/

	.burger {
		position : absolute;
		top      : 10px;
		left     : 10px;
		color    : white;
	}

	.italic {
		font-style:italic;
	}

	.nav {
		display    : flex;
		list-style : none;
		font-size  : 0.9rem;
		margin-top : 1.5rem;

		li:not(:last-child) {
			margin-right: 2rem;
		}

		a {
			color: $colorLinkHero;

			&:hover {
				color: $colorLinkHeroHovered;
			}
		}
	}

	p {
		margin : 0;
		font-family: 'Open Sans', sans-serif;
		font-weight: 300;
		font-size: 0.9rem;
	}

	.landingPage {
		display        : flex;
		flex-direction : column;
		align-items    : center;

		& > div {
			width  : 100%;
		}
	}

	.firstScreen {
		display          : flex;
		flex-direction   : column;

		.hero {
			height           : 60vh;
			display          : flex;
			flex-direction   : column;
			align-items      : center;
			justify-content  : space-between;
			color            : white;
			background-image : linear-gradient($primary, $secondary);
			font-weight      : $fontWeightLight;

			.logo {
				color: white;
			}
		}

		.heroMain {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.heroTitle {
			font-size     : 3.2rem;
			margin-top    : 2rem;
			margin-bottom : 4rem;
		}

		.heroSubText {
			font-size : 2rem;
		}

		.heroActions {
			a:first-child button {
				margin-right     : 2rem;
				background-color : white;
				color            : #515151;

				&:hover {
					box-shadow       : 0px 3px 11px 7px rgba(50, 50, 50, 0.40);
					color            : $primary;
					background-color : white;
				}
			}

			a:last-child button {
				background-color : transparent;
				color            : white;
				border-color     : #BFCECE;

				&:hover {
					background-color : rgba(255, 255, 255, 0.05) !important;
				}
			}
		}

		.support {
			margin-top    : 2rem;
			font-size     : 1rem;
			font-style    : italic;
			margin-bottom : 1rem;
			text-align    : center;

			a {
				color : $colorLinkHeroDonate;

				&:hover {
					color: $colorLinkHeroDonateHovered;
				}
			}
		}

		.keyFeatures {
			height          : 35vh;
			display         : flex;
			align-items     : center;
			justify-content : center;

			.v-centering {
				width           : 100%;
				display         : flex;
				align-items     : flex-start;
				justify-content : center;
			}

			.cards {
				display        : flex;
				flex-direction : column;
				width          : 20%;
				max-width      : 260px;

				&:nth-child(2) {
					margin-left  : 3rem;
					margin-right : 3rem;
				}
			}

			.title {
				font-size     : 1.5rem;
				font-weight   : $fontWeightMedium;
				color         : $primary;
				margin-bottom : 1.5rem;
			}

			.details {
				font-family : 'Open Sans', sans-serif;
				font-weight : $fontWeightLight;
				font-size   : 0.9rem;
			}
		}

		.nextScreen {
			align-self: center;
		}
	}

	#whatisit {
		background-color : $colorBgLightBlue;
		display          : flex;
		flex-direction   : column;
		align-items      : center;

		$marginTopDownWhatIsIt : 4rem;

		.description {
			margin-top    : 3rem;
			margin-bottom : $marginTopDownWhatIsIt;

			.title {
				font-size : 2rem;
			}

			.subTitle {
				margin-top : 0.5rem;
				font-size  : 1.4rem;
				max-width  : 700px;
			}
		}

		.examples {
			display         : flex;
			justify-content : space-around;
			width           : 80%;
			max-width       : 1100px;

			& > div {
				width : 40%;
			}

			.try {
				display        : flex;
				flex-direction : column;
				align-items    : center;

				p {
					font-size : 0.9rem;
				}

				del {
					position        : relative;
					text-decoration : none;

					&::after {
						content       : '';
						position      : absolute;
						top           : 50%;
						left          : 0;
						right         : 0;
						border-bottom : 6px solid rgba(0, 148, 255, 0.85);
					}
				}

				.title {
					font-size   : 1.2rem;
					font-weight : $fontWeightMedium;
				}

				.subTitle {
					margin-top    : 0.5rem;
					margin-bottom : 1rem;
					max-width     : 270px;
				}

				input {
					min-width        : 270px;
					height           : 40px;
					background-color : white;
					border           : 1px solid #D8D8D8;
					border-radius    : 3px;
					color            : #555;
					text-align       : center;
					font-weight      : $fontWeightRegular;
					font-size        : 1.5rem;
				}

				.showRawValue {
					margin-top : 0.5rem;
					cursor     : help;
				}

				/*.rawValueTooltip { //FIXME This is not used
					color: white;
					background-color: $secondary !important;
				}*/

				.controls {
					margin-top      : 0.4rem;
					display         : flex;
					min-width       : 270px;
					justify-content : space-between;
				}
			}

			#sourceCode {
				text-align : left;
				font-size  : 0.7rem;
				min-height : 120px;
				box-shadow : 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
			}

			.source {
				display        : flex;
				flex-direction : column;
				align-items    : stretch;

				.title {
					font-size   : 0.9rem;
					font-weight : $fontWeightMedium;
				}

				#pagination {
					align-self : center;
					list-style : none;
					display    : flex;
					padding    : 0;
					margin     : 0 0 0.5rem;

					li {
						display          : block;
						height           : 10px;
						width            : 10px;
						border-radius    : 50%;
						border           : 1px solid transparent;
						background-color : #B2C4D1;
						transition       : background-color 0.3s ease;
						pointer-events : none;

						&:not(:last-child) {
							margin-right : 0.5rem;
						}

						&.selected {
							background-color : $primary;
						}
					}
				}

				.note {
					font-size : 0.75rem;
				}
			}
		}

		code:not(.javascript) {
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

		.configurator {
			margin-top : $marginTopDownWhatIsIt;

			strong {
				font-weight : $fontWeightMedium;
			}
		}

		.more {
			margin-top    : 1rem;
			margin-bottom : 3rem;
			font-size     : 0.9rem;
		}
	}

	.otherFeatures {
		display        : flex;
		flex-direction : column;
		align-items    : center;

		.line {
			max-width       : 1100px;
			display         : flex;
			justify-content : space-between;
			$spacingTopBottom : 4rem;

			&:first-child {
				margin-top    : $spacingTopBottom;
				margin-bottom : 4rem;
			}

			&:last-child {
				margin-bottom : $spacingTopBottom;
			}
		}

		.point {
			width          : 30%;
			max-width      : 260px;
			display        : flex;
			flex-direction : column;

			.title { //FIXME DRY this with .keyFeatures (or not)
				font-size     : 1.4rem;
				font-weight   : $fontWeightMedium;
				color         : $primary;
				margin-bottom : 0.8rem;
			}

			.details {
				font-family : 'Open Sans', sans-serif;
				font-weight : $fontWeightLight;
				font-size   : 0.9rem;
			}
		}
	}

	#footer {
		display          : flex;
		flex-direction   : column;
		align-items      : center;
		color            : white;
		background-image : linear-gradient($colorBgFooterPrimary, $colorBgFooterSecondary);

		.line {
			display               : grid;
			grid-template-columns : repeat(3, 1fr);
			grid-template-rows    : repeat(4, auto);
			grid-auto-flow        : column;
			grid-column-gap       : 2rem;
			max-width             : 1100px;
			align-items           : start;
			justify-items         : center;

			$spacingTopBottom     : 4rem;

			&:first-child {
				margin-top    : $spacingTopBottom;
				margin-bottom : 4rem;
			}

			&:last-child {
				margin-bottom : $spacingTopBottom;
			}

			& > a,
			& > button {
				display          : flex;
				justify-content  : center;
				align-items      : center;
				width            : 70%;
				margin-top       : 2rem;
				color            : #B0DEFF;
				background-color : #295375;
				border           : 1px solid #1A374D;
				transition       : all 0.3s ease;
				font-variant     : all-small-caps;
				border-radius    : 3px;
				height           : 40px;
				font-size        : 0.9rem;

				&:hover {
					border-color     : #568AB4;
					background-color : #386589;
				}
			}
		}

		.title {
			font-size     : 1.4rem;
			font-weight   : $fontWeightMedium;
			color         : white;
			margin-bottom : 1rem;
		}

		.subTitle {
			margin-bottom : 1.5rem;
		}

		.details {
			font-family : 'Open Sans', sans-serif;
			font-weight : $fontWeightLight;
			font-size   : 0.9rem;

			a {
				color : #73B0E6;

				&:hover,
				&:focus {
					color : #66E6D3;
				}
			}
		}

		#donate {
			&:hover {
				color            : white;
				border-color     : #4EC03D;
				background-color : forestgreen;
			}
		}

		.nav a {
			color : $colorLinkNavFooter;

			&:hover {
				color : $colorLinkHeroHovered;
			}
		}

		.copyright {
			font-size : 0.9rem;

			a {
				color : white;

				&:hover {
					color : $colorLinkHeroHovered;
				}
			}
		}

		.logo {
			color         : $colorBgFooterPrimary;
			margin-top    : 3rem;
			margin-bottom : 10rem;
		}
	}

	.autoNumeric-positive {
		background-color : forestgreen !important;
		color            : white !important;;
	}

	.autoNumeric-negative {
		background-color : brown !important;;
		color            : white !important;;
	}
</style>
