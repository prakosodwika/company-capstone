var express = require("express");
var router = express.Router();
const Users = require("../models/Users");
const Validator = require("fastest-validator");
const v = new Validator();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// mengubah password
hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};
// membaca password
decryptPassword = (plainPassword, hashFromDB) => {
  return bcrypt.compareSync(plainPassword, hashFromDB);
};

// registrasi
router.post("/registrasi", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    const schema = {
      name: { type: "string", nullable: false },
      email: { type: "string", nullable: false },
      password: { type: "string", nullable: false },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // cek email sudah digunakan atau belum
    const valEmail = await Users.findAll({
      where: {
        email: email,
      },
    });
    if (valEmail.length != 0) {
      return res.status(400).json({
        message: "Email telah digunakan",
      });
    }

    // create
    const hashedPassword = hashPassword(password);

    const newUsers = await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "Registrasi Success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    const schema = {
      email: { type: "string", nullable: false },
      password: { type: "string", nullable: false },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // mencari data user
    const account = await Users.findOne({
      where: { email: email },
    });
    const user = await Users.findOne({
      attributes: ["id", "name", "email"],
      where: { email: email },
    });

    if (account) {
      if (decryptPassword(password, account.password)) {
        return res.status(200).json({
          message: "Login Success",
          data: user,
        });
      }
      return res.status(401).json({
        message: "Password salah",
      });
    }
    return res.status(404).json({
      message: "Email tidak terdaftar",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// delete data
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUsers = await Users.destroy({
      where: { id: id },
    });
    await deleteUsers;
    res.status(200).json({
      status: "Delete success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
