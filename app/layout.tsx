import "@mantine/core/styles.css";

import {
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
} from "@mantine/core";
import Link from "next/link";
import { Toaster } from "sonner";

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
              <Link href="/use-effect">useEffectフォーム</Link>
            </Group>
            {children}
            <Toaster />
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
