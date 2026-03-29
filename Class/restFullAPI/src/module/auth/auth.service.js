import ApiError from "../../common/utils/apiError";
import { generateResetToken } from "../../common/utils/jwt";
import user from "./auth.model";

const register = async({name, email, password, role}) => {
    const existing = await user.findOne({email})
    if(existing) throw ApiError.conflict("Email already exists")

    const {rawToken, hashedToken} = generateResetToken()

    const newUser = await user.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    const userObj = newUser.toObject();
    delete userObj.password 
    delete userObj.verificationToken 

    // TODO: send an email to user with token: rawToken

    return userObj
}

const login = async ({email, password}) => {
    const existingUser = await user.findOne({email}).select("+password")
    if (!existingUser) throw ApiError.Unauthorised("Invalid email or password")
}
