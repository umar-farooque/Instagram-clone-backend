const { Profile } = require('../models/Profile');
const { User } = require('../models/User');

exports.RegisterUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await User.findOne({ username: username });
    if (userExist) return res.status(400).send('USer Already Exist');

    console.log('after');
    const user = User({ username, password });
    await user.save();
    const token = user.generateAuthToken();
    await Profile.create({ user: user._id });
    const profile = await Profile.findOne({ user: user._id }).populate(
      'user',
      '-password'
    );

    return res.status(200).send({ user: profile, token });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }

  //  console.log(userExist);
};

exports.LoginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    const userPassword = await user.comparePassword(password, user.password);
    if (!user || !userPassword)
      return res.status(400).send('Invalid Email Or Password');

    const token = user.generateAuthToken();
    const profile = await Profile.findOne({ user: user._id }).populate(
      'user',
      '-password'
    );
    return res.status(200).send({ user: profile, token });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
