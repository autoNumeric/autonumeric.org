<template>
	<!-- Don't drop "q-app" class -->
	<div id="q-app">
		<router-view></router-view>
	</div>
</template>

<script>
    /*
	 * Root component
	 */
    export default {};
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

	$fontWeightLight = 300
	body {
		color       : #333;
		font-family : 'Roboto', sans-serif;
		font-weight : $fontWeightLight;
		display 	: inline-block;
	}
	#q-app{
		display : inline-block;
	}
</style>
