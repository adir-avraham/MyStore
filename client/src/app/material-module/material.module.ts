import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from	'@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
      ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatStepperModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatMenuModule,
        MatBadgeModule,
        MatButtonToggleModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatStepperModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatMenuModule,
        MatBadgeModule,
        MatButtonToggleModule
        ]
})
export class MaterialModule {

}