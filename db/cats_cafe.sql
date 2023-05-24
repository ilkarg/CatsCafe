CREATE TABLE IF NOT EXISTS `orders` (
    id INTEGER PRIMARY KEY,
    name TEXT,
    phone TEXT,
    fare TEXT,
    date TEXT,
    time TEXT
);

CREATE TABLE IF NOT EXISTS `users` (
    id INTEGER PRIMARY KEY,
    login TEXT,
    password TEXT
);