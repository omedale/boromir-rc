import {
  Random
} from "meteor/random";
import {
  SimpleSchema
} from "meteor/aldeed:simple-schema";

/**
 * Reaction Schemas Mail Url
 */

export const MailUrl = new SimpleSchema({
  _id: {
    type: String,
    defaultValue: Random.id(),
    optional: true
  },
  url: {
    type: String,
    label: "Url"
  }
});
