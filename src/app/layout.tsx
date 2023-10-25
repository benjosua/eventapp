export const metadata = {
  title: "Events Calendar",
  description: "A calendar of events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="7154a7f7-f43d-4eb6-98fc-296c378869c9"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
