import type { Access } from "payload/config";

export const isAdminOrHasGroupAccessOrPublished: Access = ({
  req: { user },
}) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles.includes("admin")) return true;

    // If user has role of 'editor' and has access to a site,
    // return a query constraint to restrict the documents this user can edit
    // to only those that are assigned to a site, or have no site assigned
    if (user.roles.includes("editor") && user.groups?.length > 0) {
      return {
        or: [
          {
            group: {
              in: user.groups,
            },
          },
          {
            group: {
              exists: false,
            },
          },
        ],
      };
    }
  }

  // Non-logged in users can only read published docs
  return {
    _status: {
      equals: "published",
    },
  };
};
