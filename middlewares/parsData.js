exports.parsData = (req, res, next) => {
    const { tags, featured } = req.body
    if (tags) {
        req.body.tags = JSON.parse(tags)
    }
    if (featured) {
        req.body.tags = JSON.parse(featured)
    }
    next()
}