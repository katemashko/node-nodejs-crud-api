import { validate, version } from "uuid";

function isValidUUIDv4(id: string) {
  return validate(id) && version(id) === 4;
}

export { isValidUUIDv4 };
