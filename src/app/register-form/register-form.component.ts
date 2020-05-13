import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.ShadowDom
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
