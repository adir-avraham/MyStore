import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

export const cardAnimation =  trigger('cardAnimation', [
    transition('* => *', [
      query(':enter', style({ opacity: 0 }), { optional: true }),
      query(':enter', stagger('300ms', [
        animate('.5s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
          style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))]), { optional: true })
    ])
]);