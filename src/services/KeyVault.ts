import { Capacitor } from '@capacitor/core';
import {
  BrowserVault,
  DeviceSecurityType,
  IdentityVaultConfig,
  Vault,
  VaultType,
} from '@ionic-enterprise/identity-vault';
import key from './Key';

export class KeyVaultService {
  private encryptionKey = 'encryption-key';
  private vault: BrowserVault | Vault;

  constructor() {
    const web = Capacitor.getPlatform() === 'web';
    const config: IdentityVaultConfig = {
      key: 'io.ionic.cs-demo-iv-ss-ng.keys',
      type: VaultType.SecureStorage,
      deviceSecurityType: DeviceSecurityType.SystemPasscode,
      lockAfterBackgrounded: 0,
      unlockVaultOnLoad: false,
    };
    this.vault = web ? new BrowserVault(config) : new Vault(config);
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
