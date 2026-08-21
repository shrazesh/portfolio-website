import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE_NAME = "portfolio_admin_session";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not defined.");
  }

  return new TextEncoder().encode(secret);
};

export async function createSessionToken() {
  return new SignJWT({
    role: "admin",
    username: process.env.ADMIN_USERNAME,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (payload.role !== "admin") {
      return null;
    }

    if (payload.username !== process.env.ADMIN_USERNAME) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminFromRequest(request) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}
