<script setup>
import "../../../assets/css/VacancyAdminList.css";
import { ref, onMounted } from "vue";
import Pagination from "../../common/Pagination.vue";

// API DATA
const vacancies = ref([]);

// LOADING STATES
const loading = ref(true);
const error = ref("");

// PAGINATION STATE VARIABLES
const currentPage = ref(0);
const totalPages = ref(0);
const totalElements = ref(0);
const pageSize = ref(10);

async function loadVacancies(page = 0, size = pageSize.value) {
  error.value = "";

  try {
    const response = await fetch(
      `http://localhost:8080/api/vacancies/admin?page=${page}&size=${size}`,
    );

    if (!response.ok) {
      throw Error("Could not load Vacancies");
    }

    const data = await response.json();
    vacancies.value = data.content;
    totalElements.value = data.totalElements;
    totalPages.value = data.totalPages;
    currentPage.value = data.number;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadVacancies();
});

function formatDate(dateString) {
  if (!dateString) {
    return "TBA";
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
</script>

<template>
  <!-- ── PAGE HEADER ── -->
  <div class="page-header">
    <div class="container" style="max-width: 1100px">
      <div class="breadcrumb-custom">
        <i class="fa-solid fa-briefcase"></i>
        Vacancies
      </div>

      <h1 class="page-title">Vacancy List</h1>

      <p class="page-subtitle">
        Review published opportunities and keep openings current for candidates.
      </p>

      <RouterLink class="btn-new" to="/vacancies/new">
        <i class="fa-solid fa-plus"></i>
        New Vacancy
      </RouterLink>
    </div>
  </div>

  <!-- ── FILTERS ── -->
  <section class="container py-4" style="max-width: 1100px">
    <div class="card filter-card mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <!-- Search by name -->
          <div class="col-12 col-md-3">
            <label class="form-label small text-muted"> Search </label>

            <input
              type="text"
              class="form-control"
              placeholder="Search by vacancy name..."
            />
          </div>

          <!-- Company dropdown -->
          <div class="col-12 col-md-3">
            <label class="form-label small text-muted"> Company </label>

            <select class="form-select">
              <option selected>All companies</option>
              <option>NYC Department of Education</option>
              <option>Acme Corp</option>
              <option>Globex Inc.</option>
            </select>
          </div>

          <!-- Category -->
          <div class="col-12 col-md-3">
            <label class="form-label small text-muted d-block">
              Category
            </label>

            <div class="d-flex flex-wrap gap-2">
              <button
                type="button"
                class="btn btn-sm btn-primary rounded-pill category-btn active"
              >
                All
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary rounded-pill category-btn"
              >
                Technology
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary rounded-pill category-btn"
              >
                Healthcare
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary rounded-pill category-btn"
              >
                Finance
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary rounded-pill category-btn"
              >
                Education
              </button>

              <button
                type="button"
                class="btn btn-sm btn-outline-secondary rounded-pill category-btn"
              >
                Marketing
              </button>
            </div>
          </div>

          <!-- Status dropdown -->
          <div class="col-12 col-md-3">
            <label class="form-label small text-muted"> Status </label>

            <select class="form-select">
              <option selected>All statuses</option>
              <option>Open</option>
              <option>Published</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        <!-- ── SEARCH BUTTON ── -->
        <div class="d-flex justify-content-end mt-4">
          <button type="button" class="btn btn-primary search-btn">
            <i class="fa-solid fa-magnifying-glass me-2"></i>
            Search
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ── LOADING ── -->
  <div v-if="loading" style="text-align: center">Loading...</div>

  <!-- ── ERROR ── -->
  <div
    v-else-if="error"
    style="text-align: center"
    class="alert alert-danger"
    role="alert"
  >
    {{ error }}
  </div>

  <!-- ── RESULTS ── -->
  <div v-else>
    <!-- ── MAIN ── -->
    <main class="container pb-4" style="max-width: 1100px">
      <!-- ── SECTION TITLE ── -->
      <div class="d-flex align-items-center mb-3">
        <h2 class="section-title mb-0">
          <span class="section-bar"></span>

          All Vacancies

          <span class="badge-count"> {{ totalElements }} results </span>
        </h2>
      </div>

      <!-- ── TABLE CARD ── -->
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Company</th>
              <th>Category</th>
              <th>Name</th>
              <th>Published Date</th>
              <th>Close Date</th>
              <th>Status</th>
              <th>Featured</th>
              <th style="text-align: right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="vacancy in vacancies" :key="vacancy.id">
              <td class="id-cell">
                {{ vacancy.id }}
              </td>

              <td>
                <div class="company-cell">
                  <div class="company-icon">
                    <i class="fa-solid fa-building"></i>
                  </div>

                  <span>
                    {{ vacancy.companyName }}
                  </span>
                </div>
              </td>

              <td class="cat-cell">
                <span class="category-badge">
                  {{ vacancy.categoryName }}
                </span>
              </td>

              <td class="name-cell">
                {{ vacancy.name }}
              </td>

              <td class="date-cell">
                {{ formatDate(vacancy.publishedDate) }}
              </td>

              <td class="date-cell">
                {{ formatDate(vacancy.closingDate) }}
              </td>

              <td>
                <span
                  class="status-pill"
                  :class="
                    vacancy.status === 'OPEN'
                      ? 'status-open'
                      : vacancy.status === 'PUBLISHED'
                        ? 'status-published'
                        : 'status-closed'
                  "
                >
                  <span class="status-dot"></span>

                  {{ vacancy.status }}
                </span>
              </td>

              <td>
                <span
                  class="featured-pill"
                  :class="vacancy.featured ? 'featured-yes' : 'featured-no'"
                >
                  <i v-if="vacancy.featured" class="fa-solid fa-star"></i>

                  {{ vacancy.featured ? "FEATURED" : "STANDARD" }}
                </span>
              </td>

              <td class="actions-cell">
                <button
                  type="button"
                  class="action-btn action-edit"
                  title="Edit"
                >
                  <i class="fas fa-pencil-alt"></i>
                </button>

                <button
                  type="button"
                  class="action-btn action-delete"
                  title="Delete"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- ── PAGINATION ── -->
    <Pagination
      :current-page="currentPage + 1"
      :total-pages="totalPages"
      @page-change="loadVacancies($event - 1)"
    />
  </div>
</template>
