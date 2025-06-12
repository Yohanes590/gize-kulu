import "./globals.css";
import Head from "next/head";

 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="description" content="Manage your time wisely with Gize Kulu" />
      </Head>
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: 'Gize Kulu',
  description: 'Task Management App',
  icons: {
    icon: '/icon.ico',
  },
};
