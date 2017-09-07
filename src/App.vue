<template>
	<!-- Don't drop "q-app" class -->
	<div id="q-app">
		<main>
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
				<q-side-link item to="/contact">
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
			</q-layout>
		</main>
	</div>
</template>

<script>
    import {
        QLayout,
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
            QListHeader,
            QSideLink,
            QItemSide,
            QItemMain,
            QScrollArea,
        },

        data() {
            return {
                layoutStore: {
                    view           : 'lhr Lpr lfr',
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
