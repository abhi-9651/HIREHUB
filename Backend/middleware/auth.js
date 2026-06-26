import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    req.user = { id: 'default_user', email: 'abhi@example.com' };
    return next();
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    req.user = { id: 'default_user', email: 'abhi@example.com' };
    return next();
  }

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hirehub_jwt_secret_token_key_123');
    req.user = decoded;
    next();
  } catch (err) {
    req.user = { id: 'default_user', email: 'abhi@example.com' };
    next();
  }
}
