const express = require("express");
const router = express.Router();

const {createAClass, getAClass, getAllClasses, updateAClass, deleteAClass} = require("./classController");
/* GET users listing. */
router.get("/", getAllClasses);
router.post("/", createAClass);
router.post("/test", (req,res)=>
    {const body = req.body;
    console.log({body});
    res.send("Post thanh cong!");
});
router.get("/:id", getAClass);
router.put("/:id", updateAClass);
router.delete("/:id", deleteAClass);


module.exports = router;
