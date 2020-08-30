import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
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

  @Input() url = '/private/upload';
  @Input() name = 'uploadFile';
  @Input() fileName: string;
  @Input() accept: string;
  @Input() multiple = false;

  @Output() onUpload = new EventEmitter<FileList>();

  constructor(private http: HttpClient) {
    super();
  }

  onUpdate(files: FileList): void {
    this.onChange(files);
    this.onTouched();

    this.uploadFile(files[0]).subscribe(_ => this.onUpload.emit(files));
  }

  writeValue(value: any): void { }

  onFilesAdded({ target }) {
    const files = { ...target.files };
    this.onUpdate(files);
    target.value = null;
  }

  private uploadFile(file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append(this.name, file, this.fileName || file.name);
    return this.http.post<void>(this.url, formData);
  }
}
