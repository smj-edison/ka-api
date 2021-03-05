const axios = require("axios");

const DEFAULT_PROGRAM_JSON = require("./defaultProgramJson.js");

const {makeAuthenticatedPostRequest, makeAuthenticatedPutRequest} = require("../request/authenticatedRequest.js");
const getQueryTime = require("./getQueryTime.js");


const VALID_PROGRAM_TYPES = ["pjs", "webpage", "sql"];

/**
 * Returns the program info, given the program's ID
 * 
 * @param {string} id The program's ID
 */
async function getProgramJSON(id) {
    const url = `https://www.khanacademy.org/api/internal/scratchpads/${id}`;

    return axios.get(url).then(response => response.data);
}

/**
 * Create a new program on KA's servers
 * 
 * @param {Array<string>} cookies - A list of cookies returned from the server (set-cookie header)
 * @param {string} code - The code of the new program
 * @param {object} [settings] - Any custom settings to override
 * @param {("pjs","webpage","sql")} [type] - The type of program
 */
async function newProgram(cookies, code, settings={}, type="pjs") {
    if(!VALID_PROGRAM_TYPES.includes(type)) {
        throw `Program type needs to be of type ${VALID_PROGRAM_TYPES}`;
    }

    let jsonToSend = {
        title: "New program",
        translatedTitle: "New program",
        category: null,
        difficulty: null,
        tags: [],
        userAuthoredContentType: type,
        topicId: "xffde7c31",
        revision: {
            code: code || "",
            editor_type: "ace_" + type,
            folds: [],
            image_url: PROGRAM_DEFAULT_JSON.revision.image_url,
            config_version: 4,
            topic_slug: "computer-programming"
        },
        ...settings
    };

    let url = `https://www.khanacademy.org/api/internal/scratchpads?client_dt=${getQueryTime()}&lang=en`;

    return makeAuthenticatedPostRequest(cookies, url, jsonToSend);
}

/**
 * Updates an existing program based on the parameters
 * 
 * @param {Array} cookies An array of set-cookie response headers from axios
 * @param {string} programId The program's ID being updated
 * @param {string} code The code
 * @param {object} [settings] Settings to override the JSON request
 */
async function updateProgram(cookies, programId, code, settings={}, programJson) {
    programJson = programJson || await getProgramJSON(programId); //get the program's JSON, is this necessary?

    var jsonToSend = {
        ...PROGRAM_DEFAULT_JSON,
        ...programJson,
        "relativeUrl": "/computer-programming/_/" + programId,
        "id": parseInt(programId),
        "date": (new Date()).toISOString().substring(0, 19) + "Z",
        "revision": {
            ...PROGRAM_DEFAULT_JSON.revision,
            ...programJson.revision,
            "code": code
        },
        "trustedRevision": {
            "created": (new Date()).toISOString()
        },
        ...settings
    };

    let url = `https://www.khanacademy.org/api/internal/scratchpads/${programId}?client_dt=${getQueryTime()}&lang=en`;
    
    return makeAuthenticatedPutRequest(cookies, url, jsonToSend);
}
