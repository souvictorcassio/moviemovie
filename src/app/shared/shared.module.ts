import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { FormatDatePipe } from '../pipes/format-date.pipe';
import { LimitMoviesPipe } from '../pipes/limit-movies.pipe';

@NgModule({
  declarations: [
    TruncatePipe,
    SafePipe,
    FormatDatePipe,
    LimitMoviesPipe 
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    TruncatePipe,
    SafePipe,
    FormatDatePipe,
    LimitMoviesPipe
  ]
})
export class SharedModule {}
