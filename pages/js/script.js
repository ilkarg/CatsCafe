function registration() {
    fetch(`${window.location.origin}/api/v1/registration`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: document.querySelector("#login").value,
            password: document.querySelector("#password").value,
            repeatPassword: document.querySelector("#repeatPassword").value
        })
    }).then(function (response) {
        return response.json().then(function (resp) {
            setTimeout(function (resp) {
                if (resp["response"] === "OK") {
                    window.location = "/";
                } else {
                    if (resp["response"] === "User already exists") {
                        resp["response"] = "Пользователь уже существует";
                    }
                    alert(resp["response"]);
                }
            }, 10, resp);
        });
    });
}

function login() {
    fetch(`${window.location.origin}/api/v1/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: document.querySelector("#login").value,
            password: document.querySelector("#password").value
        })
    }).then(function (response) {
        return response.json().then(function (resp) {
            setTimeout(function (resp) {
                if (resp["response"] === "Password and repeat password do not match") {
                    resp["response"] = "Пароль и повтор пароля не совпадают";
                }
                if (resp["response"] === "Вы успешно вошли в аккаунт") {
                    window.location = "/";
                } else {
                    alert(resp["response"]);
                }
            }, 10, resp);
        });
    });
}

function logout() {
    fetch(`${window.location.origin}/api/v1/logout`, {
        method: 'POST'
    }).then(function (response) {
        return response.json().then(function (resp) {
            if (!isAdminPanel()) {
                location.reload();
            } else {
                window.location = '/';
            }
        });
    });
}

function isAdminPanel() {
    return window.location.pathname.startsWith("/admin");
}

function isAuthorized() {
    fetch(`${window.location.origin}/api/v1/isAuthorized`, {
        method: 'POST'
    }).then(function (response) {
        return response.json().then(function (resp) {
            if (!isAdminPanel()) {
                let button = document.querySelector("#authButton");
                if (resp["response"]) {
                    button.innerHTML = "<button onclick='logout()'>Выйти</button>";
                } else {
                    button.innerHTML = "Войти";
                    button.href = "/login";
                }
            } else {
                if (!resp["response"]) {
                    window.location = '/';
                }
            }
        })
    });
}

function addOrder() {
    fetch(`${window.location.origin}/api/v1/addOrder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.querySelector("#orderName").value,
            phone: document.querySelector("#orderPhone").value,
            fare: document.querySelector("#orderFare").value,
            date: document.querySelector("#orderDate").value,
            time: document.querySelector("#orderTime").value
        })
    }).then(function(response) {
        return response.json().then(function(resp) {
            alert(resp["response"]);
            if (resp["response"] === "Бронь успешно создана") {
                location.reload();
            }
        });
    });
}

function getOrders() {
    fetch(`${window.location.origin}/api/v1/getOrders`, {
        method: "POST"
    }).then(function(response) {
        return response.json().then(function(resp) {
            if (!resp["response"] && Object.keys(resp).length > 0) {
                Object.keys(resp).map(function(key) {
                    createOrder(resp[key].name, resp[key].phone, resp[key].fare, resp[key].date, resp[key].time);
                });
            }
        });
    });
}

function createOrder(name, phone, fare, date, time) {
    let order = document.createElement("div");
    order.classList.add("col-lg-6", "col-md-12");

    let adminBlockDiv = document.createElement("div");
    adminBlockDiv.classList.add("admin-booking-block");

    let fioDiv = document.createElement("div");
    fioDiv.classList.add("booking-block", "d-flex", "align-items-center");
    let accountImgDiv = document.createElement("div");
    accountImgDiv.classList.add("img-booking");
    let accountImg = document.createElement("img");
    accountImg.src = "/pages/img/account.svg";
    accountImg.alt = "";
    accountImgDiv.appendChild(accountImg);
    let fioHeader = document.createElement("h1");
    fioHeader.innerText = "ФИО:";
    let fioP = document.createElement("p");
    fioP.innerText = name;

    fioDiv.appendChild(accountImgDiv);
    fioDiv.appendChild(fioHeader);
    fioDiv.appendChild(fioP);

    let phoneDiv = document.createElement("div");
    phoneDiv.classList.add("booking-block", "d-flex", "align-items-center");
    let phoneImgDiv = document.createElement("div");
    phoneImgDiv.classList.add("img-booking");
    let phoneImg = document.createElement("img");
    phoneImg.src = "/pages/img/phone_contact.svg";
    phoneImg.alt = "";
    phoneImgDiv.appendChild(phoneImg);
    let phoneHeader = document.createElement("h1");
    phoneHeader.innerText = "Номер телефона:";
    let phoneP = document.createElement("p");
    phoneP.innerText = phone;

    phoneDiv.appendChild(phoneImgDiv);
    phoneDiv.appendChild(phoneHeader);
    phoneDiv.appendChild(phoneP);

    let fareDiv = document.createElement("div");
    fareDiv.classList.add("booking-block", "d-flex", "align-items-center");
    let fareImgDiv = document.createElement("div");
    fareImgDiv.classList.add("img-booking");
    let fareImg = document.createElement("img");
    fareImg.src = "/pages/img/rate.svg";
    fareImg.alt = "";
    fareImgDiv.appendChild(fareImg);
    let fareHeader = document.createElement("h1");
    fareHeader.innerText = "Тариф:";
    let fareP = document.createElement("p");
    fareP.classList.add("d-flex", "align-items-bottom");
    fareP.innerText = fare;

    fareDiv.appendChild(fareImgDiv);
    fareDiv.appendChild(fareHeader);
    fareDiv.appendChild(fareP);

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("booking-block", "d-flex", "align-items-center");
    let dateImgDiv = document.createElement("div");
    dateImgDiv.classList.add("img-booking");
    let dateImg = document.createElement("img");
    dateImg.src = "/pages/img/calendar.svg";
    dateImg.alt = "";
    dateImgDiv.appendChild(dateImg);
    let dateHeader = document.createElement("h1");
    dateHeader.innerText = "Дата:";
    let dateP = document.createElement("p");
    dateP.classList.add("d-flex", "align-items-bottom");
    dateP.innerText = date;

    dateDiv.appendChild(dateImgDiv);
    dateDiv.appendChild(dateHeader);
    dateDiv.appendChild(dateP);

    let timeDiv = document.createElement("div");
    timeDiv.classList.add("booking-block", "d-flex", "align-items-center");
    let timeImgDiv = document.createElement("div");
    timeImgDiv.classList.add("img-booking");
    let timeImg = document.createElement("img");
    timeImg.src = "/pages/img/calendar.svg";
    timeImg.alt = "";
    timeImgDiv.appendChild(timeImg);
    let timeHeader = document.createElement("h1");
    timeHeader.innerText = "Время:";
    let timeP = document.createElement("p");
    timeP.classList.add("d-flex", "align-items-bottom");
    timeP.innerText = time;

    timeDiv.appendChild(timeImgDiv);
    timeDiv.appendChild(timeHeader);
    timeDiv.appendChild(timeP);

    adminBlockDiv.appendChild(fioDiv);
    adminBlockDiv.appendChild(phoneDiv);
    adminBlockDiv.appendChild(fareDiv);
    adminBlockDiv.appendChild(dateDiv);
    adminBlockDiv.appendChild(timeDiv);

    order.appendChild(adminBlockDiv);
    document.querySelector("#orders").appendChild(order);
}