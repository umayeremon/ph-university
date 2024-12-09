import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.const";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months, required: true },
    endMonth: { type: String, enum: Months, required: true },
  },
  {
    timestamps: true,
  },
);

// duplicate user detect middleware
academicSemesterSchema.pre("save", async function (next) {
  const isAcademicSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    code: this.code,
  });
  if (isAcademicSemesterExists) {
    throw new Error("Academic semester already exist");
  }

  next();
});
export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema,
);