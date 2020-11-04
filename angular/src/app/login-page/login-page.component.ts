import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPage implements OnInit {
	registered = false;
	submitted = false;
	userForm: FormGroup;
	guid: string;
	serviceErrors:any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
  	this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      this.guid = data.guid;
    }, error => {
        console.log("There was an error generating the proper GUID on the server", error);
    });
  }


  invalidEmail()
  {
  	return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
  }

  invalidPassword()
  {
  	return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }

  ngOnInit()
  {
  	this.userForm = this.formBuilder.group({
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  	});
  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.userForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
  		let data: any = Object.assign({guid: this.guid}, this.userForm.value);

  		this.http.post('/api/v1/customer/login', data).subscribe((data:any) => {
	      
	      let path = '/user/' + data.customer.uid;

	      this.router.navigate([path]);
	    }, error =>
	    {
	    	this.serviceErrors = error.error.error;
        });

  		this.registered = true;

  	}
  }

};