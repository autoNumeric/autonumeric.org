<template>
	<!-- Don't drop "q-app" class -->
	<div id="q-app">
		<header></header>
		<main>
			<q-layout
					ref="layout"
					:view="layoutStore.view"
					:left-breakpoint="layoutStore.leftBreakpoint"
					:right-breakpoint="layoutStore.rightBreakpoint"
					:reveal="layoutStore.reveal"
			>
				<!-- Header -->
				<q-toolbar slot="header">
					<q-btn flat @click="$refs.layout.toggleLeft()">
						<q-icon name="menu" />
					</q-btn>
					<q-toolbar-title>
						AutoNumeric.js
						<span slot="subtitle">Automatically format your numbers and currencies</span>
					</q-toolbar-title>
					<!--<q-btn class="within-iframe-hide" flat @click="$router.replace('/')" style="margin-right: 15px">
						<q-icon name="keyboard_arrow_left" />
						Go back
					</q-btn>-->
				</q-toolbar>

				<!-- Navigation -->
				<q-tabs slot="navigation" v-if="!layoutStore.hideTabs">
					<q-route-tab slot="title" icon="collections_bookmark" to="/guide" replace label="Documentation" />
					<q-route-tab slot="title" icon="euro_symbol" to="/examples" replace label="Examples" />
					<q-route-tab slot="title" icon="developer_board" to="/configurator" replace label="Configuration generator" />
					<q-route-tab slot="title" icon="thumb_up" to="/support" replace label="Donate" />
				</q-tabs>

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
					<q-side-link item to="/contact">
						<q-item-side icon="question_answer" />
						<q-item-main label="Contacts" sublabel="Contact us" />
					</q-side-link>
					<q-side-link item to="/support">
						<q-item-side icon="thumb_up" />
						<q-item-main label="Support" sublabel="Donate to support development" />
					</q-side-link>
				</q-scroll-area>

				<!-- Right Side Panel -->
				<!--<q-scroll-area slot="right" style="width: 100%; height: 100%">
					<q-list-header>Right Panel</q-list-header>
					<div v-if="layoutStore.rightScroll" style="padding: 25px 16px 16px;">
						<p class="caption" v-for="n in 50">
							<em>Right Panel has intended scroll</em>
						</p>
					</div>
				</q-scroll-area>-->

				<!-- sub-routes get injected here: -->
				<router-view></router-view>

				<!-- Footer -->
				<q-toolbar slot="footer" color="violet">
					<q-toolbar-title>
						This is the footer
					</q-toolbar-title>
				</q-toolbar>
			</q-layout>
		</main>
	</div>
</template>

<script>
    import {
//        dom,
//        event,
//        openURL,
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QTabs,
        QTab,
        QAlert,
        QRouteTab,
        QList,
        QListHeader,
        QSideLink,
        QItemSide,
        QItemMain,
        QScrollArea,
    } from 'quasar-framework';

    export default {
        name      : 'app',
        components: {
            QLayout,
            QToolbar,
            QToolbarTitle,
            QBtn,
            QIcon,
            QTabs,
            QTab,
            QAlert,
            QRouteTab,
            QList,
            QListHeader,
            QSideLink,
            QItemSide,
            QItemMain,
            QScrollArea,
        },

        data() {
            return {
                layoutStore: {
                    view           : 'lHr LpR lfr',
                    reveal         : true,
                    leftScroll     : true,
                    rightScroll    : false,
                    leftBreakpoint : 996,
                    rightBreakpoint: 1200,
                    hideTabs       : true,
                },
            };
        },

        computed: {},

        methods: {},
    };
</script>

<style lang="stylus">
	@import '~variables'

	main
		text-align center
		/*margin-top 40px*/

	header
		margin 0
		height 10px
		background-color $primary
</style>
