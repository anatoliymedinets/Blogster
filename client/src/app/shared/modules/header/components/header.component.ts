import { Component, OnInit } from '@angular/core';

import { AuthService } from '@/shared/services/auth.service';
import { CurrentUser } from '@/shared/types/current-user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: CurrentUser | null = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void {
    this.authService.getCurrentUser().subscribe(data => {
      if(data) {
        this.user = data
        console.log(this.user)
      }
    })
  }
}
