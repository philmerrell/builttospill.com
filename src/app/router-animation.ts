import { trigger, state, style, transition, animate } from '@angular/core';

export function routerAnimation() {
  return trigger('routerAnimation', [
    state('void', style({ position: 'fixed', width: '100%'}) ),
    state('*', style({ position: 'relative', width: '100%'}) ),
    transition(':enter', [
      style({opacity: 0, transform: 'translate3d(0, 15px, 0)'}),
      animate('0.5s ease-in-out', style({opacity: 1, transform: 'translate3d(0, 0, 0)'}))
    ]),
    transition(':leave', [
      style({opacity: 1, transform: 'translate3d(0, 0, 0)'}),
      animate('0.2s ease-in-out', style({opacity: 0, transform: 'translate3d(0, 15px, 0)'}))
    ])
  ]);
}
