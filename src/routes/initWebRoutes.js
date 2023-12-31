import express from "express";
import * as homeController from "../controllers/homeController";
import * as userController from "../controllers/userController";
import * as doctorController from "../controllers/doctorController";
import * as markdownController from "../controllers/markdownController";
import * as patientController from "../controllers/patientController";
import * as specialtyController from "../controllers/specialtyController";
import * as clinicController from "../controllers/clinicController";
import * as handbookController from "../controllers/handbookController";
import authMiddleware from "../middlewares/authMiddleware";

const route = express.Router();

const initWebRoutes = (app) => {
    route.get("/", homeController.getHomePage);
    route.get("/about", homeController.getAboutPage);
    route.get("/crud", homeController.getCRUD);
    route.get("/list-user", homeController.listUserPage);
    route.post("/crud-post", homeController.postCRUD);
    route.get("/crud-delete/:userId", homeController.deleteCRUD);
    route.get("/update-user/:userId", homeController.updateUserPage);
    route.post("/crud-update/:userId", homeController.updateCRUD);

    route.post("/api/login", userController.handleLoginUser);
    route.get("/api/get-users?:id", userController.getUsers);
    route.post("/api/create-user", userController.createUser);
    route.put("/api/update-user", userController.updateUser);
    route.delete("/api/delete-user", userController.deleteUser);

    route.get("/api/top-doctors", doctorController.getTopDoctors);
    route.get("/api/all-doctors", doctorController.getAllDoctors);
    route.get("/api/detail-doctor?:id", doctorController.getDoctorDetail); // X - O
    route.get(
        "/api/doctors-by-specialty?:id",
        doctorController.getDoctorInforBySpecialty
    ); // X - O
    route.get(
        "/api/doctors-by-clinic?:id",
        doctorController.getDoctorInforByClinic
    ); // X - O

    route.post("/api/create-doctor-infor", doctorController.createDoctorInfor); // X - O
    route.put("/api/update-doctor-infor", doctorController.updateDoctorInfor); // X - O

    route.get("/api/get-allcode", userController.getAllCode);

    route.post("/api/create-markdown", markdownController.createMarkdown);
    route.put("/api/update-markdown", markdownController.updateMarkdown);

    route.get("/api/get-schedule", doctorController.getSchedule);
    route.post(
        "/api/bulk-create-schedule",
        doctorController.bulkCreateSchedule
    );

    route.post("/api/create-booking", patientController.createBooking);
    route.get("/api/verify-schedule", patientController.verifySchedule);

    route.post("/api/create-specialty", specialtyController.createSpecialty);
    route.get("/api/get-specialty?:id", specialtyController.getSpecialty);
    route.get(
        "/api/get-all-specialties",
        specialtyController.getAllSpecialties
    );

    route.get("/api/get-all-clinic", clinicController.getAllClinic);
    route.get("/api/get-clinic", clinicController.getClinic);
    route.post("/api/create-clinic", clinicController.createClinic);
    route.put("/api/update-clinic", clinicController.updateClinic);

    route.get("/api/get-all-booking-doctor", doctorController.getAllBooking);
    route.put("/api/confirm-booking-doctor", doctorController.confirmBooking);

    route.post(
        "/api/create-handbook-category",
        handbookController.createHandbookCategory
    );
    route.post(
        "/api/update-handbook-category",
        handbookController.updateHandbookCategory
    );
    route.get(
        "/api/get-all-handbook-category",
        handbookController.getAllHandbookCategory
    );
    route.get(
        "/api/get-handbook-category",
        handbookController.getHandbookCategory
    );
    route.delete(
        "/api/delete-handbook-category",
        handbookController.deleteHandbookCategory
    );
    route.get("/api/get-all-handbook", handbookController.getAllHandbook);
    route.get(
        "/api/get-all-handbook-by-category",
        handbookController.getAllHandbookByCategory
    );
    route.get(
        "/api/get-all-handbook-by-category-pagination",
        handbookController.getAllHandbookByCategoryPG
    );
    route.get("/api/get-handbook", handbookController.getHandbook);
    route.post("/api/create-handbook", handbookController.createHandbook);

    return app.use("/", route);
};

export default initWebRoutes;
