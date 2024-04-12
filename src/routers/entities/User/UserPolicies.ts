import { User } from "../../../../models/User";
import { Policy } from "../../../security/PolicyBuilder";

const userPolicies: Policy<User>[] = [];

const createIfUsernameIsLessThan10Characters = new Policy<User>("Create", {
  username: { $exists: true },
  password: { $exists: true },
});

userPolicies.push(createIfUsernameIsLessThan10Characters);

export default userPolicies;
