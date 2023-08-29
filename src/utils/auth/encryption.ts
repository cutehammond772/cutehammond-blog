import crypto from "crypto";
import {
  EncryptionPairResult,
  Invalid,
  InvalidResult,
  PasswordEncryptionResult,
  SALT_LENGTH,
  SALT_ROUNDS,
  SaltGenResult,
} from "./types";

/**
 * 비밀번호를 암호화하기 위한 Random Salt를 생성한다.
 */
export async function createRandomSalt(): Promise<
  SaltGenResult | InvalidResult
> {
  return new Promise((resolve) => {
    crypto.randomBytes(SALT_LENGTH, (error, buf) => {
      if (error) {
        resolve(Invalid("SALT_CREATION_FAILED"));
      } else {
        resolve({ valid: true, salt: buf.toString("base64") });
      }
    });
  });
}

/**
 * 비밀번호를 암호화한다.
 */
export async function encrypt(
  salt: string,
  pwd: string
): Promise<PasswordEncryptionResult | InvalidResult> {
  return new Promise((resolve) => {
    crypto.pbkdf2(pwd, salt, SALT_ROUNDS, SALT_LENGTH, "sha512", (err, buf) => {
      if (err) {
        resolve(Invalid("PASSWORD_ENCRYPTION_FAILED"));
      } else {
        resolve({ valid: true, pwd: buf.toString("base64") });
      }
    });
  });
}

/**
 * 암호화된 비밀번호와 Salt 쌍을 생성한다.
 */
export async function createEncryptionPair(
  pwd: string
): Promise<EncryptionPairResult | InvalidResult> {
  const saltCreation = await createRandomSalt();

  if (!saltCreation.valid) {
    return Invalid("PAIR_CREATION_FAILED", ...saltCreation.reasons);
  }

  const encryption = await encrypt(saltCreation.salt, pwd);

  if (!encryption.valid) {
    return Invalid("PAIR_CREATION_FAILED", ...encryption.reasons);
  }

  return { valid: true, salt: saltCreation.salt, pwd: encryption.pwd };
}
