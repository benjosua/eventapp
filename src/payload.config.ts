import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

import AfterDashboard from "./app/_components/AfterDashboard";
import { ContactRequests } from "./collections/ContactRequests";
import { Events } from "./collections/Events";
import { Groups } from "./collections/Groups";
import { Users } from "./collections/Users";
import Icon from "./graphics/Icon";
import Logo from "./graphics/Logo";

export default buildConfig({
  admin: {
    indexHTML: path.resolve(__dirname, "app", "index.html"),
    bundler: webpackBundler(),
    user: Users.slug,
    meta: {
      titleSuffix: "- ARC",
      favicon: "/assets/favicon.svg",
      ogImage: "/assets/logo.svg",
    },
    components: {
      // views: {
      //   // Dashboard: CustomDashboardView,
      //   // Account: CustomAccountView,
      //   CustomDefaultRoute: {
      //     path: "/event-registration",
      //     Component: eventRegistration,
      //   },
      // },
      afterDashboard: [AfterDashboard],
      graphics: {
        Logo,
        Icon,
      },
    },
  },
  collections: [ContactRequests, Events, Groups, Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
});
