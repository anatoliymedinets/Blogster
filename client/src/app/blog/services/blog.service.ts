import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BlogService {
  constructor(private http: HttpClient){}

  getAll(): Observable<any> {
    return this.http.get('/api/blogs')
  }

  create(blog: any): Observable<any> {
    return this.http.post('/api/blogs', blog)
  }
}