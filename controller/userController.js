const User = require('./../model/userModel'); // Make sure to import your User model

module.exports.register = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // 1- Check if the user is already registered
    let userCheck = await User.findOne({ username });

    if (userCheck) {
      return res.json({
        success: false,
        msg: 'Username already registered',
      });
    }
    let useremailcheck = await User.findOne({ email });
    if (useremailcheck) {
      return res.json({
        success: false,
        msg: 'email already registered',
      });
    }
    // 2- Create a new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3- Save the user to the database
    await user.save();

    // Don't send the password in the response
    user.password = undefined;

    // 4- Send a successful response
    res.status(201).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // 1- Check if the user is already registered
    let user = await User.findOne({ username });

    if (!user) {
      return res.json({
        success: false,
        msg: 'Username already registered',
      });
    }
    if (!(await user.correctPassword(password, user.password))) {
      return res.json({
        success: false,
        msg: 'Wrong Username or Password',
      });
    }
    return res.json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
