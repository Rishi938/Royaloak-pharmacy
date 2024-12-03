// Customer Management JavaScript

let customers = [];

document.addEventListener('DOMContentLoaded', function() {
    loadCustomers();
    displayCustomers();
});

function loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
    }
}

function saveCustomers() {
    localStorage.setItem('customers', JSON.stringify(customers));
}

function displayCustomers(items = customers) {
    const tableBody = document.getElementById('customersTableBody');
    tableBody.innerHTML = '';

    if (items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No customers registered yet. Add your first customer!</td></tr>';
        return;
    }

    items.forEach(customer => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>$${customer.totalPurchases.toFixed(2)}</td>
            <td>
                <button class="btn-edit" onclick="editCustomer(${customer.id})">Edit</button>
                <button class="btn-danger" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function showAddCustomerForm() {
    document.getElementById('addCustomerForm').style.display = 'block';
}

function hideAddCustomerForm() {
    document.getElementById('addCustomerForm').style.display = 'none';
    document.getElementById('custName').value = '';
    document.getElementById('custEmail').value = '';
    document.getElementById('custPhone').value = '';
    document.getElementById('custAddress').value = '';
}

function addCustomer(event) {
    event.preventDefault();

    const name = document.getElementById('custName').value;
    const email = document.getElementById('custEmail').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;

    const newCustomer = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        address: address,
        totalPurchases: 0
    };

    customers.push(newCustomer);
    saveCustomers();
    displayCustomers();
    hideAddCustomerForm();

    alert('Customer added successfully!');
}

function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;

    const newPhone = prompt('Enter new phone number:', customer.phone);
    if (newPhone !== null && newPhone.trim() !== '') {
        customer.phone = newPhone.trim();
        saveCustomers();
        displayCustomers();
        alert('Customer updated successfully!');
    }
}

function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        saveCustomers();
        displayCustomers();
        alert('Customer deleted successfully!');
    }
}

function searchCustomers() {
    const searchTerm = document.getElementById('searchCustomer').value.toLowerCase();
    const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.includes(searchTerm)
    );
    displayCustomers(filtered);
}
