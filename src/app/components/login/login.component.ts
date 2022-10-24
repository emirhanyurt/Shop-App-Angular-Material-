import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide:boolean = true;
  constructor(private spinner:NgxSpinnerService,private authService:AuthService) { }

  ngOnInit(): void {
  }
  
  login(form:any)
  {
    this.authService.login(form)
  }
}
