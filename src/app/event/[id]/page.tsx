import React from "react";
import { GraphHelpers } from "next/dist/compiled/webpack/webpack";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPayloadClient } from "../../../getPayload";
import { Event, Group } from "../../../payload-types";
import TimeComponent from "./../../_components/TimeComponent"; // Adjust the import path as needed

import "../../style.css";

async function getData(id: string) {
  const payload = await getPayloadClient();

  // Result will be a Post document.
  const event = await payload.findByID({
    collection: "events", // required
    id: id, // required
    depth: 2,
  });

  return event;
}

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getData(params.id);
  const event = result as unknown as Event;

  if (!event) {
    return notFound();
  }

  const eventStart = new Date(event.start);
  const eventEnd = new Date(event.end);

  const Group = event.group as Group;

  const webcal = `webcal://${process.env.PAYLOAD_PUBLIC_SERVER_URL}/cal?group=${Group.slug}`;

  return (
    <section>
      <a href={webcal}>Add calendar with events from @{Group.slug} only</a>
      <h2 itemProp="name headline">{event.title}</h2>
      <p className="meta">
        <TimeComponent
          eventStart={eventStart as Date}
          eventEnd={eventEnd as Date}
          showEnd={true}
          showDetails={true}
        />{" "}
        @ <Link href={`../group/${Group.slug}`}>{Group.slug}</Link>
      </p>
      <span itemProp="articleBody">
        <h3>Location:</h3>
        <p>{event.location}</p>
        <h3>Information:</h3>
        <p>{event.description}</p>
      </span>
    </section>
  );
}
