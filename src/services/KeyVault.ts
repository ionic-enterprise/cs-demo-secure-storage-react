import { Vault } from '@ionic-enterprise/identity-vault';
import key from './Key';

export class KeyVaultService {
  private encryptionKey = 'encryption-key';
  private vault: Vault;

  constructor() {
    this.vault = new Vault({
      key: 'io.ionic.cs-demo-iv-ss-ng.keys',
      type: 'SecureStorage',
      deviceSecurityType: 'SystemPasscode',
      lockAfterBackgrounded: 0,
      unlockVaultOnLoad: false,
    });
  }

  async get(): Promise<string> {
    let dbKey = await this.vault.getValue(this.encryptionKey);
    if (!dbKey) {
      dbKey = await key.get();
      this.set(dbKey);
    }
    return dbKey;
  }

  async clear(): Promise<void> {
    return this.vault.clear();
  }

  private async set(value: string): Promise<void> {
    return this.vault.setValue(this.encryptionKey, value);
  }
}

export default new KeyVaultService();
