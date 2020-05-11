import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() buttonlabel: string = "Login";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Label changed: ", this.buttonlabel);
  }

}
