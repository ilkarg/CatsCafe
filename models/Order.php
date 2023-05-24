<?php

class Order extends Model {
	public string $name;
    public string $phone;
    public string $fare;
    public string $date;
    public string $time;

    public function __construct(string $name, string $phone, string $fare, string $date, string $time) {
        $this->name = $name;
        $this->phone = $phone;
        $this->fare = $fare;
        $this->date = $date;
        $this->time = $time;
    }

    public function getName() : string {
        return $this->name;
    }

    public function getPhone() : string {
        return $this->phone;
    }

    public function getFare() : string {
        return $this->fare;
    }

    public function getDate() : string {
        return $this->date;
    }

    public function getTime() : string {
        return $this->time;
    }
}