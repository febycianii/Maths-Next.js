// utils/hash.ts

/**
 * Utility helper to hash sensitive values (e.g. passwords) using SHA-256.
 * We rely on the Web Crypto API that is available in all modern browsers.
 *
 * The function returns a hexadecimal string representation of the hash so it
 * can be easily persisted and later compared.
 */
export const hashSHA256 = async (value: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};