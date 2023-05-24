<?php

include __DIR__ . "/../models/Order.php";

class OrderController {
	public static function addOrder() {
        global $router;
        $data = $router->getPostRouteData();
        if ($data != null) {
            $order_model = new Order($data["name"], $data["phone"], $data["fare"], $data["date"], $data["time"]);
            $order = QueryController::addOrderQuery(
                $order_model->name,
                $order_model->phone,
                $order_model->fare,
                $order_model->date,
                $order_model->time
            );
            echo $order;
        } else {
            echo json_encode(array("response" => "Данные не дошли или неверные имена полей"));
        }
    }

    public static function getOrders() {
        $orders = QueryController::getOrdersQuery();
        echo $orders;
    }
}