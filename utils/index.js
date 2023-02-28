function expressLogger(req, res, next){
    const { url, method } = req;
    const date = new Date();
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "nov", "dec"]
    const timestamp = `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`

    console.log(timestamp, url, method)
    next()
}

module.exports = { expressLogger };