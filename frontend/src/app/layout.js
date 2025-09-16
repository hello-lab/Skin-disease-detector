"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme,ThemePanel ,TabNav,Flex} from "@radix-ui/themes";
import { usePathname } from 'next/navigation';
import NextLink from "next/link";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">

      <body
        className={``}
      >
        		<ThemeProvider attribute="class">

                     <Theme accentColor="gold" grayColor="sand" radius="large" scaling="105%">

          <Flex direction="column" gap="4" pb="0">
          <TabNav.Root size="3" color="accent">
            <TabNav.Link asChild active={pathname === "/"}>
		<NextLink href="/">Home</NextLink>
	</TabNav.Link>
	<TabNav.Link asChild active={pathname === "/predict"}>
		<NextLink href="/predict">Predict Skin Disease</NextLink>
	</TabNav.Link>
	<TabNav.Link asChild active={pathname === "/doctor"}>
		<NextLink href="/doctor">Doctors Near Me</NextLink>
	</TabNav.Link>
  <TabNav.Link asChild active={pathname === "/chatbot"}>
		<NextLink href="/chatbot">Chatbot</NextLink>
	</TabNav.Link>
          </TabNav.Root>
        </Flex>
        {children}
      </Theme>
      </ThemeProvider>
        
      </body>
    </html>
  );
}
