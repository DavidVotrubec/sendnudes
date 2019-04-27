module.exports.parseQueryString = function(queryStr) {
    if (!queryStr) {
        return null;
    }
    return JSON.parse('{"' + decodeURI(queryStr)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g,'":"') + '"}')
};