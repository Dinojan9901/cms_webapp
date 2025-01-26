const { validateContact } = require("../models/Contact");
const router = require("express").Router();

router.post("/contact", async (req, res) => {
    const { error } = validateContact(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    try {
    } catch (err) {
        console.log(err);
        }
    });

module.exports = router;