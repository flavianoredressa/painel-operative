import { animate, state, style, transition, trigger } from '@angular/animations';

export const sideBarOpenClose = trigger('openClose', [
  state(
    'open',
    style({
      position: '{{position}}'
    }),
    {
      params: {
        position: 'initial'
      }
    }
  ),
  transition('* => closed', [animate(400)])
]);
