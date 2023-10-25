import type { Validate } from "payload/types";

export const validateSlug: Validate<string> = async (value: string, { t }) => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!slugPattern.test(value)) {
    return t("shared:errors:slug:invalid");
  }

  return true;
};
