import React from "react";
import dotenv from "dotenv";
import { DateTime } from "luxon";
import { notFound } from "next/navigation";
import path from "path";

import { getPayloadClient } from "../getPayload";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import Footer from "./_components/Footer";
import Header from "./_components/Header";
import TimeComponent from "./_components/TimeComponent"; // Adjust the import path as needed

import "./style.css";

export const dynamic = "force-dynamic";

async function getData() {
  const payload = await getPayloadClient();

  const events = await payload.find({
    collection: "events",
    where: {
      _status: {
        equals: "published",
      },
    },
    sort: "start",
    limit: 250,
  });

  return events;
}

export default async function Home() {
  const { docs } = await getData();

  const currentDateTime = DateTime.now();

  // Filter out events that have already ended
  const filteredEvents = docs.filter((event) => {
    const eventEndDateTime = DateTime.fromISO(event.end);
    return eventEndDateTime >= currentDateTime;
  });

  if (!docs) {
    return notFound();
  }
  return (
    <main>
      <Header />
      <hr />
      <section>
        <ul className="posts">
          {filteredEvents.map((post, index) => (
            <li key={index} itemType="https://schema.org/BlogPosting">
              <a
                href={"/event/" + post.id}
                title={post.title as string}
                itemProp="name url"
              >
                {post.title as string}
              </a>
              <hr />
              <TimeComponent
                eventStart={new Date(post.start as string)}
                eventEnd={new Date(post.end as string)}
                showEnd={false}
                showDetails={false}
              />
            </li>
          ))}
        </ul>
      </section>
      <hr />
      <Footer />
    </main>
  );
}
