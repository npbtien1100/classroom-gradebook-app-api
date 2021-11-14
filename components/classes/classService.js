
const User = require("../users/use.model");
const Class = require("./classModel");


exports.createClass = async (req) => {
  const { className, classSection, subject, room } = req.body;
  console.log(req.body);
  try {
    await Class.create({
      className,
      classSection,
      subject,
      room,
    });
    return { message: "Create class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
exports.getOneClassByID = async (classID, arrayAttributes) => {
  try {
    const foundClass = await Class.findOne({
      where: { id: classID },
      attributes: arrayAttributes,
    });
    console.log({ foundClass });
    return foundClass;
  } catch (error) {
    console.error(error);
  }
};
exports.getAllClasses = async (arrayAttributes, options) => {
  try {
    const { orderOption } = options;
    const allClasses = await Class.findAll({
      attributes: arrayAttributes,
      order: orderOption,
    });
    return allClasses;
  } catch (error) {
    console.error(error);
  }
};
exports.updateAClass = async (classID, attributeObject) => {
  try {
    await Class.update(attributeObject, { where: { id: classID } });
    return { message: "Update class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating Class!",
    };
  }
};
exports.deleteAClass = async (classID) => {
  try {
    await Class.destroy({ where: { id: classID } });
    return { message: "Delete class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while deleting Class!",
    };
  }
};
exports.createDataSample = async()=>{
  try{
    await Class.bulkCreate([
    {className:'Phát triển ứng dụng web',classSection:'PTUDW',subject:null,room:'dummy room value'},
    {className:'Phát triển ứng dụng web nâng cao',classSection: 'PTUDWNC',subject: null, room:'dummy room value'},
    {className:'Kiến trúc phần mềm',classSection: 'KTPM',subject: '', room:'dummy room value'},
    {className:'Mẫu thiết kế hướng đối tượng',classSection: 'MTKHDT',subject: '',room: 'dummy room value'},
    {className:'Lập trình Windows',classSection: 'LTWD',subject: 'Windows', room:'Test dummy room value'},
    {className:'Lập trình ứng dụng di động',classSection: 'LTUDDD',subject: 'Mobile',room: ''},
    {className:'Cơ sở dữ liệu',classSection: 'CSDL',subject: 'Database',room: ''},
    {className:'Cấu trúc dữ liệu và giải thuật',classSection: 'CTDL&GT',subject: '', room:''},
    {className:'Hệ điều hành',classSection: 'HDH',subject: 'Operating System', room:''},
  ]);
  }catch(error){
    console.error(error);
  }
}

exports.test = async()=>{
  try{
    const PTUDW = await Class.findOne({where:{id: 1}});
    const user1 = await User.findOne({where: {id: 1}});
    await PTUDW.addUser(user1);
  }catch(error){
    console.error(error);
  }
}