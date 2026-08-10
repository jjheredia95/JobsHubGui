import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue'
import CategoryList from '../components/pages/categories/CategoryList.vue'
import CategoryForm from '../components/pages/categories/CategoryForm.vue'
import VacancyAdminList from '../components/pages/vacancies/VacancyAdminList.vue'
import VacancyForm from '../components/pages/vacancies/VacancyForm.vue'
import VacancyDetails from '../components/pages/vacancies/VacancyDetails.vue'
import CompanyList from "../components/pages/companies/CompanyAdminList.vue"
import CompanyForm from "../components/pages/companies/CompanyForm.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/categories', component: CategoryList },
  { path: '/categories/new', component: CategoryForm },
  { path: '/categories/edit/:id', component: CategoryForm },
  { path: '/vacancies', component: VacancyAdminList },
  { path: '/vacancies/new', component: VacancyForm },
  { path: '/vacancies/edit/:id', component: VacancyForm },
  { path: '/vacancies/details/:id', component: VacancyDetails },
  { path: "/companies", component: CompanyList },
  {path: "/companies/new", component: CompanyForm},
  {path: "/companies/edit/:id", component: CompanyForm}
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
