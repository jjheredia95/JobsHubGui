<script setup>
import "../../../assets/css/VacancyAdminList.css";
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
          <tr>
            <td class="id-cell">1</td>

            <td>
              <div class="company-cell">
                <div class="company-icon">
                  <i class="fa-solid fa-building"></i>
                </div>

                <span> NYC Department of Education </span>
              </div>
            </td>

            <td class="cat-cell">
              <span class="category-badge"> Technology </span>
            </td>

            <td class="name-cell">React Software Developer</td>

            <td class="date-cell">2026-09-05</td>

            <td class="date-cell">2026-10-05</td>

            <td>
              <span class="status-pill status-open">
                <span class="status-dot"></span>
                OPEN
              </span>
            </td>

            <td>
              <span class="featured-pill featured-yes">
                <i class="fa-solid fa-star"></i>
                Featured
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

          <!-- Vacancy 2 -->
          <tr>
            <td class="id-cell">88</td>

            <td>
              <div class="company-cell">
                <div class="company-icon">
                  <i class="fa-solid fa-building"></i>
                </div>

                <span> NYC Department of Education </span>
              </div>
            </td>

            <td class="cat-cell">
              <span class="category-badge"> Technology </span>
            </td>

            <td class="name-cell">Cloud Infrastructure Engineer</td>

            <td class="date-cell">2026-09-05</td>

            <td class="date-cell">2026-10-05</td>

            <td>
              <span class="status-pill status-open">
                <span class="status-dot"></span>
                OPEN
              </span>
            </td>

            <td>
              <span class="featured-pill featured-yes">
                <i class="fa-solid fa-star"></i>
                Featured
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

          <!-- Vacancy 3 -->
          <tr>
            <td class="id-cell">3</td>

            <td>
              <div class="company-cell">
                <div class="company-icon">
                  <i class="fa-solid fa-building"></i>
                </div>

                <span> Acme Corp </span>
              </div>
            </td>

            <td class="cat-cell">
              <span class="category-badge"> Healthcare </span>
            </td>

            <td class="name-cell">Hospital Administrator</td>

            <td class="date-cell">2026-09-05</td>

            <td class="date-cell">2026-10-05</td>

            <td>
              <span class="status-pill status-open">
                <span class="status-dot"></span>
                OPEN
              </span>
            </td>

            <td>
              <span class="featured-pill featured-no"> Standard </span>
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
