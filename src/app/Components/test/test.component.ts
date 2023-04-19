import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//@NgModule({ imports: [ CommonModule ] })

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  num:number[]=[1,2,3,4,5];
}
