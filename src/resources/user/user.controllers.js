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
  },
  updatePerson: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true
        }
      )
        .lean()
        .exec();

      res.status(200).json({ data: user });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
};
