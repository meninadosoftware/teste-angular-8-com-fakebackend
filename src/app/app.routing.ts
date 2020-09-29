import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
 


    // volta para o inicio
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);