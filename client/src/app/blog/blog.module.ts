import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { ListBlogComponent } from './components/list-blog/list-blog.component'
import { CreateBlogComponent } from './components/create-blog/create-blog.component'
import { BlogService } from './services/blog.service'

const routes: Routes = [
  { path: 'blogs', component: ListBlogComponent },
  { path: 'new', component: CreateBlogComponent },
]

@NgModule({
  declarations: [ListBlogComponent, CreateBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [BlogService],
})
export class BlogModule { }
