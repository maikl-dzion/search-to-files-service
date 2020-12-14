<?php

set_time_limit(0);

header('Content-Type: text/html; charset=utf-8');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
// header('Access-Control-Allow-Credentials', true);
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers: X-Requested-With, X-HTTP-Method-Override, Origin, Content-Type, Cookie, Accept');

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


//
//
//$urlsToCheck = [
//    '/order/BPQ153',
//    '/order/status/234/test',
//    '/order',
//];
//
//$routes = [
//    '/order/status/:p/:p' => 'getOrderStatus',
//    '/order' => 'getOrder',
//    '/order/{id}' => 'getOrder',
//];
//
//$url = '/order/status/234/err';
//
//
////$regex = str_replace(':p1/:id', '([^\/]+)/([^\/]+)', $uri);
////if (preg_match('@^' . $regex . '$@', $url, $matches)) {
////    echo "Этому  $url соотвествует эта функция $route. <br>";
////    print_r($matches); die;
////}
////
////die;
//
//foreach ($routes as $key => $route) {
//    $arg = ':p';
//    $regex = str_replace($arg, '([^\/]+)', $key);
//    if (preg_match('@^' . $regex . '$@', $url, $matches)) {
//        echo "Этому  $url соотвествует эта функция $route. <br>";
//        print_r($matches);
//    }
//}
//
//function getArgs($uri) {
//    $result = '';
//    $args = explode(':', $uri);
//    if(count($args) > 1) {
//        //  print_r($args);
//        array_shift($args);
//        $result  = ':' . implode(':', $args);
//        // die($result);
//    }
//    return $result;
//}
//
//
//
//
//
//
//die;
//


include_once 'FindServiceController.php';

$manager = new FileManager();
$finder  = new FindController();
$helper  = new Helper();

$routes = [
    '/get/dir/path/server'  => 'FileManager@getServerDirPath',
    '/get/dir/path/system'  => 'FileManager@getSystemDirPath',

    '/scan/dir/server'  => 'FileManager@scanServerDir',
    '/scan/dir/system'  => 'FileManager@scanSystemDir',
    '/scan/dir/child'   => 'FileManager@scanDirInit',
    '/file/content/get' => 'FileManager@loadFileContent',

    '/find/text'        => 'FindController@findInit',

    '/test/service/:param'  => 'FileManager@testAction',
//    '/find/file'        => 'FindController@findInit',
//    '/scan/dir'         => 'getOrder',
//    '/edit/file'        => 'rttt',
//    '/file/content/:arg' => 'rr',
];

$router = new Router($routes, $helper);

$response = array();

try {
    $response = $router->run();
} catch (\Exception $err) {
    $errorMessage = $err->getMessage();
    $response['error'] = $errorMessage;
}

// $response['error'] = 'lkvfgh';

die(json_encode($response, true));


lg([ $response
    //$router
]);


//$url   = '/find/text@example.com. Is it correct?';
//$pattern = '|/find/text@([^\s\.]+\.[a-z]+)|';

$url   = '/find/text';
$pattern = '|/find/text|';
$result = preg_match_all($pattern, $url, $matches);


$url = "/find/text/retet/rty/456";
$pattern = "|/find/text/[a-z]/*|";
if (preg_match($pattern, $url))
    echo "the url $url contains guru OK";
else
   echo "the url $url does not contain guru Not";

lg([
    $result,
    $matches
]);

die;

$pattern = '|^/find/text/[0-9]/[0-9]$|';
$value = '/find/text/33/67';
$r = preg_match($pattern, $value, $matches);

lg([$r, $matches]);

preg_match('/find/text/:type/:id', 'foobarbaz', $matches, PREG_OFFSET_CAPTURE);
print_r($matches);


return array(
    '^/$' => 'controller=site&action=index',
    '^/admin(?:/|)$' => 'module=admin&controller=site&action=index',
    '^/admin/([a-z0-9]{1,15})(?:/|)$' => 'module=admin&controller=$1&action=index',
    '^/admin/([a-z0-9]{1,15})/([0-9]{1,15})(?:/|)$' => 'module=admin&controller=$1&action=view&id=$2',

);


//$router->add('/find/text/:type/:id' , 'MainController@add');
//$router->add('/main/item/get/:id'   , 'MainController@getFindItem');
//$router->add('/main/user/:id/:email', 'MainController@getUser');


$router->run();



$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segments = explode('/', trim($uri, '/'));


lg([
    trim($_SERVER['PATH_INFO'], '/'),
    $router
]);



//$dispatcher = new Dispatcher($manager, $finder, $helper);
//
//$response = $dispatcher->run();
//
//// lg([$response, $response['error']]);
//// lg([$response, $dispatcher]);
//
//die(json_encode($response, true));

// $dirPath   = 'C:\OpenServer\domains\localhost\FindText\test\src';
//$dirPath   = 'C:\OpenServer\domains\localhost';
//$findValue = 'test_id_2345666TYkyi';
//
//die('stop');
//
//scanDirectories($dirPath, $findValue);


//$data = array();
//$input   = (array)json_decode(file_get_contents('php://input'));
//$request = $_REQUEST;
//
//if(!empty($input)) {
//    $data = $input;
//}
//
//if(!empty($request)) {
//    $data = array_merge($data, $request);
//}
//
//$result = ['data' => $data, 'server' => $_SERVER];
//
//// lg($result);
//
//die(json_encode($result, true));

// lg([$input, $_SERVER, $_REQUEST]);

?>

<!--<form action="" method="POST">-->
<!---->
<!---->
<!--    <p><label>Имя</label>-->
<!--       <input type="text" name="p1" value="p1" >-->
<!--    </p>-->
<!---->
<!--    <p> <label>Фамилия</label>-->
<!--        <input type="text" name="p2" value="p2" >-->
<!--    </p>-->
<!---->
<!--    <p><label>Email</label>-->
<!--        <input type="text" name="email" value="email" >-->
<!--    </p>-->
<!---->
<!--    <p><button>Отправить запрос</button></p>-->
<!---->
<!--</form>-->
