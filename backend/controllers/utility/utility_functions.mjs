import { getUserModel } from "../../DB/Postgres/Models/Models.mjs";
import BadRequestError from "../../errors/BadError.mjs";

// utility function
const userIDFromUserName = async (username) => {
    if (!username) {
        try {
            throw new BadRequestError("Invalid User");
        }
        catch (err) {
            next(err);
        }
        return;
    }
    const userModel = getUserModel()
    const user = await userModel.findOne({
        where: {
            username: username
        }
    })
    return user.user_id;
}

export { userIDFromUserName };