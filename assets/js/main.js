// Main JavaScript for Dashboard

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    // Get inventory data from localStorage
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    const customers = JSON.parse(localStorage.getItem('customers')) || [];

    // Update total medicines count
    document.getElementById('totalMedicines').textContent = inventory.length;

    // Count low stock items (quantity less than 10)
    const lowStockCount = inventory.filter(item => item.quantity < 10).length;
    document.getElementById('lowStock').textContent = lowStockCount;

    // Calculate today's sales
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => {
        const saleDate = new Date(sale.date).toDateString();
        return saleDate === today;
    });

    const totalSalesToday = todaySales.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
    document.getElementById('todaySales').textContent = '$' + totalSalesToday.toFixed(2);

    // Update total customers
    document.getElementById('totalCustomers').textContent = customers.length;

    // Update activity list
    updateActivityList(sales);
}

function updateActivityList(sales) {
    const activityList = document.getElementById('activityList');

    if (sales.length === 0) {
        activityList.innerHTML = '<li>System initialized - Ready to start managing inventory</li>';
        return;
    }

    // Show last 5 activities
    const recentSales = sales.slice(-5).reverse();
    activityList.innerHTML = '';

    recentSales.forEach(sale => {
        const li = document.createElement('li');
        const date = new Date(sale.date);
        li.textContent = `${date.toLocaleString()} - Sale: ${sale.medicine} to ${sale.customer} - $${sale.amount}`;
        activityList.appendChild(li);
    });
}

// Initialize sample data if none exists
function initializeSampleData() {
    if (!localStorage.getItem('inventory')) {
        const sampleInventory = [
            {
                id: 1,
                name: 'Paracetamol 500mg',
                category: 'painkiller',
                quantity: 150,
                price: 5.99,
                expiry: '2025-06-15'
            },
            {
                id: 2,
                name: 'Amoxicillin 250mg',
                category: 'antibiotic',
                quantity: 80,
                price: 12.50,
                expiry: '2025-08-20'
            },
            {
                id: 3,
                name: 'Vitamin C 1000mg',
                category: 'vitamin',
                quantity: 200,
                price: 8.75,
                expiry: '2026-01-10'
            }
        ];
        localStorage.setItem('inventory', JSON.stringify(sampleInventory));
    }

    if (!localStorage.getItem('customers')) {
        const sampleCustomers = [
            {
                id: 1,
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '555-0101',
                address: '123 Main St',
                totalPurchases: 0
            },
            {
                id: 2,
                name: 'Sarah Johnson',
                email: 'sarah.j@email.com',
                phone: '555-0102',
                address: '456 Oak Ave',
                totalPurchases: 0
            }
        ];
        localStorage.setItem('customers', JSON.stringify(sampleCustomers));
    }

    if (!localStorage.getItem('sales')) {
        localStorage.setItem('sales', JSON.stringify([]));
    }
}

// Call this on first load
if (!localStorage.getItem('initialized')) {
    initializeSampleData();
    localStorage.setItem('initialized', 'true');
}
