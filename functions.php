<?php

function enqueue_scripts() {
  wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/node_modules/bootstrap/dist/3.3.5/css/bootstrap.min.css');
  wp_enqueue_script('angular-core', get_template_directory_uri() . '/node_modules/angular/angular.min.js', array('jquery'), false, true);
  wp_enqueue_script('angular-resource', get_template_directory_uri() . '/node_modules/angular-resource/angular-resource.min.js', array('angular-core'), false, true);
  wp_enqueue_script('ui-router', get_template_directory_uri() . '/node_modules/angular-ui-router/release/angular-ui-router.min.js', array('angular-core'), false, true);
  wp_enqueue_script('main-script', get_template_directory_uri() . '/dist/js/main.js', array('ui-router'), false, true);
  wp_localize_script('main-script', 'constants', array(
      'api-url' => rest_get_url_prefix() . '/wp/v2/',
      'template-directory' => get_template_directory_uri() . '/'
    )
  );
}

function reviews_cpt() {
  $args = array(
    'labels'  => array(
      'name' => 'Reviews',
      'singular_name' => 'Review'
    ),
    'public' => true
  );

  register_post_type('reviews', $args);
}

add_action('init', 'reviews_cpt');
add_action('wp_enqueue_scripts', 'enqueue_scripts');

?>