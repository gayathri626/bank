let totalDeposited = 0;
let totalWithdrawn = 0;

function addTransaction(type) {
    const transactionList = document.getElementById('transactionList');
    let amount, password, category;

    if (type === 'deposit') {
        amount = parseFloat(document.getElementById('depositAmount').value);
        password = document.getElementById('depositPassword').value;
        category = document.getElementById('depositCategory').value;
    } else if (type === 'withdraw') {
        amount = parseFloat(document.getElementById('withdrawAmount').value);
        password = document.getElementById('withdrawPassword').value;
        category = document.getElementById('withdrawCategory').value;
    }

    const accNo = localStorage.getItem('currentUser');  // Retrieve current logged-in user's account number
    console.log(accNo);

    if (accNo in localStorage) {
        const user = JSON.parse(localStorage.getItem(accNo));  // Retrieve the user object

        // Check if the password matches
        if (user.pwd === password) {
            if (amount && category) {
                if (type === 'deposit') {
                    totalDeposited += amount;
                    document.getElementById('totalDeposited').textContent = totalDeposited;  // Update totalDeposited in the UI

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<span>${type.charAt(0).toUpperCase() + type.slice(1)}</span><span>₹${amount}</span><span>${category}</span>`;
                    transactionList.appendChild(listItem);
                } else if (type === 'withdraw') {
                    const balance = totalDeposited - totalWithdrawn;
                    if (amount <= balance) {
                        totalWithdrawn += amount;
                        document.getElementById('totalWithdrawn').textContent = totalWithdrawn;  // Update totalWithdrawn in the UI

                        const listItem = document.createElement('li');
                        listItem.innerHTML = `<span>${type.charAt(0).toUpperCase() + type.slice(1)}</span><span>₹${amount}</span><span>${category}</span>`;
                        transactionList.appendChild(listItem);
                    } else {
                        alert('Insufficient balance');
                    }
                }

                updateSummary();  // Update the balance summary
                if (type === 'deposit') {
                    document.getElementById('depositAmount').value = "";
                    document.getElementById('depositPassword').value = "";
                    document.getElementById('depositCategory').value = "";
                } else if (type === 'withdraw') {
                    document.getElementById('withdrawAmount').value = "";
                    document.getElementById('withdrawPassword').value = "";
                    document.getElementById('withdrawCategory').value = "";
                }
            } else {
                alert('Please fill in all fields');
            }
        } else {
            alert('Incorrect password');
        }
    } else {
        alert('No user found');
    }
}

function updateSummary() {
    const balance = totalDeposited - totalWithdrawn;

    document.getElementById('totalDeposited').textContent = totalDeposited;  // Ensure you are updating the text, not the element
    document.getElementById('totalWithdrawn').textContent = totalWithdrawn;
    document.getElementById('balance').textContent = balance;  // Update the balance display
}

function logout() {
    window.location = './index.html';
}
