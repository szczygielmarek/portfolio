<?php
function site_scripts() {
  global $wp_styles; // Call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way
        
     wp_deregister_script('jquery');
    // wp_enqueue_script( 'site-js', get_template_directory_uri() . '/assets/dist/main.js', array( 'jquery' ), filemtime(get_template_directory() . '/assets/dist'), true );
    wp_enqueue_script( 'site-js', get_template_directory_uri() . '/assets/dist/main.js', array(), filemtime(get_template_directory() . '/assets/dist'), true );
    wp_localize_script( 'site-js', 'wp', array(
      'rest_url' => rest_url(),
      'site_url' => home_url(),
      'dist_url' => "/portfolio/"
    ));

    // Register main stylesheet
    wp_enqueue_style( 'site-css', get_template_directory_uri() . '/assets/dist/main.css', array(), filemtime(get_template_directory() . '/assets/dist'), 'all' );

    // Comment reply script for threaded comments
    if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
      wp_enqueue_script( 'comment-reply' );
    }
}
add_action('wp_enqueue_scripts', 'site_scripts', 999);

remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
remove_action( 'admin_print_styles', 'print_emoji_styles' );
function my_deregister_scripts(){
  wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', 'my_deregister_scripts' );