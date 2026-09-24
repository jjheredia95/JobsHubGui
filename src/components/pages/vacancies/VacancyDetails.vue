```vue
<script setup>
import "../../../assets/css/VacancyDetaiils.css";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const id = route.params.id;

// Initial States
const vacancy = ref(null);
const loading = ref(false);
const error = ref("");

async function loadVacancyDetails() {
  loading.value = true;
  try {
    const response = await fetch(
      `http://localhost:8080/api/vacancies/details/${id}`,
    );

    if (!response.ok) {
      throw new Error("The details could not be loaded.");
    }

    vacancy.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadVacancyDetails();
});
</script>

<template>
  <!-- ── PAGE HEADER ── -->
  <div class="page-header">
    <div class="container" style="max-width: 1060px">
      <div class="breadcrumb-custom">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>

        Jobs / Vacancy Details
      </div>
    </div>
  </div>

  <!-- Back to jobs -->
  <div class="container pt-3" style="max-width: 1060px">
    <a href="#" class="back-link">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>

      Back to jobs
    </a>
  </div>

  <div v-if="loading">Loading...</div>

  <div v-else-if="error" class="alert alert-danger" role="alert">
    {{ error }}
  </div>

  <div v-else>
    <!-- ── MAIN ── -->
    <main class="container py-4" style="max-width: 1060px">
      <div>
        <!-- Vacancy header -->
        <div>
          <h1 class="page-title">Software Developer</h1>

          <div class="d-flex flex-wrap gap-2 mt-2">
            <span class="jh-badge badge-status">Open</span>
            <span class="jh-badge badge-wm">Remote</span>
            <span class="jh-badge badge-emp">Full Time</span>
            <span class="jh-badge badge-sal">$80,000</span>
          </div>
        </div>

        <div class="row g-4">
          <!-- ── LEFT: Main content ── -->
          <div class="col-lg-8">
            <!-- Job information -->
            <div class="detail-card">
              <div class="detail-card-title">
                <span class="section-bar"></span>
                Job information
              </div>

              <!-- Locations -->
              <div class="meta-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <span class="meta-label">Locations</span>

                <div class="d-flex flex-wrap gap-1">
                  <span class="jh-badge badge-loc"> 📍 New York, NY </span>
                </div>
              </div>

              <!-- Published -->
              <div class="meta-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>

                <span class="meta-label">Published</span>

                September 23, 2026
              </div>

              <!-- Open date -->
              <div class="meta-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>

                <span class="meta-label">Open date</span>

                September 23, 2026
              </div>

              <!-- Close date -->
              <div class="meta-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>

                <span class="meta-label">Close date</span>

                October 23, 2026
              </div>

              <!-- Category -->
              <div class="meta-row">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>

                <span class="meta-label">Category</span>

                Software Development
              </div>

              <hr class="detail-divider" />

              <p class="desc-text">
                We are looking for a talented software developer to join our
                team. The ideal candidate will help design, develop, test, and
                maintain software applications.
              </p>
            </div>

            <!-- Job details -->
            <div class="detail-card">
              <div class="detail-card-title">
                <span class="section-bar"></span>
                Job details
              </div>

              <p class="desc-text" style="white-space: pre-line">
                This is a full-time software development position. The
                successful candidate will work with the development team to
                build and maintain modern web applications.
              </p>
            </div>
          </div>

          <!-- ── RIGHT: Sidebar ── -->
          <div class="col-lg-4">
            <!-- Apply card -->
            <div class="detail-card">
              <button class="btn-apply mb-3">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  />
                  <polyline points="14 2 20 8" />
                </svg>

                Apply now
              </button>

              <div class="apply-deadline">
                Application closes October 23, 2026
              </div>
            </div>

            <!-- Company card -->
            <div class="detail-card">
              <div class="detail-card-title">
                <span class="section-bar"></span>
                About the company
              </div>

              <div class="d-flex align-items-start gap-3 mb-3">
                <div class="company-logo-box">J</div>

                <div>
                  <div class="company-name">JobsHub Company</div>

                  <div class="company-meta">New York, NY</div>

                  <a href="#" target="_blank" class="company-link d-block mt-1">
                    www.example.com ↗
                  </a>
                </div>
              </div>

              <p class="desc-text" style="font-size: 0.8rem">
                We are a company focused on building modern technology solutions
                and creating opportunities for talented professionals.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-5"></div>
      </div>
    </main>
  </div>
</template>
