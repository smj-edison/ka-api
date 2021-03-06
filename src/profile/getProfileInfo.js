const {makeAuthenticatedPostRequest} = require("../request/authenticatedRequest.js");

const GET_FULL_USER_PROFILE_QUERY = require("../queries/getFullUserProfileQuery.js");

/**
 * Get a user's profile information given their username
 * 
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} username - The requested user's username
 */
async function getProfileInfo(cookies, username) {
    let body = {
        "operationName": "getFullUserProfile",
        "variables": {"username": username},
        "query": GET_FULL_USER_PROFILE_QUERY
    };

    let url = "https://www.khanacademy.org/api/internal/graphql/getFullUserProfile?lang=en";

    return makeAuthenticatedPostRequest(cookies, url, body).then(result => result.data);
}

module.exports = getProfileInfo;
