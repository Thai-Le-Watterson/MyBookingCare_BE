import db from "../models";
import * as CrudService from "../services/CrudService.js";
const bcrypt = require("bcrypt");

const getHomePage = async (req, res) => {
    const data = await db.Users.findAll();

    return res.render("homePage.ejs", { data: JSON.stringify(data) });
};

const getAboutPage = (req, res) => {
    return res.render("aboutPage.ejs");
};

const getCRUD = (req, res) => {
    return res.render("formCreateUser.ejs");
};

const postCRUD = async (req, res) => {
    const result = await CrudService.createUser(req.body);
    return res.redirect("/list-user");
};

const updateCRUD = async (req, res) => {
    const result = await CrudService.updateUser(req.params.userId, req.body);
    return res.redirect("/list-user");
};

const deleteCRUD = async (req, res) => {
    const result = await CrudService.deleteUser(req.params);
    return res.redirect("/list-user");
};

const listUserPage = async (req, res) => {
    const users = await db.Users.findAll();
    return res.render("listUser.ejs", { users });
};

const updateUserPage = async (req, res) => {
    const user = await db.Users.findOne({ where: { id: req.params.userId } });
    return res.render("formEditUser.ejs", { user });
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
