import Joi from "joi";

const registrationValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().pattern(/^\d{9}$/).required(),
        password: Joi.string().min(9).max(18).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).required(),
        supplierPhone: Joi.string().pattern(/^\d{10}$/).required(),
        supplierProvide: Joi.string().required(),
        commercialRegister: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.number().required(),
        password: Joi.string().required()
    });
    next();
}

export { registrationValidation, loginValidation };