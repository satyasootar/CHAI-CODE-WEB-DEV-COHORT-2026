import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
    static schema = Joi.object({
        name: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().trim().lowercase().required(),
        password: Joi.string().trim().min(8).required().message("Password must contain 8 chars minimum"),
        role: Joi.string().valid("customer", "seller", "admin").default("customer")
    })
}

export default RegisterDto