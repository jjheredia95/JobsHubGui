<script setup>
import "../../../assets/css/VacancyAdminList.css";
import { ref, onMounted } from "vue";

const vacancies = ref([]);

async function loadVacancies() {
  const response = await fetch("http://localhost:8080/api/vacancies/admin");
  const data = await response.json();
  vacancies.value = data.content;
}

onMounted(() => {
  loadVacancies();
});
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

  <!-- ── MAIN ── -->
  <main class="container py-4" style="max-width: 1100px">
    <!-- ── FILTERS ── -->
    <div class="card filter-card mb-4">
      <div class="card-body">
        <div class="row g-3 align-items-end">
          <!-- Search by name -->
          <div class="col-12 col-md-4">
            <label class="form-label small text-muted"> Search </label>

            <div class="input-group search-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search by vacancy name..."
              />

              <button class="btn btn-primary search-btn" type="button">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <!-- Company dropdown -->
          <div class="col-12 col-md-4">
            <label class="form-label small text-muted"> Company </label>

            <select class="form-select">
              <option selected>All companies</option>
              <option>NYC Department of Education</option>
              <option>Acme Corp</option>
              <option>Globex Inc.</option>
            </select>
          </div>

          <!-- Category pills -->
          <div class="col-12 col-md-4">
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
        </div>
      </div>
    </div>

    <!-- ── SECTION TITLE ── -->
    <div class="d-flex align-items-center mb-3">
      <h2 class="section-title mb-0">
        <span class="section-bar"></span>

        All Vacancies

        <span class="badge-count"> 15 results </span>
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
          <!-- Vacancy 1 -->
          <tr v-for="vacancy in vacancies" :key="vacancy.id">
            <td class="id-cell">{{ vacancy.id }}</td>

            <td>
              <div class="company-cell">
                <div class="company-icon">
                  <i class="fa-solid fa-building"></i>
                </div>

                <span> {{ vacancy.companyName }} </span>
              </div>
            </td>

            <td class="cat-cell">
              <span class="category-badge"> {{ vacancy.categoryName }} </span>
            </td>

            <td class="name-cell">{{ vacancy.name }}</td>

            <td class="date-cell">{{ vacancy.publishedDate }}</td>

            <td class="date-cell">{{ vacancy.closingDate }}</td>

            <td>
              <span
                class="status-pill status-open"
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
                class="featured-pill featured-yes"
                :class="vacancy.featured ? 'featured-yes' : 'featured-no'"
              >
                <i v-if="vacancy.featured" class="fa-solid fa-star"></i>
                {{ vacancy.featured ? "FEATURED" : "STANDARD" }}
              </span>
            </td>

            <td class="actions-cell">
              <button type="button" class="action-btn action-edit" title="Edit">
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

    <!-- ── PAGINATION ── -->
    <nav class="pagination-nav" aria-label="Pagination">
      <ul class="pagination-list">
        <li class="pagination-item disabled">
          <span class="pagination-link"> « Previous </span>
        </li>

        <li class="pagination-item active">
          <span class="pagination-link"> 1 </span>
        </li>

        <li class="pagination-item">
          <span class="pagination-link"> 2 </span>
        </li>

        <li class="pagination-item">
          <span class="pagination-link"> Next » </span>
        </li>
      </ul>
    </nav>
  </main>
</template>
