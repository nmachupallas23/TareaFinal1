import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Contacto } from './contacto/contacto';
import { Administracion } from './administracion/administracion';

export const routes: Routes = [
    {
        path: '',
        component:Inicio,
        title: 'Inicio'
    },
    {
        path: 'contacto',
        component:Contacto,
        title: 'Contacto'
    },
    {
        path: 'administrar',
        component: Administracion,
        title: 'Administración'
    }
];
