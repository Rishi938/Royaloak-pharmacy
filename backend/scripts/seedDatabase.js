const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const User = require('../models/User');
const Medicine = require('../models/Medicine');
const Customer = require('../models/Customer');
const Supplier = require('../models/Supplier');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedDatabase = async () => {
    try {
        console.log('🌱 Seeding database...');

        // Clear existing data
        await User.deleteMany({});
        await Medicine.deleteMany({});
        await Customer.deleteMany({});
        await Supplier.deleteMany({});

        // Create Users
        const users = await User.create([
            {
                username: 'admin',
                email: 'admin@royaloak.com',
                password: 'admin123',
                fullName: 'Admin User',
                role: 'admin',
                phone: '555-0001'
            },
            {
                username: 'pharmacist',
                email: 'pharmacist@royaloak.com',
                password: 'pharma123',
                fullName: 'John Pharmacist',
                role: 'pharmacist',
                phone: '555-0002'
            },
            {
                username: 'cashier',
                email: 'cashier@royaloak.com',
                password: 'cash123',
                fullName: 'Jane Cashier',
                role: 'cashier',
                phone: '555-0003'
            }
        ]);
        console.log('✅ Users created');

        // Create Suppliers
        const suppliers = await Supplier.create([
            {
                name: 'MedSupply Inc',
                companyName: 'MedSupply Incorporated',
                email: 'contact@medsupply.com',
                phone: '555-1000',
                address: { street: '123 Medical Ave', city: 'New York', state: 'NY', zipCode: '10001' },
                paymentTerms: 'net_30'
            },
            {
                name: 'Pharma Distributors',
                companyName: 'Pharma Distributors LLC',
                email: 'sales@pharmadist.com',
                phone: '555-2000',
                address: { street: '456 Healthcare Blvd', city: 'Los Angeles', state: 'CA', zipCode: '90001' },
                paymentTerms: 'net_15'
            }
        ]);
        console.log('✅ Suppliers created');

        // Create Medicines
        const medicines = await Medicine.create([
            {
                name: 'Paracetamol 500mg',
                genericName: 'Acetaminophen',
                category: 'painkiller',
                manufacturer: 'PharmaCorp',
                supplier: suppliers[0]._id,
                description: 'Pain reliever and fever reducer',
                batchNumber: 'PARA2024001',
                quantity: 500,
                reorderLevel: 50,
                unitPrice: 0.50,
                sellingPrice: 1.00,
                expiryDate: new Date('2025-12-31'),
                dosage: '500mg',
                unit: 'tablet',
                barcode: 'PARA500MG001'
            },
            {
                name: 'Amoxicillin 250mg',
                genericName: 'Amoxicillin',
                category: 'antibiotic',
                manufacturer: 'AntibioTech',
                supplier: suppliers[0]._id,
                description: 'Antibiotic for bacterial infections',
                batchNumber: 'AMOX2024001',
                quantity: 300,
                reorderLevel: 30,
                unitPrice: 2.00,
                sellingPrice: 4.00,
                expiryDate: new Date('2025-10-15'),
                dosage: '250mg',
                unit: 'capsule',
                prescriptionRequired: true,
                barcode: 'AMOX250MG001'
            },
            {
                name: 'Vitamin C 1000mg',
                genericName: 'Ascorbic Acid',
                category: 'vitamin',
                manufacturer: 'VitaLife',
                supplier: suppliers[1]._id,
                description: 'Immune system support',
                batchNumber: 'VITC2024001',
                quantity: 800,
                reorderLevel: 100,
                unitPrice: 0.30,
                sellingPrice: 0.75,
                expiryDate: new Date('2026-06-30'),
                dosage: '1000mg',
                unit: 'tablet',
                barcode: 'VITC1000MG001'
            },
            {
                name: 'Ibuprofen 400mg',
                genericName: 'Ibuprofen',
                category: 'painkiller',
                manufacturer: 'PainRelief Co',
                supplier: suppliers[0]._id,
                description: 'Anti-inflammatory and pain relief',
                batchNumber: 'IBU2024001',
                quantity: 400,
                reorderLevel: 40,
                unitPrice: 1.00,
                sellingPrice: 2.50,
                expiryDate: new Date('2025-09-20'),
                dosage: '400mg',
                unit: 'tablet',
                barcode: 'IBU400MG001'
            },
            {
                name: 'Cough Syrup',
                genericName: 'Dextromethorphan',
                category: 'other',
                manufacturer: 'ColdCare',
                supplier: suppliers[1]._id,
                description: 'Cough suppressant',
                batchNumber: 'COUGH2024001',
                quantity: 150,
                reorderLevel: 20,
                unitPrice: 5.00,
                sellingPrice: 10.00,
                expiryDate: new Date('2025-08-10'),
                dosage: '100ml',
                unit: 'syrup',
                barcode: 'COUGH100ML001'
            },
            {
                name: 'Aspirin 75mg',
                genericName: 'Acetylsalicylic Acid',
                category: 'painkiller',
                manufacturer: 'CardioHealth',
                supplier: suppliers[0]._id,
                description: 'Low-dose aspirin for heart health',
                batchNumber: 'ASP2024001',
                quantity: 8,
                reorderLevel: 30,
                unitPrice: 0.25,
                sellingPrice: 0.60,
                expiryDate: new Date('2025-11-30'),
                dosage: '75mg',
                unit: 'tablet',
                barcode: 'ASP75MG001'
            }
        ]);
        console.log('✅ Medicines created');

        // Create Customers
        const customers = await Customer.create([
            {
                name: 'Robert Johnson',
                email: 'robert.j@email.com',
                phone: '555-3001',
                address: { street: '789 Main St', city: 'Oakland', state: 'CA', zipCode: '94601' },
                dateOfBirth: new Date('1980-05-15'),
                gender: 'male'
            },
            {
                name: 'Sarah Williams',
                email: 'sarah.w@email.com',
                phone: '555-3002',
                address: { street: '321 Oak Ave', city: 'Oakland', state: 'CA', zipCode: '94602' },
                dateOfBirth: new Date('1990-08-22'),
                gender: 'female'
            },
            {
                name: 'Michael Brown',
                email: 'michael.b@email.com',
                phone: '555-3003',
                address: { street: '456 Elm St', city: 'Oakland', state: 'CA', zipCode: '94603' },
                dateOfBirth: new Date('1975-03-10'),
                gender: 'male'
            }
        ]);
        console.log('✅ Customers created');

        console.log('🎉 Database seeded successfully!');
        console.log('\n📋 Demo Accounts:');
        console.log('Admin: admin / admin123');
        console.log('Pharmacist: pharmacist / pharma123');
        console.log('Cashier: cashier / cash123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
