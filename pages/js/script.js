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
            location.reload();
        });
    });
}

function isAdmin() {
    fetch(`${window.location.origin}/api/v1/isAdmin`, {
        method: 'POST'
    }).then(function (response) {
        return response.json().then(function (resp) {
            if (resp["response"] === "admin") {
                document.querySelector("#createPostButton").style.display = "inline-block";
            }
        });
    });
}

function isAuthorized() {
    fetch(`${window.location.origin}/api/v1/isAuthorized`, {
        method: 'POST'
    }).then(function (response) {
        return response.json().then(function (resp) {
            let button = document.querySelector("#authButton");
            if (resp["response"]) {
                button.innerHTML = "<button onclick='logout()'>Выйти</button>";
            } else {
                button.innerHTML = "Войти";
                button.href = "/login";
            }
        })
    });
}