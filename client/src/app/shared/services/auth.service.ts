import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get('/api/auth/current_user')
  }
}