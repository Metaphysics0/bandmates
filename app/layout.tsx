import { useRouter } from "next/router"
import NavBar from "../ui/NavBar"
import WavyNav from "../ui/WavyNav"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <NavBar />
        {children}
        </body>
    </html>
  )
}
