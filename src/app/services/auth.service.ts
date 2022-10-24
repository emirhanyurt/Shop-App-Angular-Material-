
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth:boolean = false
  constructor(private toastr:ToastrService,private router:Router,private httpClinet:HttpClient,@Inject("apiUrl") private apiUrl:string) { }

  isAuthenticated():boolean{
    if(localStorage.getItem("Token")){
      return true
    }
    else{
      return false
    }
  }
  login(form:any)
  {
      let api = this.apiUrl + "users/login"
      let loginModel: {email: string, password:string}
      
      loginModel = form;
      
      
      this.httpClinet.post(api,loginModel).subscribe((res:any)=>{
        localStorage.setItem("Token", res.data.token)
        this.isAuth = true
        this.router.navigate(["/"])
        return true
      },(err)=>{
        this.toastr.error("Bilgiler Hatalı")
        
        return false
      })

  }
  logout(){
    localStorage.clear()
    this.isAuth = false
    this.router.navigate(["/"])
    this.toastr.info("Çıkış Yapıldı")
  }

}
