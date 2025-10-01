import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightPageComponent } from './flight-page/flight-page.component';
import { FormComponent } from './form/form.component';
import { TicketComponent } from './ticket/ticket.component';

export const routes: Routes = [
    {
        path: '',
        component: FormComponent
    },
    {
        path: 'flight-page',
        component: FlightPageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'ticket',
        component: TicketComponent
    }
];
