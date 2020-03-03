const User = require("./user.model");

module.exports = {
  // signup
  // here we are implementing the signup logic using a controller:
  // accepts an email and password
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

  // signin
  // signin logic using controllers:
  // users must be real and not invalid and passwords must match
  signin: async (req, res) => {
    // if no email and password we want to return a 400 error and say "needs email and password"
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "need email and password" });
    }
    // catch any invalid emails and password combo i.e. not user
    const invalid = { message: "Invalid email and password combination" };

    // try/catch
    // if we have the email and password we want to try to find the user and token and returns the token with .send()
    try {
      // exec() method executes a search for a match in a specified string. Returns a result array, or null
      const user = await User.findOne({ email: req.body.email })
        .select("email password")
        .exec();
      // if wrong email and password (not user) we return a 401 status and send a message using the invalid label we created
      if (!user) {
        return res.status(401).send(invalid);
      }
      // check if the password is the same as the one in the db using the checkPassword() in the user.model
      const match = await user.checkPassword(req.body.password);
      // if wrong password (not user) we return a 401 status and send a message using the invalid label we created
      if (!match) {
        return res.status(401).send(invalid);
      }
      // return the user token
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
      // catch and console.log the error and end the req
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  },

  // get one authenticated user by an authenticated user
  person: async (req, res) => {
    res.status(200).json({ data: req.user });
  },

  // trying out code for getting all the users
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

  // updating an autheticated user by an autheticated user
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

  // deleting an autheticated user by an autheticated user
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
