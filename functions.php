<?php

add_theme_support('post-thumbnails');

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

add_action('wp_enqueue_scripts', 'enqueue_scripts');

function city_taxonomy() {
  $labels = array(
    'name' => _x('City', 'taxonomy general name'),
    'singular_name' => _x('City', 'taxonomy singular name'),
    'search_items' => __('Search Cities'),
    'popular_items' => __('Popular Cities'),
    'all_items' => __('All Cities'),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __('Edit City'),
    'update_item' => __('Update City'),
    'add_new_item' => __('Add New City'),
    'new_item_name' => __('New City Name'),
    'separate_items_with_commas' => __('Separate cities with commas'),
    'add_or_remove_items' => __('Add or remove cities'),
    'choose_from_most_used' => __('Choose from the most used cities'),
    'menu_name' => __('Cities'),
  );

  register_taxonomy('city', array('post', 'reviews'), array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array('slug' => 'city'),
  ));
}

add_action('init', 'city_taxonomy', 0);

function get_thumbnail_url($post) {
  if (has_post_thumbnail($post['id'])) {
    $imgArray = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'featuredImageCropped');
    $imgURL = $imgArray[0];
    return $imgURL;
  } else {
    return false;
  }
}

function rest_thumbnail_urls() {
  register_rest_field('post',
    'featured_image_url',
    array(
      'get_callback' => 'get_thumbnail_url',
      'update_callback' => null,
      'schema' => null,
    )
  );
}

add_action('rest_api_init', 'rest_thumbnail_urls');
add_image_size('featuredImageCropped', 1100, 500, true);
?>