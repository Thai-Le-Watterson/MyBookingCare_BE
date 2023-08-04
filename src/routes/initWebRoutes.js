import express from "express";
import * as homeController from "../controllers/homeController";
import * as userController from "../controllers/userController";
import * as doctorController from "../controllers/doctorController";
import * as markdownController from "../controllers/markdownController";
import * as patientController from "../controllers/patientController";

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
    route.get("/api/detail-doctor?:id", doctorController.getDoctorDetail);

    route.post("/api/create-doctor-infor", doctorController.createDoctorInfor);
    route.put("/api/update-doctor-infor", doctorController.updateDoctorInfor);

    route.get("/api/get-allcode", userController.getAllCode);

    route.post("/api/create-markdown", markdownController.createMarkdown);
    route.put("/api/update-markdown", markdownController.updateMarkdown);

    route.get("/api/get-schedule", doctorController.getSchedule);
    route.post(
        "/api/bulk-create-schedule",
        doctorController.bulkCreateSchedule
    );

    route.post("/api/create-booking", patientController.createBooking);

    return app.use("/", route);
};

export default initWebRoutes;
