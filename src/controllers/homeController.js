import db from "../models";
import * as CrudService from "../services/CrudService.js";
const bcrypt = require("bcrypt");

const getHomePage = async (req, res) => {
    try {
        // const data = await db.Users.findAll();

        return res.render("homePage.ejs"); //, { data: JSON.stringify(data) });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const getAboutPage = (req, res) => {
    try {
        return res.render("aboutPage.ejs");
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const getCRUD = (req, res) => {
    try {
        return res.render("formCreateUser.ejs");
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const postCRUD = async (req, res) => {
    try {
        const result = await CrudService.createUser(req.body);
        return res.redirect("/list-user");
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const updateCRUD = async (req, res) => {
    try {
        const result = await CrudService.updateUser(
            req.params.userId,
            req.body
        );
        return res.redirect("/list-user");
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const deleteCRUD = async (req, res) => {
    try {
        const result = await CrudService.deleteUser(req.params);
        return res.redirect("/list-user");
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const listUserPage = async (req, res) => {
    try {
        const users = await db.Users.findAll();
        return res.render("listUser.ejs", { users });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

const updateUserPage = async (req, res) => {
    try {
        const user = await db.Users.findOne({
            where: { id: req.params.userId },
        });
        return res.render("formEditUser.ejs", { user });
    } catch (e) {
        return res
            .status(200)
            .json({ errCode: -1, message: "Get error from sever" });
    }
};

export {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    listUserPage,
    deleteCRUD,
    updateUserPage,
    updateCRUD,
};
