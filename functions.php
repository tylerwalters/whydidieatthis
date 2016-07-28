<?php

function enqueue_scripts() {
  wp_enqueue_style('style-css', get_template_directory_uri() . '/dist/styles/style.css');
  wp_enqueue_script('angular-core', get_template_directory_uri() . '/node_modules/angular/angular.min.js', array('jquery'), false, true);
  wp_enqueue_script('angular-resource', get_template_directory_uri() . '/node_modules/angular-resource/angular-resource.min.js', array('angular-core'), false, true);
  wp_enqueue_script('ui-router', get_template_directory_uri() . '/node_modules/angular-ui-router/release/angular-ui-router.min.js', array('angular-core'), false, true);
  wp_enqueue_script('app-script', get_template_directory_uri() . '/dist/scripts/app.js', array('ui-router'), false, true);
  wp_localize_script('app-script', 'constants', array(
      'apiUrl' => rest_get_url_prefix() . '/wp/v2/',
      'templateDir' => get_template_directory_uri() . '/',
      'nonce' => wp_create_nonce('wp_rest'),
      'isAdmin' => current_user_can('administrator')
    )
  );
}

function reviews_cpt() {
  $labels = array(
    'name'               => _x('Reviews', 'post type general name'),
    'singular_name'      => _x('Review', 'post type singular name'),
    'menu_name'          => _x('Reviews', 'admin menu'),
    'name_admin_bar'     => _x('Review', 'add new on admin bar'),
    'add_new'            => _x('Add New', 'reviews'),
    'add_new_item'       => __('Add New Review'),
    'new_item'           => __('New Review'),
    'edit_item'          => __('Edit Review'),
    'view_item'          => __('View Review'),
    'all_items'          => __('All Reviews'),
    'search_items'       => __('Search Reviews'),
    'parent_item_colon'  => __('Parent Reviews:'),
    'not_found'          => __('No reviews found.'),
    'not_found_in_trash' => __('No reviews found in Trash.')
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array('slug' => 'reviews'),
    'capability_type'    => 'post',
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'show_in_rest'       => true,
    'rest_base'          => 'reviews',
    'rest_controller_class' => 'WP_REST_Posts_Controller',
    'supports'           => array('title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments')
  );

  register_post_type('reviews', $args);
  register_taxonomy_for_object_type('category', 'reviews');
  register_taxonomy_for_object_type('post_tag', 'reviews');
}

add_action('init', 'reviews_cpt');
add_action('wp_enqueue_scripts', 'enqueue_scripts');
add_theme_support('post-thumbnails');

function get_thumbnail_url($post){
  if(has_post_thumbnail($post['id'])){
    $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), 'full' );
    $imgURL = $imgArray[0];
    return $imgURL;
  } else {
    return false;
  }
}

function rest_thumbnail_urls() {
  register_rest_field( 'post',
    'featured_image_url',
    array(
      'get_callback'    => 'get_thumbnail_url',
      'update_callback' => null,
      'schema'          => null,
    )
  );
  register_rest_field( 'reviews',
    'featured_image_url',
    array(
      'get_callback'    => 'get_thumbnail_url',
      'update_callback' => null,
      'schema'          => null,
    )
  );
}

add_action('rest_api_init', 'rest_thumbnail_urls');
?>