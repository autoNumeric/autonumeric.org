<template>
	<div class="layout-padding content">
		<router-link to="/">
			<svg class="logo"><use xlink:href="/statics/svg-defs.svg#logo_AutoNumeric_flat"></use></svg>
		</router-link>
		<h5>Support AutoNumeric development</h5>
		<p>AutoNumeric is an MIT licensed open-source project and completely free to use.</p>

		<p>If you are enjoying the productivity of using AutoNumeric, please <a href="https://www.patreon.com/user?u=4810062" target="_blank">consider donating</a> as a sign of appreciation!<br>If you work with AutoNumeric at work, please share this page with your managers.</p>
		<p>Your donations will allow me to focus on maintaining and developing new features for AutoNumeric, while also ensuring timely responses and fixes.</p>

		<p class="baking">Your financial backing will be of <i>great help!</i></p>

		<p class="moreover">There are additional ways for helping AutoNumeric.<br>We welcome all your ideas on new or current features on <a href="https://github.com/autoNumeric/autoNumeric/issues/new" target="_blank">Github</a>. Feel free to <a href="https://github.com/autoNumeric/autoNumeric/issues/new" target="_blank">open an issue</a> or <a href="https://github.com/autoNumeric/autoNumeric/compare" target="_blank">create a pull request</a>.</p>

		<p>Any help is <i>highly</i> appreciated, really.</p>

		<p>Alternatively, you can just come say <i>Hi</i> on our <a href="https://gitter.im/autoNumeric/autoNumeric" target="_blank">chat</a>.<br>We don't bite!</p>

		<div class="links">
			<q-btn icon="card_giftcard" @click="openURL('https://www.patreon.com/user?u=4810062')" id="donate" class="donate">Donate</q-btn>
			<q-btn icon="lightbulb_outline" @click="openURL('https://github.com/autoNumeric/autoNumeric/issues/new')">Submit Ideas</q-btn>
		</div>

		<p>Help this project survive and evolve!</p>
	</div>
</template>

<script>
    import {
        QBtn,
        openURL,
    } from 'quasar-framework';

    export default {
        name: 'Support',

        components: {
            QBtn,
        },

        data() {
            return {};
        },

        methods: {
            openURL,
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	$fontWeightLight   : 300;
	$fontWeightRegular : 400;
	$fontWeightMedium  : 500;

	.content {
		max-width : 500px;

		.logo {
			color: #027be3;
			width: 200px;
			height: 195.05px; // 64.7×200/66.34
			margin-top: 4rem;
			margin-bottom: 2rem;
		}

		p {
			margin-bottom : 1rem;

			&.baking {
				font-family: 'Roboto', sans-serif;
				font-weight: $fontWeightRegular;
			}

			&.moreover {
				margin-top : 3rem;
			}
		}
	}

	.links {
		display : flex;
		justify-content: space-between;
		margin-top : 2rem;
		margin-bottom : 3rem;

		button {
			background: #22718b !important;
			color: white;

			&.donate:hover {
				background: forestgreen !important;
			}
		}
	}

	h5 {
		margin-bottom: 3rem;
	}
</style>
