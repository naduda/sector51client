import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sector-file-upload',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadFileComponent),
    multi: true,
  }]
})
export class UploadFileComponent implements ControlValueAccessor {
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;

  @Input() accept: string;
  @Input() multiple = false;
  @Input() openByClick = true;

  private files: FileList | null = null;

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    this.files = event;
    this.onChange(this.files);
    this.onTouched();
  }

  openFileDialog(e): void {
    if (!this.openByClick) {
      return;
    }
    const event = new MouseEvent('click', { bubbles: false });
    this.inputFile.nativeElement.dispatchEvent(event);
  }

  onChange = (_: any) => { };
  onTouched = () => { };
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  writeValue(value: any): void {
    this.files = value;
    if (!value || !value.length) {
      this.inputFile.nativeElement.value = '';
    }
  }
}
