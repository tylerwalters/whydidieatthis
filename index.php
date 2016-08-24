<?php get_header(); ?>

  <div class="row" ui-view autoscroll='$state.current.name !== "home"'></div>

<?php get_footer(); ?>