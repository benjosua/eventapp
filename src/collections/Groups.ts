import type { CollectionConfig } from "payload/types";

import { isAdmin } from "../access/isAdmin";
import { isAdminOrHasGroupAccess } from "../access/isAdminOrHasGroupAccess";
import { validateSlug } from "../validators/validateSlug";
import { validateURLField } from "../validators/validateURLField";

export const Groups: CollectionConfig = {
  slug: "groups",
  admin: {
    useAsTitle: "title",
  },
  access: {
    // Only admins can create
    create: isAdmin,
    // Only admins or editors with site access can read
    read: isAdminOrHasGroupAccess("id"),
    // Only admins can update
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      validate: validateSlug,
    },
    {
      name: "description",
      type: "richText",
      required: false,
    },
    {
      name: "slider", // required
      type: "array", // required
      label: "Site content",
      minRows: 1,
      maxRows: 10,
      interfaceName: "CardSlider", // optional
      labels: {
        singular: "Link",
        plural: "Link",
      },
      fields: [
        // required
        {
          name: "title",
          type: "text",
        },
        {
          name: "link",
          type: "text",
          validate: validateURLField,
        },
      ],
    },
  ],
};
