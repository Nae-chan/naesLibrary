/**
 * ARCHIEVED: this file is not currently being used but saved
 * incase we decide to no longer use mongoose
 */
import * as mongodb from "mongodb";

export class MongoHelper {
  public static client: mongodb.MongoClient;

  public static connect(url: string) {
    return new Promise((resolve, reject) => {
      mongodb.MongoClient.connect(
        url,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client: mongodb.MongoClient) => {
          if (err) {
            reject(err);
          } else {
            MongoHelper.client = client;
            resolve(client);
          }
        }
      );
    });
  }
}
