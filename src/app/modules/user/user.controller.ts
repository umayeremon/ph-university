import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

// create a student
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createStudentIntoDb(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});
// create a faculty
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createFacultyIntoDb(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created successfully",
    data: result,
  });
});
// create a admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;
  // const zValidationData = zStudent.parse(student);
  const result = await userServices.createAdminIntoDb(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
