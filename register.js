

function register() {
    const user = {
        name: document.getElementById('uName').value,
        account: document.getElementById('accNo').value,
        pwd: document.getElementById('pwd').value
    };
    
    if (user.name && user.account && user.pwd) {
        localStorage.setItem(user.account, JSON.stringify(user));
        alert("New user created");
        window.location = './login.html';
    } else {
        alert("Some details are missing");
    }
}
