import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    companyPhone: {
        type: Number,
        required: true
    },
    EngPhone: {
        type: Number,
        default: null
    },
    commercialRegister: {
        type: Buffer,
        required: true
    },
    role: {
        type: String,
        default: 'company'
    }
});

const CompanyModel = mongoose.model('company', CompanySchema);

export default CompanyModel;