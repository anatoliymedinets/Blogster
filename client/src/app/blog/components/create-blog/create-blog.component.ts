import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BlogService } from '@/blog/services/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  form!: FormGroup
  sub?: Subscription;

  constructor(private blogService: BlogService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    this.form.disable()

    const blog = this.form.value;
    this.sub = this.blogService.create(blog).subscribe(
      data =>{        
        this.router.navigate(['/blogs'])
      }
    )
  }

}
