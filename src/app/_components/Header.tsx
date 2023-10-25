// Header.js

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Index</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link
              href={`webcal://${process.env.PAYLOAD_PUBLIC_SERVER_URL}/cal`}
            >
              Add calendar
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
