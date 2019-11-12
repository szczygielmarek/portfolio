<!doctype html>

  <html class="no-js"  <?php language_attributes(); ?>>

	<head>
		<meta charset="utf-8">
		
		<!-- Force IE to use the latest rendering engine available -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<!-- Mobile Meta -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta class="foundation-mq">

		<meta name="description" content="Szczygieł Marek - Front End Developer - Kraków - Portfolio - Strony internetowe" />
		
		<meta name="theme-color" content="#0a0a0a">
		<meta name="msapplication-TileColor" content="#0a0a0a">
		<meta name="msapplication-navbutton-color" content="#0a0a0a">
		<meta name="apple-mobile-web-app-status-bar-style" content="#0a0a0a">
		<link rel="manifest" href="/manifest.json">

		<!-- If Site Icon isn't set in customizer -->
		<?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) { ?>
			<!-- Icons & Favicons -->
			<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
			<link href="<?php echo get_template_directory_uri(); ?>/favicon.png" rel="apple-touch-icon" />	
	    <?php } ?>

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php wp_head(); ?>

	</head>
			
	<body <?php body_class(); ?>>

	<noscript><strong>We're sorry but this website doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript>