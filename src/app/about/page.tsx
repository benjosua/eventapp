import React from "react";

import "../style.css";

export default async function Page() {
  return (
    <section>
      <h2>How to add the iCal feed to the calendar on my device?</h2>
      <h3>For Mac:</h3>
      <ul>
        <li>
          <p>
            In the Calendar app on your Mac, choose File &gt; New Calendar
            Subscription.
          </p>
        </li>
        <li>
          <p>Enter the calendar&#39;s web address, then click Subscribe.</p>
        </li>
        <li>
          <p>
            Click the Auto-refresh pop-up menu, then choose how often to update
            the calendar.
          </p>
        </li>
      </ul>
      <h3>For iPhone:</h3>
      <ul>
        <li>
          <p>
            Go to Settings &gt; Calendar &gt; Accounts &gt; Add Account &gt;
            Other.
          </p>
        </li>
        <li>
          <p>Tap &quot;Add Subscribed Calendar.&quot;</p>
        </li>
        <li>
          <p>
            Enter the calendar&#39;s web address to subscribe to and any other
            required server information.
          </p>
        </li>
      </ul>
      <h3>For Google Calendar (on the Web):</h3>
      <ul>
        <li>
          <p>On your computer, open Google Calendar.</p>
        </li>
        <li>
          <p>
            On the left, next to &quot;Other calendars,&quot; click &quot;Add
            From URL.&quot;
          </p>
        </li>
        <li>
          <p>Enter the calendar&#39;s web address in the field provided.</p>
        </li>
        <li>
          <p>Click &quot;Add calendar.&quot;</p>
        </li>
        <li>
          <p>Copy the iCal feed address.</p>
        </li>
      </ul>
      <h3>For Android:</h3>
      <ul>
        <li>
          <p>Follow the instructions for Google Calendar from a computer.</p>
        </li>
        <li>
          <p>On your phone, open the Google Calendar app.</p>
        </li>
        <li>
          <p>Open the menu, then go to Settings.</p>
        </li>
        <li>
          <p>Scroll to the calendar email where you added the new iCal feed.</p>
        </li>
        <li>
          <p>Tap &quot;Show more.&quot;</p>
        </li>
        <li>
          <p>Tap on your new calendar&#39;s name.</p>
        </li>
        <li>
          <p>Switch the Sync option on.</p>
        </li>
        <li>
          <p>
            You may also change your notifications for this calendar on this
            screen.
          </p>
        </li>
      </ul>
      <h3>For Outlook.com:</h3>
      <ul>
        <li>
          <p>Sign in to Outlook.com.</p>
        </li>
        <li>
          <p>At the bottom of the page, select the calendar icon.</p>
        </li>
        <li>
          <p>In the navigation pane, select &quot;Import calendar.&quot;</p>
        </li>
        <li>
          <p>
            Under &quot;Import calendar,&quot; select &quot;From the web.&quot;
          </p>
        </li>
        <li>
          <p>
            Under &quot;Link to the calendar,&quot; copy the calendar&#39;s web
            address.
          </p>
        </li>
        <li>
          <p>Select &quot;Import.&quot;</p>
        </li>
      </ul>
    </section>
  );
}
