<?php
// Theme support options
require_once(get_template_directory().'/functions/theme-support.php'); 

// WP Head and other cleanup functions
require_once(get_template_directory().'/functions/cleanup.php'); 

// Register scripts and stylesheets
require_once(get_template_directory().'/functions/enqueue-scripts.php'); 

// Custom Posts
require_once(get_template_directory().'/functions/custom-posts.php'); 



// ACF Options Page
if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}



// REST API Dominant Color
add_action( 'rest_api_init', 'create_api_posts_meta_field' );
 
function create_api_posts_meta_field() {
 
    // 'dominant_color_hex', 'dominant_color_rgb', 'color_palette_rgb', 'color_palette_hex'
    register_rest_field( 'attachment', 'dominant_color_hex', array(
           'get_callback'    => 'get_post_meta_for_api',
           'schema'          => null,
        )
    );
}

function get_post_meta_for_api( $object ) {
    $post_id = $object['id'];
    $meta = get_post_meta( $post_id );

    if ( isset( $meta['dominant_color_hex' ] ) && isset( $meta['dominant_color_hex' ][0] ) ) {
        return $meta['dominant_color_hex' ][0];
	}
	
    return false;
}

