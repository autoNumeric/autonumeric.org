<template>
	<div class="layout-padding content">
		<h5>Contact us</h5>
		<p>For questions and support please use the <a href="https://gitter.im/autoNumeric/autoNumeric" target="_blank">Gitter chat room</a> or IRC on Freenode <a href="https://webchat.freenode.net/#autoNumeric" target="_blank">#autoNumeric</a>.</p>

		<p>If you found a problem with AutoNumeric or have a great idea to improve the project, please <a href="https://github.com/autoNumeric/autoNumeric/issues/new" target="_blank">open an issue</a> on Github, and we'll take a look at the bug or feature request.</p>
		<p class="italic">Note: The issue list of this repository is <strong>exclusively</strong> for bug reports and feature requests.</p>

		<p class="moreover">You can directly <a href="https://github.com/autoNumeric/autoNumeric/compare" target="_blank">create a pull request</a> if you already feel comfortable with the AutoNumeric source code ; we are very open and welcoming to any contributions!</p>
		<p>Be sure to check the <code><a href="https://github.com/autoNumeric/autoNumeric/blob/next/doc/CONTRIBUTING.md">Contributing</a></code> guidelines before you do.</p>
	</div>
</template>

<script>
    export default {
        name: 'Contacts',

        data() {
            return {};
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.content {
		max-width : 500px;

		p {
			margin-bottom: 1rem;

			&.moreover {
				margin-top : 3rem;
			}
		}
	}

	h5 {
		margin-bottom: 3rem;
	}
</style>
