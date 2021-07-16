import {
  DbTransaction,
  SQLite,
  SQLiteObject,
} from '@ionic-enterprise/secure-storage';
import keyVault from './KeyVault';

interface Column {
  name: string;
  type: string;
}

export class DatabaseService {
  private dbHandle: SQLiteObject | undefined;
  private readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = this.initializeSchema();
  }

  get handle(): SQLiteObject | undefined {
    return this.dbHandle;
  }

  ready(): Promise<void> {
    return this.readyPromise;
  }

  private async initializeSchema(): Promise<void> {
    await this.open();
    await this.handle?.transaction(tx => {
      this.createTables(tx);
    });
  }

  private async open(): Promise<void> {
    const key = await keyVault.get();
    this.dbHandle = await SQLite.create({
      name: 'teaisforme.db',
      location: 'default',
      key,
    });
  }

  private createTables(transaction: DbTransaction): void {
    const id = { name: 'id', type: 'INTEGER PRIMARY KEY' };
    const name = { name: 'name', type: 'TEXT' };
    const description = { name: 'description', type: 'TEXT' };
    transaction.executeSql(
      this.createTableSQL('TeaCategories', [id, name, description]),
    );
    transaction.executeSql(
      this.createTableSQL('Teas', [
        id,
        name,
        description,
        { name: 'teaCategoryRid', type: 'INTEGER' },
      ]),
    );
  }

  private createTableSQL(name: string, columns: Array<Column>): string {
    let cols = '';
    columns.forEach((c, i) => {
      cols += `${i ? ', ' : ''}${c.name} ${c.type}`;
    });
    return `CREATE TABLE IF NOT EXISTS ${name} (${cols})`;
  }
}

export default new DatabaseService();
