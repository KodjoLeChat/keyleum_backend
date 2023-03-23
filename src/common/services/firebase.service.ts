import * as admin from 'firebase-admin';

export class FirebaseService {
  static async userExists(uuid: string): Promise<boolean> {
    const uidExists = await admin
      .auth()
      .getUser(uuid)
      .then(() => true)
      .catch(() => false);
    return uidExists;
  }

  static async deleteUser(uuid: string): Promise<void> {
    const userExists = await this.userExists(uuid);
    if (!userExists) return;
    await admin.auth().deleteUser(uuid);
  }

  static async users() {
    const users = await admin.auth().listUsers();
    return users;
  }
}
