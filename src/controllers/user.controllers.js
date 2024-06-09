import * as service from "../services/user.services.js";

export const register = async (req, res, next) => {
  try {
    const user = await service.register(req.body);
    if (!user) res.status(404).json({ msj: "Bad request" });
    res.status(201).json(user);
  } catch (error) {
    next(error.message);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email, password);
    if (!user) res.status(404).json({ msj: "Bad request" });
    res.status(201).json(user);
  } catch (error) {
    next(error.message);
  }
};

export const infoSession = (req, res, next) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res, next) => {
  req.session.destroy();
  res.send("session destroy");
};
