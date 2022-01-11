const Class = require("../classes/classModel");
const User = require("../users/use.model");
const Admin = require("./admin.model");

exports.getAllAdmins = async () => {
  try {
    const adminList = await Admin.findAll({
      attributes: { exclude: ["password", "updatedAt"] },
    });
    return adminList;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting admins list!",
    };
  }
};
exports.createAnAdmin = async (data) => {
  try {
    const { fullName, email, password, phone, address } = data;
    await Admin.create({ fullName, email, password, phone, address });
    return { message: "Create admin successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating admin!",
    };
  }
};
exports.getAnAdmin = async (adminId) => {
  try {
    const foundAdmin = await this.findOneById(adminId);
    return foundAdmin;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting admin detail!",
    };
  }
};
exports.updateAnAdmin = async (adminId, data) => {
  try {
    const { fullName, address, phone } = data;
    await Admin.update(
      { fullName, address, phone },
      { where: { id: adminId } }
    );
    return { message: "Update admin profile successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message || "Some error occurred while updating admin profile!",
    };
  }
};

exports.getAllUsers = async () => {
  try {
    const userList = await User.findAll({
      attributes: { exclude: "password" },
    });
    return userList;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting users list!",
    };
  }
};
exports.getAUser = async (userId) => {
  try {
    const userDetail = await User.findByPk(userId, {
      attributes: { exclude: "password" },
    });
    return userDetail;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting user detail!",
    };
  }
};
exports.updateAUser = async (userId, data) => {
  try {
    const { studentId, isLock } = data;
    await User.update(
      { student_id: studentId, isLock },
      { where: { id: userId } }
    );
    return { message: "Update user state successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating user state!",
    };
  }
};

exports.getAllClasses = async () => {
  try {
    const classList = await Class.findAll({ order: [["id", "DESC"]] });
    return classList;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting classes list!",
    };
  }
};
exports.getAClass = async (classId) => {
  try {
    const classDetail = await Class.findByPk(classId);
    return classDetail;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while getting class detail!",
    };
  }
};

exports.getTotalReport = async () => {
  try {
    const report = await Promise.all([
      Admin.count(),
      User.count(),
      Class.count(),
    ]);
    const res = { admin: report[0], user: report[1], class: report[2] };
    return res;
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while reporting!",
    };
  }
};

exports.findOneByEmail = async (email) => {
  try {
    const foundUser = await Admin.findOne({
      where: { email: email },
    });
    return foundUser;
  } catch (error) {
    console.error(error);
  }
};

exports.findOneById = async (adminId) => {
  try {
    const foundUser = await Admin.findOne({
      where: { id: adminId },
      attributes: { exclude: "password" },
    });
    return foundUser;
  } catch (error) {
    console.error(error);
  }
};
