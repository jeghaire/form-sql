module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
    name: {
      type: Sequelize.STRING
    },
    bornAgain: {
      type: Sequelize.BOOLEAN
    }
  });

  return Member;
};