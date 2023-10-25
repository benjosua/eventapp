import type { Validate } from "payload/types";

export const validateURLField: Validate<string> = async (
  value: string,
  { t }
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const url = new URL(value);
    // eslint-disable-next-line @typescript-eslint/no-implicit-any-catch
  } catch (err) {
    return t("shared:errors:url:invalid");
  }
  return true;
};
