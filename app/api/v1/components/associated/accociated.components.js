const { GetEnvValueByKey } = require("../../../../../project/project.utils");
const { instance } = require("../../../v1/configs/sequelize.config");
const DefaultDbData = require("../../constances/default.dbdata");
const UserModel = require("../person/user/user.model");
const RoleModel = require("../role/role.model");
const SemesterModel = require("../semester/semester.model");
const RoomModel = require("../room/room.model");
const RoomCollectionModel = require("../roomCollection/room.collection.model");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const ItemModel = require("../item/item.model");
const ResourceModel = require("../resources/resource.model");
const RoomItemModel = require("../roomItem/room.item.model");
const RoomResourceModel = require("../roomResource/room.resource.model");

ResourceModel.model.hasOne(ItemModel.model, { foreignKey: "idResource" });
ResourceModel.model.hasOne(UserModel.model, { foreignKey: "idResource" });

UserModel.model.belongsTo(RoleModel.model, { foreignKey: "idRole" });

RoleModel.model.hasMany(UserModel.model, { foreignKey: "idRole" });
UserModel.model.belongsTo(RoleModel.model, { foreignKey: "idRole" });

RoomCollectionModel.model.hasMany(RoomModel.model, {
  foreignKey: "idRoomCollection",
});
RoomModel.model.belongsTo(RoomCollectionModel.model, {
  foreignKey: "idRoomCollection",
});

/**ROOM SEMESTER NN */
RoomModel.model.belongsToMany(SemesterModel.model, {
  through: RoomSemesterModel.model,
  foreignKey: "idRoom",
});
SemesterModel.model.belongsToMany(RoomModel.model, {
  through: RoomSemesterModel.model,
  foreignKey: "idSemester",
});

/**ROOM ITEM NN */
RoomModel.model.belongsToMany(ItemModel.model, {
  through: RoomItemModel.model,
  foreignKey: "idRoom",
});
ItemModel.model.belongsToMany(RoomModel.model, {
  through: RoomItemModel.model,
  foreignKey: "idItem",
});

/**ROOM RESOURCE NN */
RoomModel.model.belongsToMany(ResourceModel.model, {
  through: RoomResourceModel.model,
  foreignKey: "idRoom",
});
ResourceModel.model.belongsToMany(RoomModel.model, {
  through: RoomResourceModel.model,
  foreignKey: "idResource",
});

const Init = async () => {
  if (GetEnvValueByKey("DB_STRUCT_GENERATE") == "YES") {
    await instance.sync({ force: true });
    console.log("GEN GENERATIVE DB STRUCT");
    if (GetEnvValueByKey("DB_DATA_GENERATE") == "YES") {
      console.log("GEN GENERATIVE DB DATA");
      // CREATE DEFAULT ROLE
      for (const role of DefaultDbData.RoleData) {
        await RoleModel.model.create(role);
      }
      // CREATE DEFAULT USER
      for (const user of DefaultDbData.UserData) {
        await UserModel.model.create(user);
      }
      console.log("GENERATE DB DATA SUCCESS");
    }
  } else {
    await instance.sync({ force: false });
  }
};

Init();

module.exports = {};
