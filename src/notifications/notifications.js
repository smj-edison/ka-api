const {makeAuthenticatedGetRequest, makeAuthenticatedPostRequest} = require("../request/authenticatedRequest.js");
/**
 * Get the most recent notifications from KA
 * 
 * @param {Array<string>} cookies A list of cookies returned from the server (set-cookie header)
 * @param {string} [cursor] The cursor returned from previous getNotificationsRequest calls
 */
async function getNotificationsRequest(cookies, cursor) {
    let cursorString = cursor ? `&cursor=${cursor}` : "";

    let url = `https://www.khanacademy.org/api/internal/user/notifications/readable?casing=camel${cursorString}`;

    return makeAuthenticatedGetRequest(cookies, url).then(response => response.data);
}

/**
 * 
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {number} [maxDepth=10] - The maximum depth in the notifications the code will request
 */
async function getAllBrandNewNotifications(cookies, maxDepth=10) {
    let currentCursor;
    let notifications = [];

    // prevent bad code from infinitely requesting
    let depth = 1;

    do {
        const response = await getNotificationsRequest(cookies, currentCursor);
        const nextCursor = response.cursor;

        const notifs = response.notifications;

        // check if there are new notifications
        if(notifs[notifs.length - 1].brandNew) {
            currentCursor = nextCursor;
        } else {
            currentCursor = null;
        }
        
        // only add brand new notifications
        notifications.push(...notifs.filter(notif => {
            return notif.brandNew;
        }));

        depth++;
    } while(currentCursor && depth < maxDepth);

    return notifications;
}

/**
 * Clears all brand new notifications so they aren't performed on twice
 * 
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 */
async function clearBrandNewNotifications(cookies) {
    const url = "https://www.khanacademy.org/api/internal/user/notifications/clear_brand_new?lang=en";

    return makeAuthenticatedPostRequest(cookies, url);
}

module.exports = {
    getNotificationsRequest,
    getAllBrandNewNotifications,
    clearBrandNewNotifications
};
