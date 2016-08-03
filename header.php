<!DOCTYPE html>
<html ng-app="app">
<head>
  <base href="<?= get_site_url() ?>/">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title><?php bloginfo('name'); ?></title>

  <?php wp_head(); ?>

  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<body>

<header class="container branding">
  <div class="row">
    <logo class="col-xs-12 col-md-7"></logo>
    <div class="site-description hidden-sm-down col-md-5">
      <h3>Hot Wings, Beer, and Arizona Food Culture</h3>
      <p>A Phoenix hot wing and beer review site with a sense of humor. The WDIET boys aren't afriad of a dive, and aren't scared of a little heat.</p>
    </div>
  </div>
</header>

<nav>
  <a ui-sref="about">About</a>
</nav>

<main class="container">
