export type GameModeSliderItem =
    { id: string, type: 'normal', name: string, description: string,  screen: string, image: string, goTo: ()=> void }
    | { id: string, type: 'spacer' };