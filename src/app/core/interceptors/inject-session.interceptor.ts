import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler)  {
    try {
      //debugger
      const token = this.cookieService.get('token')
      console.log('token',token);
      let newRequest = request
      newRequest = request.clone(
        {
          setHeaders: {
            authorization: `Bearer ${token}`,
            CUSTOM_HEADER: 'HOLA'
          }
        }
      )

      return next.handle(newRequest);

    } catch (e) {
      console.log('🔴🔴🔴 Ojito error', e)
      return next.handle(request);
    }
  }
}