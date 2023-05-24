<?php

use PHPTemplater\Template;
use PHPView\View;
use PHPExceptionHandler\ExceptionHandler;

class PageController {
    public static function index() {
        $template = new Template(__DIR__ . "/../pages/index.html");
        echo View::createFromTemplate($template);
    }

    public static function login() {
        $template = new Template(__DIR__ . "/../pages/login.html");
        echo View::createFromTemplate($template);
    }

    public static function registration() {
        $template = new Template(__DIR__ . "/../pages/registration.html");
        echo View::createFromTemplate($template);
    }

    public static function admin() {
        $template = new Template(__DIR__ . "/../pages/admin/index.html");
        echo View::createFromTemplate($template);
    }
}