import AdministrationModel from "../models/Administration.js";
import bcrypt from "bcrypt";
import * as TokenService from "./AdministrationTokenService.js";
import * as AdministrationDto from "../dtos/AdministrationDto.js";

export const registration = async (login, firstName, lastName, password) => {
  try {
    const canditate = await AdministrationModel.findOne({ login });

    if (canditate) {
      return { error: "Email already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await AdministrationModel.create({
      login,
      password: hash,
      firstName,
      lastName,
      isAdmin: false,
      isOperator: true,
      role: 'Manager'
    });

    const administrationDto = AdministrationDto.createAdministrationDto(user);
    const tokens = await TokenService.generateTokens({ ...administrationDto });
    const { accessToken, refreshToken } = tokens;
    await TokenService.saveTokens(administrationDto.id, refreshToken);

    return { refreshToken, accessToken, user };
  } catch (e) {
    console.log(e);
  }
};

export const login = async (login, password) => {
  try {
    const user = await AdministrationModel.findOne({ login });

    if (!user) {
      return { error: "User not found" };
    }

    const isvalidPassword = await bcrypt.compare(password, user.password);

    if (!isvalidPassword) {
      return { error: "Password not found" };
    }

    const administrationDto = AdministrationDto.createAdministrationDto(user);
    const tokens = await TokenService.generateTokens({ ...administrationDto });
    const { accessToken, refreshToken } = tokens;
    await TokenService.saveTokens(administrationDto.id, refreshToken);
    return { refreshToken, accessToken, user };
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (refreshToken) => {
  try {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  } catch (e) {
    console.log(e);
  }
};

export const refresh = async (token) => {
  try {
    if (!token) {
      return { error: "Token Error" };
    }

    const tokenFromDb = await TokenService.findToken(token);

    const userData = await TokenService.validateRefreshToken(token);


    if (!userData || !tokenFromDb) {
      return { error: "Validation error" };
    }
    const user = await AdministrationModel.findById(userData.id);
    const administrationDto = await AdministrationDto.createAdministrationDto(user);
    const tokens = await TokenService.generateTokens({ ...administrationDto });
    const { accessToken, refreshToken } = tokens;

    await TokenService.saveTokens(administrationDto.id, refreshToken);
    return { refreshToken, accessToken, user };
  } catch (e) {
    console.log(e);
  }
};
