import { Component, OnInit } from '@angular/core';

import { BlogService } from '@/blog/services/blog.service';

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {

  blogs: any

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAll().subscribe(data => {
      this.blogs = data
    })
  }

}
