import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"SlotSweep — podcast archive leak report",description:"A fictional interactive prototype for prioritizing stale podcast sponsor reads."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
