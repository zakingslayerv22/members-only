const bcrypt = require("bcryptjs");

const db = require("../db/usersQueries");

exports.createUserAccount = async (userObject) => {
  const hashedPassword = await bcrypt.hash(userObject.password, 10);

  return await db.createUser({
    ...userObject,
    password: hashedPassword,
  });
};
