import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { createSessionRow, destroySession, isSessionValid } from './db';

export const SESSION_COOKIE = 'nn_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

/**
 * Constant-time string compare — prevents timing attacks on password check.
 */
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export function verifyAdminPassword(plaintext: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(plaintext, expected);
}

/**
 * Creates a new server-side session and sets the session cookie.
 */
export function startSession() {
  const id = crypto.randomBytes(32).toString('hex');
  createSessionRow(id, SESSION_TTL_MS);
  cookies().set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

export function endSession() {
  const c = cookies();
  const id = c.get(SESSION_COOKIE)?.value;
  if (id) destroySession(id);
  c.delete(SESSION_COOKIE);
}

/**
 * Returns true if the current request has a valid admin session.
 * Safe to call from server components, route handlers, and middleware-adjacent code.
 */
export function isAdminAuthenticated(): boolean {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (!id) return false;
  return isSessionValid(id);
}
