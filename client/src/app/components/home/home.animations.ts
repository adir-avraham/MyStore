import { trigger, transition, style, animate } from '@angular/animations';

export const fade = trigger('fade', [ 
    transition('void => *', [
      style({ opacity: 0 }), 
      animate(2000, style({opacity: 1}))
    ]) 
])