import express from "express";
import {
  createContact,
  deleteContact,
  getContacts,
  getDetailContact,
  updateContact,
} from "../controllers/contact.controller.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const ContactRouter = express.Router();

ContactRouter.post("/", createContact);
ContactRouter.get("/", auth, isAdmin, getContacts);
ContactRouter.get("/:id", auth, getDetailContact);
ContactRouter.put("/:id", auth, updateContact);
ContactRouter.delete("/:id", auth, deleteContact);

export default ContactRouter;
