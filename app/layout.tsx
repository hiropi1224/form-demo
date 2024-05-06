import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
} from "@mantine/core";
import Link from "next/link";

export const metadata = {
  title: "My App",
  description: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Container>
            <Group>
              <Link href="/conform">conformフォーム</Link>
              <Link href="/mantine">mantineフォーム</Link>
            </Group>
            {children}
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
