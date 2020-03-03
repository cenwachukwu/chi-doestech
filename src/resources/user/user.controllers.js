const User = require("./user.model");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find()
        .lean()
        .exec();
      res.status(200).json({ data: allUsers });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
};
