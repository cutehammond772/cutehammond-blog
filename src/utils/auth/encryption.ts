import crypto from "crypto";
import { SALT_LENGTH, SALT_ROUNDS } from ".";
import PasswordEncryptionError from "./error/PasswordEncryptionError";
import SaltCreationError from "./error/SaltCreationError";

/**
 * 비밀번호를 암호화하기 위한 Random Salt를 생성한다.
 */
export async function createRandomSalt() {
  return new Promise<string>((resolve, reject) => {
    crypto.randomBytes(SALT_LENGTH, (error, buf) => {
      if (error) {
        reject(new SaltCreationError(503));
      } else {
        resolve(buf.toString("base64"));
      }
    });
  });
}

/**
 * 비밀번호를 암호화한다.
 */
export async function encrypt(salt: string, pwd: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(pwd, salt, SALT_ROUNDS, SALT_LENGTH, "sha512", (err, buf) => {
      if (err) {
        reject(new PasswordEncryptionError(503));
      } else {
        resolve(buf.toString("base64"));
      }
    });
  });
}

/**
 * 암호화된 비밀번호와 Salt 쌍을 생성한다.
 */
export async function createEncryptionPair(pwd: string) {
  const salt = await createRandomSalt();
  const encryptedPwd = await encrypt(salt, pwd);

  return { salt, pwd: encryptedPwd };
}
