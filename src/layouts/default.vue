<template>
	<q-layout
			:view="layoutStore.view"
			:left-breakpoint="layoutStore.leftBreakpoint"
			:right-breakpoint="layoutStore.rightBreakpoint"
	>
		<!-- Toolbar -->
		<!--//FIXME 'reveal' here fails-->
		<!--<q-layout-header :reveal="layoutStore.reveal">-->
		<q-layout-header>
			<q-toolbar color="primary">
				<q-btn
						flat round dense
						@click="toggleLeftDrawer"
						icon="menu"
						aria-label="Menu"
				/>

				<q-toolbar-title>
					<router-link to="/" class="homeLink">AutoNumeric.js</router-link>
					<!--<span slot="subtitle">Optional subtitle</span>-->
				</q-toolbar-title>
			</q-toolbar>
		</q-layout-header>

		<!-- Left Side Panel -->
		<q-layout-drawer
				v-model="leftDrawerOpen"
				:content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
				side="left"
		>
			<q-list
					no-border
					link
					inset-delimiter
			>
				<q-list-header>Navigation</q-list-header>
				<q-item to="/">
					<q-item-side icon="home" />
					<q-item-main label="Home" sublabel="AutoNumeric homepage" />
					<q-item-side right icon="grade" />
				</q-item>
				<q-item to="/guide">
					<q-item-side icon="collections_bookmark" />
					<q-item-main label="Documentation" sublabel="View the guide" />
				</q-item>
				<q-item to="/examples">
					<q-item-side icon="euro_symbol" />
					<q-item-main label="Examples" sublabel="View thy code source" />
				</q-item>
				<q-item to="/configurator">
					<q-item-side icon="developer_board" />
					<q-item-main label="Configurator" sublabel="Generate your custom options" />
				</q-item>
				<q-item to="/contacts">
					<q-item-side icon="question_answer" />
					<q-item-main label="Contacts" sublabel="Contact us" />
				</q-item>
				<q-item to="/support">
					<q-item-side icon="thumb_up" />
					<q-item-main label="Support" sublabel="Donate to support development" />
				</q-item>
			</q-list>
		</q-layout-drawer>

		<!-- sub-routes get injected here: -->
		<q-page-container>
			<router-view @toggleLeftSidebar="toggleLeftDrawer"></router-view>
		</q-page-container>

		<!-- Footer -->
		<main-footer slot="footer"></main-footer>
	</q-layout>
</template>

<script>
    import MainFooter from './Footer.vue';

    export default {
        name      : 'app',
        components: {
            MainFooter,
        },

        data() {
            return {
                layoutStore   : {
                    view           : 'lHr Lpr lff',
                    reveal         : true,
                    leftScroll     : true,
                    rightScroll    : false,
                    leftBreakpoint : 3000,
                    rightBreakpoint: 9999,
                    hideTabs       : true,
                },
                leftDrawerOpen: false,
            };
        },

        computed: {},

        methods: {
            toggleLeftDrawer() {
                this.leftDrawerOpen = !this.leftDrawerOpen;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
	main {
		/*margin-top : 40px;*/
	}

	.homeLink {
		color: white !important;

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
