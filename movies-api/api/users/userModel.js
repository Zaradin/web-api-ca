import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression for password validation
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                    value
                );
            },
            /* eslint-disable */
            message: (props) =>
                `Password must be at least 8 characters long and include at least one letter, one digit, and one special character.`,
        },
    },
});

UserSchema.methods.comparePassword = async function (passw) {
    return await bcrypt.compare(passw, this.password);
};

UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
};

UserSchema.pre("save", async function (next) {
    const saltRounds = 10; // You can adjust the number of salt rounds
    //const user = this;
    if (this.isModified("password") || this.isNew) {
        try {
            const hash = await bcrypt.hash(this.password, saltRounds);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

export default mongoose.model("User", UserSchema);
