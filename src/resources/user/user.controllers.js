const User = require("./user.model");

module.exports = {
  signup: async (req, res) => {
    // if no email and password we want to return a 400 error and say "needs email and password"
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "needs email and password" });
    }
    // try/catch because:
    // if we have the email and password we want to try to create a new user and token and returns the token with .send()
    try {
      const user = await User.create(req.body);
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });

      // we also want to be able to catch any errors and end the req without sending a message with .end()
    } catch (e) {
      console.error(e);
      res.status(400).send(error);
    }
  },
  person: async (req, res) => {
    res.status(200).json({ data: req.user });
  },
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
  },
  deletePerson: async (req, res) => {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });

      return res
        .status(200)
        .json({ data: "Your User profile has been deleted" });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  }
};
