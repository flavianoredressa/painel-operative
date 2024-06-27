import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SettingsItems } from '@core/datas/settings-items';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  settingsItems = SettingsItems;

  ngOnInit(): void {
    console.log(this.settingsItems);
  }
}
