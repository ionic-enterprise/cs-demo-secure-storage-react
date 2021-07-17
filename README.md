# Secure Storage Storage Demo for `@ionic/react`

This applications demonstrates the generic base configuration of the Ionic Enterprise Secure Storage solution. This demo application deals with configuration and creation of the database and demonstrates sample CRUD operations.

## Running the Application

In order to run this application, you need access to the Ionic Enterprise Secure Storage plugin. If you do not have access to this plugin, please contact your account manager.

Here are the general steps required to run this application:

- clone the repo and change to its root directory
- `npm ci`
- `npm run build`
- `npx cap sync`
- `npx cap open android`
- `npx cap open ios`

At this point you should be able to sideload the application on a device or run it in an emulator and try it out.

## General Architecture

### Services

#### Database

The database service is concerned with initializing the database and creating or modifying the schema as needed. A more complex app containing multiple databases should have multiple "database" services, one for each database. In that case, some routines from this service will likely need to be abstracted into a "database utility" service to avoid replication of logic.

#### KeyService

This service simply simulates getting an encryption key from an API. In a real application this would likely hit some HTTP endpoint.

#### KeyVaultService

This service is used to get the encryption key for the database. It will first query the vault to see if the key exists. If it does not, it will obtain the key from the API and store it in the vault for the next time.

```TypeScript
  async get(): Promise<string> {
    let dbKey = await this.vault.getValue(this.encryptionKey);
    if (!dbKey) {
      dbKey = await this.key.get();
      this.set(dbKey);
    }
    return dbKey;
  }
```

#### Other Services

Each of the other services in this application handle the CRUD operations for ONE type of data entity within the application domain. Note that this does not have to be a table-by-table grouping. It can be, but it does not have to be. A logical entity within the application domain could easily span multiple tables.

### Context API

This application uses the React Context API to manage the state of the application. Contexts provide data to be accessible by many components in the tree, and at different nesting levels.

### Hooks

Each of the hooks in this application are used to encapsulate contexts and provide communication with the databases via the services mentioned above.

### Pages

The pages know nothing about how the data is stored. They get the current state from the contexts and hooks. The business logic associated with various CRUD operations is also all managed through the contexts and hooks. This allows the pages and other components to focus on the concerns of displaying the information to the user and reacting to interaction from the user.

Happy Coding!! 🤓
