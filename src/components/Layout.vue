<template>
	<q-layout
			ref="layout"
			:view="layoutStore.view"
			:left-breakpoint="layoutStore.leftBreakpoint"
			:right-breakpoint="layoutStore.rightBreakpoint"
			:reveal="layoutStore.reveal"
	>
		<!-- Toolbar -->
		<q-toolbar slot="header" color="primary">
			<q-btn flat @click="$refs.layout.toggleLeft()">
				<q-icon name="menu" />
			</q-btn>
			<q-toolbar-title>
				<router-link to="/" class="homeLink">AutoNumeric.js</router-link>
			</q-toolbar-title>
		</q-toolbar>

		<!-- Github ribbon -->
		<!--<a href="https://github.com/autoNumeric/autoNumeric/" style="z-index: 9999;"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"></a>-->

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

		<!-- sub-routes get injected here: -->
		<router-view @toggleLeftSidebar="$refs.layout.toggleLeft()"></router-view>

		<!-- Footer -->
		<main-footer slot="footer"></main-footer>
	</q-layout>
</template>

<script>
    import {
        QBtn,
        QIcon,
        QLayout,
        QListHeader,
        QSideLink,
        QItemSide,
        QItemMain,
        QScrollArea,
        QToolbar,
        QToolbarTitle,
    } from 'quasar-framework';
    import MainFooter from './Footer.vue';

    export default {
        name      : 'app',
        components: {
            QBtn,
            QIcon,
            QLayout,
            QListHeader,
            QSideLink,
            QItemSide,
            QItemMain,
            QScrollArea,
            MainFooter,
            QToolbar,
            QToolbarTitle,
        },

        data() {
            return {
                layoutStore: {
                    view           : 'lHr Lpr lff',
                    reveal         : true,
                    leftScroll     : true,
                    rightScroll    : false,
                    leftBreakpoint : 3000,
                    rightBreakpoint: 9999,
                    hideTabs       : true,
                },
            };
        },

        computed: {},

        methods: {},
    };
</script>

<style lang="scss" rel="stylesheet/scss">
	main {
		/*margin-top : 40px;*/
	}

	.homeLink {
		color: white;

		&:active,
		&:hover {
			color : white;
		}
	}

	.construction {
		margin-top : 1rem;
		margin-bottom: 3rem;
	}
</style>
