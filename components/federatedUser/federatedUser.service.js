const FederatedUser = require("./federatedUser.model");

exports.createFederatedUser = async (obj) => {
  const { provider, subject, userId } = obj;
  try {
    await FederatedUser.create({
      provider,
      subject,
      userId,
    });
  } catch (error) {
    console.error(error);
  }
};
exports.getOneFederatedUser = async (provider, subject) => {
  try {
    const foundFederatedUser = await FederatedUser.findOne({
      where: { provider: provider, subject: subject },
    });
    return foundFederatedUser;
  } catch (error) {
    console.error(error);
  }
};
