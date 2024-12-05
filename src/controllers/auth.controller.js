import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET,BACKEND_HOST,NODE_ENV, CORS_ORIGIN } from "../config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["The email is already exists"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved.id });


    const isProduction = NODE_ENV === 'production'
    res.cookie("token", token,{
      domain: isProduction? CORS_ORIGIN:"",
      httpOnly: isProduction,
      secure:isProduction,
      sameSite:isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json([error.message]);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json(["User not found"]);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json(["Incorrect password"]);
    }

    const token = await createAccessToken({ id: userFound.id });

    const isProduction = NODE_ENV === 'production'
    res.cookie("token", token,{
      domain: isProduction? CORS_ORIGIN:"",
      httpOnly: isProduction,
      secure:isProduction,
      sameSite:isProduction ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, 
    })

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json([error.message]);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json({
    id: userFound.id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userFound = await User.findById(user.id);

    if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
