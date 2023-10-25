import React from "react";

import { getPayloadClient } from "../../../getPayload";
import TimeComponent from "../../_components/TimeComponent"; // Adjust the import path as needed

import "../../style.css";

async function getData(slug: string) {
  const payload = await getPayloadClient();

  const events = await payload.find({
    collection: "events",
    where: {
      "group.slug": {
        equals: slug,
      },
      _status: {
        equals: "published",
      },
    },
    sort: "start",
  });

  return events;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { docs } = await getData(params.slug);
  const webcal = `webcal://${process.env.PAYLOAD_PUBLIC_SERVER_URL}/cal?group=${params.slug}`;

  return (
    <section>
      <a href={webcal}>Add calendar with events from @{params.slug} only</a>
      <ul className="posts">
        {docs.map((post, index) => (
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
              eventStart={new Date(post.start as Date)}
              eventEnd={new Date(post.end as Date)}
              showEnd={false}
              showDetails={true}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
