import express from "express";
import { createEvents } from "ics";
import { DateTime } from "luxon"; // Import DateTime from Luxon
import { v4 as uuidv4 } from "uuid";

import { getPayloadClient } from "../getPayload";

const calRouter = express.Router();

calRouter.get("/", async (req, res) => {
  const group = req.query.group;

  const query = group
    ? {
        collection: "events",
        where: {
          "group.slug": {
            equals: group,
          },
          _status: {
            equals: "published",
          },
        },
        limit: 300,
      }
    : {
        collection: "events",
        where: {
          _status: {
            equals: "published",
          },
        },
        limit: 300,
      };

  const payloadClient = await getPayloadClient();
  const events = await payloadClient.find(query);

  function convertToEvents(docs) {
    const now = DateTime.now(); // Use Luxon's DateTime to get the current date and time
    return docs
      .map((doc) => {
        const start = DateTime.fromISO(doc.start).setZone("Europe/Berlin"); // Parse the date string using Luxon
        const end = DateTime.fromISO(doc.end).setZone("Europe/Berlin"); // Parse the date string using Luxon

        if (end >= now) {
          const event = {
            productId: "events/ics",
            uid: uuidv4(),
            startOutputType: "local",
            start: start
              .toFormat("yyyy-M-d-H-m")
              .split("-")
              .map((str) => parseInt(str)),
            end: end
              .toFormat("yyyy-M-d-H-m")
              .split("-")
              .map((str) => parseInt(str)),
            title: doc.title,
            description: doc.description,
            location: doc.location,
            alarms: [
              {
                action: "audio",
                description: "Reminder",
                trigger: { hours: 4, before: true },
                repeat: 2,
                attachType: "VALUE=URI",
                attach: "Glass",
              },
              {
                action: "audio",
                description: "Reminder",
                trigger: { days: 1, before: true },
                repeat: 2,
                attachType: "VALUE=URI",
                attach: "Glass",
              },
            ],
            // organizer: {
            //   name: doc.organizer.firstName,
            //   email: doc.organizer.email,
            // },
            url: `https://animalrightscalendar.org/event/${doc.id}`,
          };

          return event;
        }
        return null;
      })
      .filter((event) => event !== null);
  }

  const icsContent = createEvents(
    convertToEvents(events.docs.filter((doc) => doc._status !== "draft"))
  );

  res.setHeader("Content-Type", "text/calendar");
  res.setHeader("Content-Disposition", "attachment; filename=calendar.ics");

  res.send(icsContent.value);
});

export default calRouter;
