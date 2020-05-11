import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() buttonlabel: string = "Register";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log("Label changed: ", this.buttonlabel);
  }

}
