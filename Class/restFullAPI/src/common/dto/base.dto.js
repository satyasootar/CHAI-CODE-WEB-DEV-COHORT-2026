import Joi from "joi";

class BaseDto {
    static schema = Joi.object({})

    // Very Importtant
    static validate(data){
        const {error, value} = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error){
            const errors = error.details.map((d)=> d.message)
            return {error, value:null}
        }

        return {error:null, value}
    }
}

export default BaseDto