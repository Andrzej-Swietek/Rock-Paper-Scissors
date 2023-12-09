import {ReactNode} from "react";

export type GameModeSliderItem =
    { id: string, type: 'normal', name: string, description: string,  screen: string, image: string, goTo: ()=> void, cardContent?: ReactNode }
    | { id: string, type: 'spacer' };