import {Montserrat} from "next/font/google";
import {ReactNode} from "react";
import {NextFont} from "next/dist/compiled/@next/font";

const montserrat: NextFont = Montserrat({
    weight: ["300", "400", "500", "700", "900"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});

export default function ThemeRegistry({children}:{children: ReactNode}) {
    // TODO: Add theme context / wrapper
    return (
        <>
            {children}
        </>
    )
}
