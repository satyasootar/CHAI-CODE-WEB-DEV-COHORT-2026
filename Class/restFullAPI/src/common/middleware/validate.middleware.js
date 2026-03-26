import ApiError from "../utils/apiError";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const {errors, value} = DtoClass.validate(req.body);

        if(errors) throw ApiError.badRequest();
        req.body = value;
        next();
    }
}

export default validate;