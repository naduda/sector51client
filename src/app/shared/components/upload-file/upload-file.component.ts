import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AValueAccessor } from '../../helpers/abstract.value-accessor';

@Component({
  selector: 'sector-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.sass'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploadFileComponent),
    multi: true,
  }]
})
export class UploadFileComponent extends AValueAccessor {

  @Input() url: string;
  @Input() name: string;
  @Input() fileName: string;
  @Input() accept: string;
  @Input() multiple = false;

  @Output() onSelect = new EventEmitter<FileList>();

  constructor(private http: HttpClient) {
    super();
  }

  onUpdate(files: FileList): void {
    this.onChange(files);
    this.onTouched();
    this.onSelect.emit(files);
  }

  writeValue(value: any): void { }

  onFilesAdded({ target }) {
    const files = { ...target.files };
    this.onUpdate(files);
    target.value = null;
  }
}
