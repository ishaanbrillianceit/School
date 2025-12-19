import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Admission } from './features/admission/admission';
import { Events } from './features/events/events';
import { Gallery } from './features/gallery/gallery';
import { Teachers } from './features/teachers/teachers';
import { Contact } from './pages/contact/contact';
import { About } from './pages/about/about';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Disclaimer } from './pages/disclaimer/disclaimer';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Notices } from './features/notices/notices';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "admission", component: Admission},
    {path: "notice", component: Notices},
    {path: "event", component: Events},
    {path: "gallery", component: Gallery},
    {path: "teacher", component: Teachers},
    {path: "contact-us", component: Contact},
    {path: "about-us", component: About},
    {path: "privacy-policy", component: PrivacyPolicy},
    {path: "disclaimer", component: Disclaimer},
    {path: "dashboard", component: Dashboard, canActivate: [authGuard]},
    {path: "login", component: Login, canActivate: [loginGuard]},
    {path: "**", component: Home},
];
