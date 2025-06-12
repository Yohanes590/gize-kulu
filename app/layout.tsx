import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="ico" href="/icon.png" />
        <meta name="description" content="Manage your time wisely with Gize Kulu" />
      </head>
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
