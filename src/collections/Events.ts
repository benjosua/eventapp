import type { CollectionConfig } from "payload/types";

import { isAdminOrHasGroupAccessOrPublished } from "../access/isAdminHasGroupAccessOrPublished";
import { isAdminOrHasGroupAccess } from "../access/isAdminOrHasGroupAccess";
import { isLoggedIn } from "../access/isLoggedIn";
import { validateURLField } from "../validators/validateURLField";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
  },
  versions: {
    drafts: true,
  },
  access: {
    // Anyone logged in can create
    create: isLoggedIn,
    // Only admins or editors with site access can update
    update: isAdminOrHasGroupAccess(),
    // Admins or editors with site access can read,
    // otherwise users not logged in can only read published
    read: isAdminOrHasGroupAccessOrPublished,
    // Only admins can delete
    delete: isAdminOrHasGroupAccess(),
  },
  fields: [
    {
      name: "title",
      type: "text", // Assuming 'title' is a text field
      required: true,
    },
    {
      name: "start",
      type: "date", // Assuming 'start' is a datetime field
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          timeFormat: "HH:mm",
          displayFormat: "MMM d, yyyy HH:mm",
          //   displayFormat: "d MMM yyy",
        },
      },
    },
    {
      name: "end",
      type: "date", // Assuming 'end' is a datetime field
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          timeFormat: "HH:mm",
          displayFormat: "MMM d, yyyy HH:mm",
          //   displayFormat: "d MMM yyy",
        },
      },
      validate: (value, { data }) => {
        if (value <= data.start) {
          return "End time must be after start time";
        }
      },
    },
    {
      name: "description",
      type: "textarea", // Assuming 'description' is a text field
      required: true,
    },
    {
      name: "organizer", // required
      type: "relationship", // required
      relationTo: "users", // required
      hasMany: false,
    },
    {
      name: "url",
      type: "text", // Assuming 'description' is a text field
      validate: validateURLField,
    },
    {
      name: "location",
      type: "text", // Assuming 'description' is a text field
      required: true,
      label: "Address/Location",
    },
    {
      name: "coordinates",
      type: "point",
      label: "Coordinates",
    },
    {
      name: "group",
      label: "Group",
      type: "relationship",
      relationTo: "groups",
      required: true,
      // If user is not admin, set the site by default
      // to the first site that they have access to
      defaultValue: ({ user }) => {
        if (!user.roles.includes("admin") && user.group?.[0]) {
          return user.group[0];
        }
      },
    },
  ],
};
