import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from	'@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';


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
        MatTabsModule,
        MatStepperModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatMenuModule,
        MatRippleModule


    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatCardModule,
        MatTabsModule,
        MatStepperModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatDialogModule,
        MatTableModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatMenuModule,
        MatRippleModule
        
        ]
})
export class MaterialModule {

}