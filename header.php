<!DOCTYPE html>
<html ng-app="app">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title><?php bloginfo('name'); ?></title>

  <?php wp_head(); ?>

  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<body>

<header class="container">
  <h2><a href="/"><?php echo bloginfo('name'); ?></a></h2>
</header>

<main class="container content">
