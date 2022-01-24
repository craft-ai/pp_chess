import { v4 as uuidv4 } from 'uuid';

function addRequestId(req, res, next) {
  req.requestId = uuidv4();
  next();
}

module.exports = { addRequestId };
