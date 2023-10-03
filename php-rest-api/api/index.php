<?php
require "../start.php";
use Src\User;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
$state = 0;
$edit = 0;
$delete = 0;


// endpoints starting with `/user` or `/users` for GET shows all users
// everything else results in a 404 Not Found


if ($uri[4] !== 'user') {
  if ($uri[4] == 'states') {
    $state = 1;
  }elseif($uri[4] == 'useredit'){
    $edit = 1;
  }elseif($uri[4] == 'delete'){
    $delete = 1;
  }elseif($uri[4] !== 'users'){
    header("HTTP/1.1 404 Not Found");
    exit();
  }
}



// endpoints starting with `/users` for POST/PUT/DELETE results in a 404 Not Found
if ($uri[4] == 'users' and isset($uri[5])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number
$userId = null;
if (isset($uri[5])) {
    $userId = (int) $uri[5];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// pass the request method and post ID to the Post and process the HTTP request:
$controller = new User($dbConnection, $requestMethod, $userId, $state,$edit,$delete);
$controller->processRequest();