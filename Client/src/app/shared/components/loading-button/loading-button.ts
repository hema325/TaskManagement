import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.html',
  styleUrl: './loading-button.css',
})
export class LoadingButton {
  public readonly lable = input.required<string>();
  public readonly loading = input.required<boolean>();
  public readonly clicked = output();
  public readonly btnClass = input('btn btn-primary');
}
