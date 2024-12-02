// Inventory Management JavaScript

let inventory = [];

// Load inventory data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadInventory();
    displayInventory();
});

function loadInventory() {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
        inventory = JSON.parse(storedInventory);
    }
}

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function displayInventory(items = inventory) {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';

    if (items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No medicines in inventory. Add some to get started!</td></tr>';
        return;
    }

    items.forEach(item => {
        const row = document.createElement('tr');

        // Determine status based on quantity
        let status = 'In Stock';
        let statusClass = 'status-good';

        if (item.quantity < 5) {
            status = 'Critical';
            statusClass = 'status-critical';
        } else if (item.quantity < 10) {
            status = 'Low Stock';
            statusClass = 'status-low';
        }

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td>${item.expiry}</td>
            <td class="${statusClass}">${status}</td>
            <td>
                <button class="btn-edit" onclick="editMedicine(${item.id})">Edit</button>
                <button class="btn-danger" onclick="deleteMedicine(${item.id})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function showAddMedicineForm() {
    document.getElementById('addMedicineForm').style.display = 'block';
}

function hideAddMedicineForm() {
    document.getElementById('addMedicineForm').style.display = 'none';
    document.getElementById('medicineName').value = '';
    document.getElementById('medicineCategory').value = '';
    document.getElementById('medicineQuantity').value = '';
    document.getElementById('medicinePrice').value = '';
    document.getElementById('medicineExpiry').value = '';
}

function addMedicine(event) {
    event.preventDefault();

    const name = document.getElementById('medicineName').value;
    const category = document.getElementById('medicineCategory').value;
    const quantity = parseInt(document.getElementById('medicineQuantity').value);
    const price = parseFloat(document.getElementById('medicinePrice').value);
    const expiry = document.getElementById('medicineExpiry').value;

    const newMedicine = {
        id: Date.now(), // Simple ID generation
        name: name,
        category: category,
        quantity: quantity,
        price: price,
        expiry: expiry
    };

    inventory.push(newMedicine);
    saveInventory();
    displayInventory();
    hideAddMedicineForm();

    alert('Medicine added successfully!');
}

function editMedicine(id) {
    const medicine = inventory.find(item => item.id === id);
    if (!medicine) return;

    const newQuantity = prompt('Enter new quantity:', medicine.quantity);
    if (newQuantity !== null) {
        medicine.quantity = parseInt(newQuantity);
        saveInventory();
        displayInventory();
        alert('Medicine updated successfully!');
    }
}

function deleteMedicine(id) {
    if (confirm('Are you sure you want to delete this medicine?')) {
        inventory = inventory.filter(item => item.id !== id);
        saveInventory();
        displayInventory();
        alert('Medicine deleted successfully!');
    }
}

function searchMedicines() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    displayInventory(filtered);
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;

    if (category === 'all') {
        displayInventory();
    } else {
        const filtered = inventory.filter(item => item.category === category);
        displayInventory(filtered);
    }
}
