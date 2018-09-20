<?php get_header(); ?>

	<div id="app">

		<top-bar :imageabout="options.about_image" :isabout="isAbout"></top-bar>

		<transition :duration="500" name="transition" mode="out-in">
			<router-view :key="$route.fullPath" @loaded="onHandleLoaded"></router-view>
		</transition>

	</div>

<?php get_footer(); ?>