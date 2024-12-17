import { Router } from "express";
import { facultyControllers } from "./faculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { zFacultyValidations } from "./faculty.validation";

const router = Router();

// get all faculties
router.get("/", facultyControllers.getAllFaculties);

// get single faculty
router.get("/:id", facultyControllers.getSingleFaculty);

// update single faculty
router.patch(
  "/:id",
  validateRequest(zFacultyValidations.zUpdateFaculty),
  facultyControllers.updateSingleFaculty,
);
// delete single faculty
router.delete("/:id", facultyControllers.deleteSingleFaculty);

export const facultyRouter = router;