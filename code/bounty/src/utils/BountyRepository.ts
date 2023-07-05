import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput
} from '@aws-sdk/client-dynamodb';

/**
 * @description Factory function to create a new repository for presented books.
 */
export function createNewBountyRepository() {
  return new BountyRepository();
}

/**
 * @description Concrete implementation of DynamoDB repository.
 * @see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-table-read-write.html
 */
class BountyRepository {
  docClient: DynamoDBClient;
  tableName: string;
  region: string;

  constructor() {
    this.region = process.env.REGION || '';
    this.tableName = process.env.TABLE_NAME || '';

    if (!this.region || !this.tableName)
      throw new MissingEnvVarsError(
        JSON.stringify([
          { key: 'REGION', value: process.env.REGION },
          { key: 'TABLE_NAME', value: process.env.TABLE_NAME }
        ])
      );

    this.docClient = new DynamoDBClient({ region: this.region });
  }

  /**
   * @description Add (create/update) data for a particular rebel and their damages.
   */
  public async add(input: BountyDTO): Promise<void> {
    const { name, bounty } = input;

    const command: PutItemCommandInput = {
      TableName: this.tableName,
      Item: {
        pk: { S: 'REBEL_SCUM' },
        sk: { S: name },
        bounty: { S: bounty }
      }
    };

    if (process.env.NODE_ENV !== 'test') await this.docClient.send(new PutItemCommand(command));
  }

  /**
   * @description Get bounty data.
   */
  public async get() {
    const command: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: 'REBEL_SCUM' }
      }
    };

    const data = (await this.docClient.send(new QueryCommand(command))) as any;
    return getCleanedItems(data.Items as DynamoItem[], { sk: 'name' });
  }
}

export function getCleanedItems(
  items: DynamoItem[],
  remappedKeys?: RemappedKeys
): Record<string, any>[] {
  if (items && items.length > 0)
    return items.map((item: DynamoItem) => createCleanedItem(item, remappedKeys));
  return [];
}

/**
 * @description Produce an object with a cleaned and restored format based on the input data.
 */
function createCleanedItem(item: DynamoItem, remappedKeys?: RemappedKeys): Record<string, any> {
  const cleanedItem: Record<string, any> = {};

  Object.entries(item).forEach((entry: any) => {
    const [key, value] = entry;
    if (!remappedKeys) cleanedItem[key] = Object.values(value)[0];
    else {
      const { sk } = remappedKeys;
      if (key === 'pk') return; // Ignore pk
      else if (key === 'sk') cleanedItem[sk as string] = Object.values(value)[0];
      else cleanedItem[key] = Object.values(value)[0];
    }
  });

  return cleanedItem;
}

type RemappedKeys = {
  sk?: string;
};

class MissingEnvVarsError extends Error {
  constructor(variables: string) {
    super(variables);
    this.name = 'MissingEnvVarsError';
    const message = `Missing one or more required environment variables! ${variables}`;
    this.message = message;

    console.error(message);
  }
}

type BountyDTO = {
  name: string;
  bounty: string;
};

/**
 * @description Record in the database.
 */
type DynamoItem = {
  [key: string]: StringRepresentation;
};

/**
 * @description String that represents the value.
 */
type StringRepresentation = {
  S: string;
};
