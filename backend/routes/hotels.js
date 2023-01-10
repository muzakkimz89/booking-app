import express from "express";
import Hotel from "../models/hotel.js";
import {createError} from "../utils/error.js"
import {createHotel, 
    getHotel,
    getHotels,
    updateHotel,
    deleteHotel,
    countByCity,
    countByType
} from "../controllers/hotel.controller.js"
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();

router.get("/admin", verifyAdmin, (req, res) => {
    // Only administrators will be able to access this route
    // Code for handling the request goes here
    res.send("Hello, administrator!");
  });
  

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getHotels);
//Get total properties in cites and type properties
router.get("/countByCity", countByCity);
//router.get("/countByType", getRooms);
router.get("/countByType", countByType);

export default router

