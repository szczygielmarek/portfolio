<?php get_header(); ?>

	<div id="app">

		<top-bar :imageabout="options.about_image"></top-bar>

		<transition :duration="500" name="transition" mode="out-in">
			<router-view :key="$route.fullPath"></router-view>
		</transition>

	</div>

<?php get_footer(); ?>