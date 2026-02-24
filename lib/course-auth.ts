import { jwtVerify, importX509 } from "jose";
import { projectConfig } from "@/config";
import { NextRequest, NextResponse } from "next/server";

/**
 * Liest den Bearer-Token aus dem Request und verifiziert ihn mit dem Outseta Public Key.
 * Gibt die Outseta User Uid zurück (aus JWT-Payload sub oder uid).
 */
export async function getOutsetaUidFromRequest(
  request: NextRequest
): Promise<{ uid: string } | NextResponse> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return NextResponse.json(
      { error: "Authorization header with Bearer token required" },
      { status: 401 }
    );
  }

  const certificate = projectConfig.outsetaOptions.auth.publicKey;
  try {
    const publicKey = await importX509(certificate.trim(), "RS256");
    const { payload } = await jwtVerify(token, publicKey);
    const uid =
      (payload.sub as string) ??
      (payload.uid as string) ??
      (payload.userId as string);
    if (!uid || typeof uid !== "string") {
      return NextResponse.json(
        { error: "Token payload missing user identifier" },
        { status: 401 }
      );
    }
    return { uid };
  } catch (error) {
    console.error("[course-auth] JWT verification failed:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
