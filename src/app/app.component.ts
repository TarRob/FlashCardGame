import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;

  title = 'flash-card-game';

  editing = false;
  editingId: number;

  flash = {
    id: 0,
    question: '',
    answer: '',
    show: false,
  };

  flashs;

  flashs$: Observable<IFlash[]>

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
  }

  ngOnInit(): void {
    this.flashs$ = this.flashService.flashs$
  }  

  trackByFlashId(index, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id) {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({ id, flag }) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear() {
    this.flash = {
      id: 0,
      question: '',
      answer: '',
      show: false,
    };
    this.flashForm.reset();
  }
}
