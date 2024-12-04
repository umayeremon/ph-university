/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

import bcrypt from "bcrypt";
import config from "../../config";

// validators.ts
// const capitalizeFirstLetter = {
//   validator: function (value: string) {
//     const firstChar = value.charAt(0).toUpperCase() + value.slice(1);
//     return firstChar === value;
//   },
//   message: "{VALUE} is not capitalized",
// };

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father Contact No is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother name is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother Occupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother Contact No is required"],
    trim: true,
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
  },
  contactNo: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

const studentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [6, "Password must be longer than 6 character"],
      maxlength: [20, "Password can't be more then 20 character"],
    },
    name: { type: userNameSchema, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
      trim: true,
    },
    dateOfBirth: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    contactNo: { type: String, required: true, unique: true, trim: true },
    emergencyContactNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    presentAddress: { type: String, required: true, trim: true },
    permanentAddress: { type: String, required: true, trim: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImage: { type: String, required: true, trim: true },
    isDeleted: { type: Boolean, required: true, trim: true, default: false },
  },
  { timestamps: true },
);

// pre save middleware/ password bcrypt
studentSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware/ empty password
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// pre find middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// pre findOne middleware
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// pre aggregate middleware
studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudent>("Student", studentSchema);
