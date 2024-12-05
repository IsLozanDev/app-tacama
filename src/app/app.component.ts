import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import TacamaComponent from "./tacama/tacama.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TacamaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-tacama';
}
