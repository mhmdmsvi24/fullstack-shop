import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// name, email, phone, password, password Confirm
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      validate: {
        validator: (v) => validator.isAlphanumeric(v),
        message: "Invalid Name, Only letters and numbers are allowed",
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid Email Address"],
    },
    phone: {
      type: String,
      validate: [
        (v) => validator.isMobilePhone(v, ["ir-IR"]),
        "Invalid Phone Number",
      ],
      required: true,
    },
    password: {
      type: String,
      validate: [validator.isStrongPassword, "Password is weak"],
      required: true,
      select: false,
    },
    passwordConf: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v === this.password;
        },
        message: "Passwords are not identical",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

UserSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// only runs if password is modified
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.passwordConf = undefined;
  next();
});

UserSchema.methods.changedPasswordAfterJWT = function (timestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // if the password is changed after the token is issued then this means the password is changed
    return timestamp < changedTimestamp;
  }

  return false;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
