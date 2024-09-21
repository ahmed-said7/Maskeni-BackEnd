"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emittedEvents = exports.Group_Privacy = exports.Admin_Role = exports.User_Role = exports.All_Role = void 0;
var All_Role;
(function (All_Role) {
    All_Role["Admin"] = "Admin";
    All_Role["User"] = "User";
    All_Role["SuperAdmin"] = "Superadmin";
    All_Role["Guest"] = "Guest";
})(All_Role || (exports.All_Role = All_Role = {}));
var User_Role;
(function (User_Role) {
    User_Role["User"] = "User";
})(User_Role || (exports.User_Role = User_Role = {}));
var Admin_Role;
(function (Admin_Role) {
    Admin_Role["Admin"] = "Admin";
    Admin_Role["SuperAdmin"] = "Superadmin";
})(Admin_Role || (exports.Admin_Role = Admin_Role = {}));
var Group_Privacy;
(function (Group_Privacy) {
    Group_Privacy["Private"] = "private";
    Group_Privacy["Public"] = "public";
})(Group_Privacy || (exports.Group_Privacy = Group_Privacy = {}));
var emittedEvents;
(function (emittedEvents) {
    emittedEvents["MessageCreated"] = "messageCreated";
    emittedEvents["UserJoined"] = "UserJoinedChat";
    emittedEvents["AdminMessageCreated"] = "adminMessageCreated";
    emittedEvents["AdminChatJoined"] = "JoinedAdminChat";
})(emittedEvents || (exports.emittedEvents = emittedEvents = {}));
//# sourceMappingURL=enum.js.map