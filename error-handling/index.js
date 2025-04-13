module.exports = (app) => {
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (err.name === 'ValidationError') {
      let errorMessages = Object.values(err.errors).map(el => el.message)
      res.status(400).json({ errorMessages })
    }

    if (err.code && err.code === 11000) {
      res.status(409).json({ errorMessages: ['Value duplicated, already in the database'] })
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        message: "Unauthorized: invalid or expired token",
        code: "invalid_token"
      })
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message || err
    })

  });
};