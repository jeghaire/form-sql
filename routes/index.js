module.exports = app => {
  var router = require("express").Router();
  const members = require("../controllers/member.controller.js");

  router.post("/", members.create);
  router.get("/", members.findAll);
  router.delete("/", members.deleteAll);
  router.get("/born-again", members.findAllBornAgain);
  router.get("/:id", members.findOne);
  router.put("/:id", members.update);
  router.delete("/:id", members.delete);
  app.use(router);
};