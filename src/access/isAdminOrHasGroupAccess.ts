import type { Access } from "payload/config";

export const isAdminOrHasGroupAccess =
  (GroupIDFieldName = "group"): Access =>
  ({ req: { user } }) => {
    // Need to be logged in
    if (user) {
      // If user has role of 'admin'
      if (user.roles.includes("admin")) return true;

      // If user has role of 'editor' and has access to a site,
      // return a query constraint to restrict the documents this user can edit
      // to only those that are assigned to a site, or have no site assigned
      if (user.roles.includes("editor") && user.groups?.length > 0) {
        // Otherwise, we can restrict it based on the `site` field
        return {
          or: [
            {
              [GroupIDFieldName]: {
                in: user.groups,
              },
            },
            {
              [GroupIDFieldName]: {
                exists: false,
              },
            },
          ],
        };
      }
    }

    // Reject everyone else
    return false;
  };
