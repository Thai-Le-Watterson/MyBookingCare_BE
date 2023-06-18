import express from "express";
import * as homeController from "../controllers/homeController";
import * as userController from "../controllers/userController";

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

    return app.use("/", route);
};

export default initWebRoutes;
