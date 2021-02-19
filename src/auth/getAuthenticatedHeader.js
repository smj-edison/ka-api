const {cookiesToCookieString, getCookieValue} = require("../cookies/cookies.js");

/**
 * Returns an axios header with all the proper authentication
 * 
 * @param {Array[string]} cookies
 * @param {object} customHeaders
 */
function getAuthenticatedHeader(cookies, customHeaders={}) {
    return {
        "headers": {
            "Cookie": cookiesToCookieString(cookies),
            "X-KA-FKey": getCookieValue(cookies, "fkey"),
            ...customHeaders
        }
    };
}

module.exports = getAuthenticatedHeader;
