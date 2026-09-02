<script setup>
import "../../assets/css/Home.css"
import { onMounted, reactive, ref, computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Pagination from '../common/Pagination.vue'

// ── Config ─────────────────────────────────────────────
const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// ── Router ─────────────────────────────────────────────
const route  = useRoute()
const router = useRouter()

// ── State ──────────────────────────────────────────────
const vacancies      = ref([])
const totalPages     = ref(0)
const totalElements  = ref(0)
const currentPage    = ref(0)
const loading        = ref(false)
const error          = ref(false)
const errorMessage   = ref('')
const pageSize       = 4
const locOpen        = ref(false)
const filtersOpen    = ref(false)
const locQuery       = ref('')          // texto visible en el input
const locInput       = ref(null)

// Catálogos que vienen del backend (con sus IDs reales)
const categories = ref([])              // [{ id, name }]
const locations  = ref([])              // [{ id, city, state }]

// Los filtros ahora guardan IDs, no texto libre
const filters = reactive({
  search:         '',
  locationId:     null,
  categoryId:     null,
  workMode:       '',
  employmentType: '',
})

const stats = reactive({
  totalJobs:       0,
  totalCompanies:  0,
  totalCategories: 0,
})

// ── Opciones de enum — deben coincidir EXACTO con el backend ──
// WorkMode: REMOTE, ONSITE, HYBRID
const workModeOptions = [
  { value: '',       label: 'All' },
  { value: 'REMOTE', label: '🏠 Remote' },
  { value: 'ONSITE', label: '🏢 On-site' },
  { value: 'HYBRID', label: '🔀 Hybrid' },
]

// EmploymentType: FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP, TEMPORARY
const employmentOptions = [
  { value: '',           label: 'All' },
  { value: 'FULL_TIME',  label: '⏱ Full-time' },
  { value: 'PART_TIME',  label: '🕐 Part-time' },
  { value: 'CONTRACT',   label: '📋 Contract' },
  { value: 'INTERNSHIP', label: '🎓 Internship' },
  { value: 'TEMPORARY',  label: '📆 Temporary' },
]

// Categorías: se arman desde la API para tener los IDs reales
const categoryOptions = computed(() => [
  { value: null, label: 'All' },
  ...categories.value.map(c => ({ value: c.id, label: c.name })),
])

// ── Autocompletado de ubicación (sobre datos propios) ──
const DEFAULT_LOC_COUNT = 8

function locLabel(loc) {
  return loc.state ? `${loc.city}, ${loc.state}` : loc.city
}

const suggestions = computed(() => {
  const q = locQuery.value.trim().toLowerCase()
  if (!q) return locations.value.slice(0, DEFAULT_LOC_COUNT)
  return locations.value
      .filter(l => locLabel(l).toLowerCase().includes(q))
      .slice(0, DEFAULT_LOC_COUNT)
})

function onLocFocus() { locOpen.value = true }

function onLocInput(e) {
  locQuery.value = e.target.value
  // Si el usuario edita el texto, el ID anterior deja de ser válido
  filters.locationId = null
  locOpen.value = true
}

function onLocBlur() {
  setTimeout(() => { locOpen.value = false }, 160)
}

function selectLocation(loc) {
  filters.locationId = loc.id
  locQuery.value     = locLabel(loc)
  locOpen.value      = false
  resetToFirstPage()
}

function clearLocation() {
  filters.locationId = null
  locQuery.value     = ''
  resetToFirstPage()
}

// ── Filtros ────────────────────────────────────────────
function toggleFilters() { filtersOpen.value = !filtersOpen.value }

function setFilter(key, value) {
  filters[key] = value
  resetToFirstPage()       // aplicar de inmediato y volver a página 1
}

const hasActiveFilters = computed(() =>
    !!filters.search || filters.categoryId !== null || filters.locationId !== null
    || !!filters.workMode || !!filters.employmentType
)

function clearAllFilters() {
  filters.search         = ''
  filters.categoryId     = null
  filters.locationId     = null
  filters.workMode       = ''
  filters.employmentType = ''
  locQuery.value         = ''
  resetToFirstPage()
}

// ── Helpers de la tarjeta ──────────────────────────────
const GRADIENTS = [
  'linear-gradient(135deg,#6366F1,#8B5CF6)',
  'linear-gradient(135deg,#0EA5E9,#0284C7)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#F43F5E,#E11D48)',
  'linear-gradient(135deg,#8B5CF6,#6D28D9)',
]

function logoGradient(vacancy) {
  return GRADIENTS[(vacancy.id ?? 0) % GRADIENTS.length]
}

function vacancyInitial(vacancy) {
  return (vacancy.name || '?')[0].toUpperCase()
}

// El DTO manda category como String plano
function vacancyCategory(vacancy) {
  return vacancy.category || 'General'
}

// Etiquetas legibles para los enums del backend
const WORK_MODE_LABELS = {
  REMOTE: 'Remote',
  ONSITE: 'On-site',
  HYBRID: 'Hybrid',
}

const EMPLOYMENT_LABELS = {
  FULL_TIME:  'Full-time',
  PART_TIME:  'Part-time',
  CONTRACT:   'Contract',
  INTERNSHIP: 'Internship',
  TEMPORARY:  'Temporary',
}

function workModeLabel(vacancy) {
  return WORK_MODE_LABELS[vacancy.workMode] || null
}

function employmentLabel(vacancy) {
  return EMPLOYMENT_LABELS[vacancy.employmentType] || null
}

function workModeBadgeClass(vacancy) {
  switch (vacancy.workMode) {
    case 'REMOTE': return 'badge-wm-remote'
    case 'HYBRID': return 'badge-wm-hybrid'
    default:       return 'badge-wm-onsite'
  }
}

// locations llega como List<LocationDto> => [{ id, city, state }]
function vacancyLocations(vacancy) {
  if (!Array.isArray(vacancy.locations)) return []
  return vacancy.locations.map(locLabel)
}

// VacancyStatus: PUBLISHED, OPEN, CLOSED
const STATUS_LABELS = {
  PUBLISHED: 'Published',
  OPEN:      'Open',
  CLOSED:    'Closed',
}

function statusLabel(vacancy) {
  return STATUS_LABELS[vacancy.status] || vacancy.status || ''
}

function statusClass(vacancy) {
  return vacancy.status === 'CLOSED' ? 'status-closed' : 'status-open'
}

function vacancyDaysAgo(vacancy) {
  const d = vacancy.publishedDate
  if (!d) return ''
  const diff = Math.floor((Date.now() - new Date(d)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return `${diff} days ago`
}

// ── API ────────────────────────────────────────────────
async function loadData(page = 0) {
  loading.value      = true
  error.value        = false
  errorMessage.value = ''
  try {
    const params = new URLSearchParams({ page, size: pageSize })

    // Nombres EXACTOS del HomeController
    if (filters.search)             params.append('search',         filters.search)
    if (filters.categoryId !== null) params.append('categoryId',     filters.categoryId)
    if (filters.locationId !== null) params.append('locationId',     filters.locationId)
    if (filters.workMode)           params.append('workMode',       filters.workMode)
    if (filters.employmentType)     params.append('employmentType', filters.employmentType)

    const res = await fetch(`${API}/api/home?${params}`)

    if (!res.ok) {
      // El backend responde 400 con el mensaje de BadRequestException
      let msg = 'Could not load vacancies. Please try again.'
      try {
        const body = await res.json()
        if (body?.message) msg = body.message
      } catch { /* respuesta sin cuerpo JSON */ }
      throw new Error(msg)
    }

    const data = await res.json()
    vacancies.value     = data.content ?? []
    totalPages.value    = data.totalPages ?? 0
    totalElements.value = data.totalElements ?? 0
    currentPage.value   = data.number ?? 0

    // El contador global solo tiene sentido sin filtros aplicados
    if (!hasActiveFilters.value) stats.totalJobs = data.totalElements ?? 0
  } catch (e) {
    error.value        = true
    errorMessage.value = e.message || 'Could not load vacancies. Please try again.'
    vacancies.value    = []
  } finally {
    loading.value = false
  }
}

async function loadCategories() {
  try {
    const res = await fetch(`${API}/api/categories`)
    if (!res.ok) return
    const data = await res.json()
    categories.value      = Array.isArray(data) ? data : []
    stats.totalCategories = categories.value.length
  } catch { /* las píldoras quedan solo con "All" */ }
}

async function loadLocations() {
  try {
    const res = await fetch(`${API}/api/locations`)
    if (!res.ok) return
    const data = await res.json()
    locations.value = Array.isArray(data) ? data : []
  } catch { /* el autocompletado queda vacío */ }
}

async function loadCompanyCount() {
  try {
    const res = await fetch(`${API}/api/companies`)
    if (!res.ok) return
    const data = await res.json()
    stats.totalCompanies = Array.isArray(data) ? data.length : (data.totalElements ?? 0)
  } catch { /* silencioso */ }
}

// ── Paginación vía URL ─────────────────────────────────
// La página vive en la query string (?page=2). Así el logo de JobsHub
// ("/") es una ruta distinta y el botón atrás del navegador funciona.
function pageFromRoute() {
  const n = Number(route.query.page)
  return Number.isFinite(n) && n > 1 ? n - 1 : 0
}

function onPageChange(page) {
  router.push({ query: { ...route.query, page: page > 1 ? page : undefined } })
}

// Vuelve a la página 1. Si no hay ?page en la URL, router.push no
// dispararía el watcher, así que se recarga directamente.
function resetToFirstPage() {
  if (route.query.page) router.push({ query: { ...route.query, page: undefined } })
  else loadData(0)
}

watch(() => route.query.page, () => {
  loadData(pageFromRoute())
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  loadData(pageFromRoute())
  loadCategories()
  loadLocations()
  loadCompanyCount()
})
</script>

<template>

  <!-- ══════════════════════════════════════
       HERO
  ══════════════════════════════════════ -->
  <section class="hero">
    <div class="container" style="max-width:1320px;">
      <div class="row g-4">

        <!-- TOP: Title -->
        <div class="col-12 text-center">
          <h1>Find the job you're  <em>looking for.</em></h1>
        </div>

        <!-- BELOW: Search + Filters -->
        <div class="col-12 hero-search-wrap">

          <!-- Search box -->
          <div class="search-box" :class="{ 'loc-open': locOpen }">
            <div class="d-flex align-items-center gap-2 flex-wrap flex-lg-nowrap">

              <!-- Keyword — fixed half -->
              <div class="search-keyword">
                <input
                    v-model="filters.search"
                    type="text"
                    class="search-input form-control"
                    placeholder="keyword or company"
                    @keyup.enter="resetToFirstPage()"
                />
              </div>

              <div class="search-divider d-none d-lg-flex"></div>

              <!-- Location — takes remaining space -->
              <div class="search-location loc-wrapper">
                <div class="loc-input-wrap">
                  <svg class="loc-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <input
                      ref="locInput"
                      type="text"
                      class="loc-text-input"
                      placeholder="Location"
                      autocomplete="off"
                      :value="locQuery"
                      @input="onLocInput"
                      @focus="onLocFocus"
                      @blur="onLocBlur"
                  />
                </div>
              </div>

              <!-- Search button -->
              <button class="btn-search d-flex align-items-center gap-2" @click="resetToFirstPage()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>

            <!-- Dropdown: direct child of search-box → inherits full width -->
            <div class="loc-dropdown" :class="{ open: locOpen }">
              <div v-if="suggestions.length === 0" class="loc-option text-muted">
                No matching locations
              </div>
              <div
                  v-for="loc in suggestions"
                  :key="loc.id"
                  class="loc-option"
                  @mousedown.prevent="selectLocation(loc)"
              >
                <svg v-if="loc.city === 'Remote'" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {{ locLabel(loc) }}
              </div>
            </div>
          </div>

          <!-- Filters toggle -->
          <div class="mt-3 text-center">
            <button class="btn-filters" :class="{ open: filtersOpen }" @click="toggleFilters">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filters
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                   :style="{ transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .25s' }">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>

          <!-- Collapsible filter panel -->
          <div class="filters-panel" :class="{ open: filtersOpen }">
            <div class="filters-panel-inner">

              <!-- Category -->
              <div class="filter-row">
                <span class="filter-label">Category:</span>
                <button
                    v-for="opt in categoryOptions" :key="opt.value"
                    class="f-pill" :class="{ active: filters.categoryId === opt.value }"
                    @click="setFilter('categoryId', opt.value)"
                >{{ opt.label }}</button>
              </div>

              <!-- Work Mode -->
              <div class="filter-row mt-2">
                <span class="filter-label">Work mode:</span>
                <button
                    v-for="opt in workModeOptions" :key="opt.value"
                    class="f-pill" :class="{ active: filters.workMode === opt.value }"
                    @click="setFilter('workMode', opt.value)"
                >{{ opt.label }}</button>
              </div>

              <!-- Employment -->
              <div class="filter-row mt-2">
                <span class="filter-label">Employment:</span>
                <button
                    v-for="opt in employmentOptions" :key="opt.value"
                    class="f-pill" :class="{ active: filters.employmentType === opt.value }"
                    @click="setFilter('employmentType', opt.value)"
                >{{ opt.label }}</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════
       STATS STRIP
  ══════════════════════════════════════ -->
  <div class="stats-strip">
    <div class="container" style="max-width:900px;">
      <div class="row g-0">
        <div class="col-6 col-md-3 stats-item">
          <div class="stats-num">{{ stats.totalJobs }}<span>+</span></div>
          <div class="stats-label">Open positions</div>
        </div>
        <div class="col-6 col-md-3 stats-item">
          <div class="stats-num">{{ stats.totalCompanies }}<span>+</span></div>
          <div class="stats-label">Companies hiring</div>
        </div>
        <div class="col-6 col-md-3 stats-item">
          <div class="stats-num">{{ stats.totalCategories }}</div>
          <div class="stats-label">Job categories</div>
        </div>
        <div class="col-6 col-md-3 stats-item" style="border-right:none;">
          <div class="stats-num">4.8<span>★</span></div>
          <div class="stats-label">Avg. employer rating</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════
       FEATURED VACANCIES
  ══════════════════════════════════════ -->
  <main class="container py-4" style="max-width:900px;">

    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="section-title mb-0">
        <span class="section-bar"></span>{{ hasActiveFilters ? 'Results' : 'Featured' }}
        <span class="badge-count ms-2">{{ totalElements }} vacancies</span>
      </h2>
      <RouterLink to="/vacancies/list" class="link-viewall">View all →</RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" style="color:#6366F1;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Empty -->
    <div v-else-if="vacancies.length === 0" class="text-center py-5 text-muted">
      No vacancies found with those filters.
      <div v-if="hasActiveFilters" class="mt-2">
        <button class="btn btn-sm btn-outline-secondary" @click="clearAllFilters">Clear filters</button>
      </div>
    </div>

    <!-- Cards -->
    <div v-else class="d-flex flex-column gap-3">
      <RouterLink
          v-for="vacancy in vacancies"
          :key="vacancy.id"
          :to="`/vacancies/details/${vacancy.id}`"
          class="job-card card border p-3"
      >
        <div class="d-flex align-items-start gap-3">

          <!-- Logo -->
          <div class="company-logo" :style="{ background: logoGradient(vacancy) }">
            {{ vacancyInitial(vacancy) }}
          </div>

          <!-- Body -->
          <div class="flex-fill">
            <div class="d-flex flex-wrap gap-1 mb-2">
              <span class="jh-badge badge-cat">{{ vacancyCategory(vacancy) }}</span>
              <span v-if="vacancy.featured" class="jh-badge badge-feat">Featured</span>
              <span v-if="workModeLabel(vacancy)" class="jh-badge" :class="workModeBadgeClass(vacancy)">{{ workModeLabel(vacancy) }}</span>
              <span v-if="employmentLabel(vacancy)" class="jh-badge badge-emp">{{ employmentLabel(vacancy) }}</span>
            </div>

            <div class="job-title">{{ vacancy.name }}</div>

            <div class="d-flex flex-wrap gap-3 mt-1">
              <span v-if="vacancyLocations(vacancy).length" class="job-meta-item">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {{ vacancyLocations(vacancy).join(', ') }}
              </span>
              <span class="d-flex align-items-center gap-1" :class="statusClass(vacancy)">
                <span class="status-dot"></span>{{ statusLabel(vacancy) }}
              </span>
            </div>

            <div class="job-desc">
              {{ vacancy.description || 'No description available.' }}
            </div>
          </div>

          <!-- Right -->
          <div class="d-none d-md-flex flex-column align-items-end gap-2 flex-shrink-0">
            <span class="btn-view">View details →</span>
            <span class="job-date">{{ vacancyDaysAgo(vacancy) }}</span>
          </div>

        </div>
      </RouterLink>
    </div>

    <!-- Pagination -->
    <Pagination
        v-if="totalPages > 1"
        :current-page="currentPage + 1"
        :total-pages="totalPages"
        @page-change="onPageChange"
    />

  </main>

</template>