const db = require("../models");
const Member = db.members;
const Op = db.Sequelize.Op;
const connection = require('../db/conn');


// Create and Save a new Member
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Member
  const member = {
    name: req.body.name,
    bornAgain: req.body.bornAgain ? true : false
  };

  // Save member in the database
  Member.create(member)
    .then(data => {
      // res.send(data);
      console.info('Added a new member: ', member);
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Member."
      });
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  // Member.findAll({ where: condition })
  //   .then(data => {
  //     res.render('members', { title: 'Members', data: data });
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving members."
  //     });
  //   });

  var sql = `select * from members;`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.render('members', { title: 'Members', data: result });
    }
  });
};

// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Member.findByPk(id)
    .then(data => {
      if (data) {
        res.render('members', { title: 'Member Details', data: data });
      } else {
        res.status(404).send({
          message: `Cannot find member with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving member with id=" + id
      });
    });
};

// Update a Member by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Member.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Member was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update member with id=${id}. Maybe member was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating member with id=" + id
      });
    });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Member was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete member with id=${id}. Maybe member was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete member with id=" + id
      });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
  Member.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} members were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all members."
      });
    });
};

// Find all Born Again Members
exports.findAllBornAgain = (req, res) => {
  Member.findAll({ where: { bornAgain: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving members."
      });
    });
};