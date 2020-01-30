import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'sector-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  private SECTOR_LOCALE = 'sector-locale';

  private languages = [
    { value: 'en' },
    { value: 'ru' },
    { value: 'ua' }
  ];

  languageOptions: SelectItem[];
  selectedLanguage: SelectItem;

  constructor(private translate: TranslateService) {
    this.languageOptions = this.languages
      .map(e => e.value === 'en' ? 'us' : e.value)
      .map(e => ({ value: e === 'us' ? 'en' : e, lable: `https://www.countryflags.io/${e}/flat/32.png` }));
  }

  ngOnInit() {
    const storeLang = this.storeLang;
    this.translate.use(storeLang);
    this.selectedLanguage = this.languageOptions.find(e => e.value === storeLang);
  }

  changeLanguage(lang: string) {
    localStorage.setItem(this.SECTOR_LOCALE, lang);
    this.translate.use(lang);
  }

  private get storeLang(): string {
    return localStorage.getItem(this.SECTOR_LOCALE) || 'en';
  }
}
