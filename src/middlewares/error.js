function error404(req, res, next) {
  const { method, originalUrl } = req;
  const requestId = res.requestId || 'NoRequestId';

  res.status(404).send({
    name: 'NotFound',
    message: `${requestId} - [NotFound] [${method}] ${originalUrl} is not found.`,
  });
}

// If this function is called, `err` is an instanceof Error
function errorHandler(err, req, res, next) {
  if (err.requestId) {
    res.status(err.status).send(err);
  } else {
    res.status(err.status || 500).send({ message: err.message });
  }
}

module.exports = { error404, errorHandler };
