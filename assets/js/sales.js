// Sales Management JavaScript

let sales = [];
let inventory = [];

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    displaySales();
    loadMedicineOptions();
    updateSalesSummary();
});

function loadData() {
    sales = JSON.parse(localStorage.getItem('sales')) || [];
    inventory = JSON.parse(localStorage.getItem('inventory')) || [];
}

function saveSales() {
    localStorage.setItem('sales', JSON.stringify(sales));
}

function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function loadMedicineOptions() {
    const select = document.getElementById('medicineSelect');
    select.innerHTML = '<option value="">Select Medicine</option>';

    inventory.forEach(item => {
        if (item.quantity > 0) {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = `${item.name} (Available: ${item.quantity}) - $${item.price}`;
            select.appendChild(option);
        }
    });
}

function showNewSaleForm() {
    document.getElementById('newSaleForm').style.display = 'block';
}

function hideNewSaleForm() {
    document.getElementById('newSaleForm').style.display = 'none';
    document.getElementById('customerName').value = '';
    document.getElementById('medicineSelect').value = '';
    document.getElementById('saleQuantity').value = '';
}

function createSale(event) {
    event.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const medicineId = parseInt(document.getElementById('medicineSelect').value);
    const quantity = parseInt(document.getElementById('saleQuantity').value);

    const medicine = inventory.find(item => item.id === medicineId);

    if (!medicine) {
        alert('Please select a valid medicine');
        return;
    }

    if (quantity > medicine.quantity) {
        alert(`Not enough stock! Only ${medicine.quantity} available.`);
        return;
    }

    // Calculate total amount
    const amount = quantity * medicine.price;

    // Create sale record
    const newSale = {
        id: Date.now(),
        date: new Date().toISOString(),
        customer: customerName,
        medicine: medicine.name,
        quantity: quantity,
        amount: amount.toFixed(2)
    };

    // Update inventory
    medicine.quantity -= quantity;

    // Save data
    sales.push(newSale);
    saveSales();
    saveInventory();

    // Update display
    displaySales();
    loadMedicineOptions();
    updateSalesSummary();
    hideNewSaleForm();

    alert('Sale completed successfully!');
}

function displaySales() {
    const tableBody = document.getElementById('salesTableBody');
    tableBody.innerHTML = '';

    if (sales.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No sales recorded yet. Create your first sale!</td></tr>';
        return;
    }

    // Show most recent sales first
    const recentSales = [...sales].reverse().slice(0, 20);

    recentSales.forEach(sale => {
        const row = document.createElement('tr');
        const date = new Date(sale.date);

        row.innerHTML = `
            <td>${date.toLocaleString()}</td>
            <td>${sale.customer}</td>
            <td>${sale.medicine}</td>
            <td>${sale.quantity}</td>
            <td>$${parseFloat(sale.amount).toFixed(2)}</td>
        `;

        tableBody.appendChild(row);
    });
}

function updateSalesSummary() {
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => {
        const saleDate = new Date(sale.date).toDateString();
        return saleDate === today;
    });

    const totalAmount = todaySales.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
    const transactionCount = todaySales.length;

    document.getElementById('totalSalesToday').textContent = '$' + totalAmount.toFixed(2);
    document.getElementById('transactionsToday').textContent = transactionCount;
}
