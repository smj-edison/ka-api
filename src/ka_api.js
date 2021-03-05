module.auth = {
    ...require("./auth/login.js"),
    ...require("./auth/session.js"),
    getAuthenticatedHeader: require("./auth/getAuthenticatedHeader.js")
};

module.cookies = {
    ...require("./cookies/cookies.js")
};

module.discussion = {
    ...require("./discussion/commentsOnComment.js"),
    ...require("./discussion/commentsOnProgram.js")
};

module.notifications = {
    ...require("./notifications/commentNotifications.js"),
    ...require("./notifications/notifications.js")
};

module.profile = {
    getProfileInfo: require("./profile/getProfileInfo.js")
};

module.programs = {
    ...require("./programs/programs.js")
};

module.request = {
    ...require("./request/authenticatedRequest.js")
};
