// Reports JavaScript

let inventory = [];
let sales = [];

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    displayDefaultStats();
});

function loadData() {
    inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    sales = JSON.parse(localStorage.getItem('sales')) || [];
}

function displayDefaultStats() {
    // Calculate total inventory value
    const totalValue = inventory.reduce((sum, item) => {
        return sum + (item.quantity * item.price);
    }, 0);
    document.getElementById('totalInventoryValue').textContent = '$' + totalValue.toFixed(2);

    // Count low stock items
    const lowStockItems = inventory.filter(item => item.quantity < 10).length;
    document.getElementById('lowStockCount').textContent = lowStockItems;

    // Count items expiring in 30 days
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

    const expiringSoon = inventory.filter(item => {
        const expiryDate = new Date(item.expiry);
        return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
    }).length;

    document.getElementById('expiringSoonCount').textContent = expiringSoon;
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const reportDetails = document.getElementById('reportDetails');

    if (reportType === 'inventory') {
        generateInventoryReport(reportDetails);
    } else if (reportType === 'sales') {
        generateSalesReport(reportDetails, startDate, endDate);
    } else if (reportType === 'expiry') {
        generateExpiryReport(reportDetails);
    }
}

function generateInventoryReport(container) {
    container.innerHTML = '<h4>Inventory Status Report</h4>';

    if (inventory.length === 0) {
        container.innerHTML += '<p>No inventory data available.</p>';
        return;
    }

    let reportHTML = '<table class="inventory-table" style="margin-top: 1rem;"><thead><tr><th>Medicine</th><th>Category</th><th>Quantity</th><th>Value</th><th>Status</th></tr></thead><tbody>';

    inventory.forEach(item => {
        const value = item.quantity * item.price;
        let status = 'Good Stock';

        if (item.quantity < 5) {
            status = 'Critical';
        } else if (item.quantity < 10) {
            status = 'Low Stock';
        }

        reportHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.quantity}</td>
                <td>$${value.toFixed(2)}</td>
                <td>${status}</td>
            </tr>
        `;
    });

    reportHTML += '</tbody></table>';
    container.innerHTML += reportHTML;
}

function generateSalesReport(container, startDate, endDate) {
    container.innerHTML = '<h4>Sales Report</h4>';

    if (sales.length === 0) {
        container.innerHTML += '<p>No sales data available.</p>';
        return;
    }

    let filteredSales = sales;

    // Filter by date if provided
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        filteredSales = sales.filter(sale => {
            const saleDate = new Date(sale.date);
            return saleDate >= start && saleDate <= end;
        });
    }

    const totalRevenue = filteredSales.reduce((sum, sale) => sum + parseFloat(sale.amount), 0);
    const totalTransactions = filteredSales.length;

    container.innerHTML += `
        <div style="margin: 1rem 0;">
            <p><strong>Total Revenue:</strong> $${totalRevenue.toFixed(2)}</p>
            <p><strong>Total Transactions:</strong> ${totalTransactions}</p>
            <p><strong>Average Transaction:</strong> $${(totalRevenue / totalTransactions || 0).toFixed(2)}</p>
        </div>
    `;

    let reportHTML = '<table class="sales-table" style="margin-top: 1rem;"><thead><tr><th>Date</th><th>Customer</th><th>Medicine</th><th>Quantity</th><th>Amount</th></tr></thead><tbody>';

    filteredSales.slice(-10).reverse().forEach(sale => {
        const date = new Date(sale.date);
        reportHTML += `
            <tr>
                <td>${date.toLocaleDateString()}</td>
                <td>${sale.customer}</td>
                <td>${sale.medicine}</td>
                <td>${sale.quantity}</td>
                <td>$${parseFloat(sale.amount).toFixed(2)}</td>
            </tr>
        `;
    });

    reportHTML += '</tbody></table>';
    container.innerHTML += reportHTML;
}

function generateExpiryReport(container) {
    container.innerHTML = '<h4>Medicine Expiry Report</h4>';

    if (inventory.length === 0) {
        container.innerHTML += '<p>No inventory data available.</p>';
        return;
    }

    const today = new Date();
    const thirtyDays = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    const sixtyDays = new Date(today.getTime() + (60 * 24 * 60 * 60 * 1000));

    // Categorize medicines by expiry
    const expired = inventory.filter(item => new Date(item.expiry) < today);
    const expiringSoon = inventory.filter(item => {
        const exp = new Date(item.expiry);
        return exp >= today && exp <= thirtyDays;
    });
    const expiringNext60 = inventory.filter(item => {
        const exp = new Date(item.expiry);
        return exp > thirtyDays && exp <= sixtyDays;
    });

    container.innerHTML += `
        <div style="margin: 1rem 0;">
            <p><strong>Expired:</strong> ${expired.length} items</p>
            <p><strong>Expiring in 30 days:</strong> ${expiringSoon.length} items</p>
            <p><strong>Expiring in 60 days:</strong> ${expiringNext60.length} items</p>
        </div>
    `;

    if (expiringSoon.length > 0) {
        let reportHTML = '<h5>Medicines Expiring Soon (30 days)</h5><table class="inventory-table" style="margin-top: 1rem;"><thead><tr><th>Medicine</th><th>Quantity</th><th>Expiry Date</th></tr></thead><tbody>';

        expiringSoon.forEach(item => {
            reportHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.expiry}</td>
                </tr>
            `;
        });

        reportHTML += '</tbody></table>';
        container.innerHTML += reportHTML;
    }
}
