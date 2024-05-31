import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export const getRouterParam = (param: string) => inject(ActivatedRoute).snapshot.paramMap.get(param);
