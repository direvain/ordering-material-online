import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    supplierPhone: {
        type: String,
        required: true
    },
    supplierProvide: {
        type: String,
        required: true
    },
    commercialRegister: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'supplier',
    }
});

const SupplierModel = mongoose.model('suppliers', SupplierSchema);

export default SupplierModel;