function normalizeGenres(req, res, next) {
    if (req.body.genres && !Array.isArray(req.body.genres)) {
        req.body.genres = [req.body.genres];
    }

    next();
}

module.exports = { normalizeGenres };