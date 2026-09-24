<script setup>
import { onMounted, ref } from "vue";
import "../../assets/css/Home.css";
import { computed } from "vue";
//import Pagination from "../common/Pagination.vue";

const visiblePages = computed(() => {
  const windowSize = 3;
  const blockStart =
    Math.floor(currentPage.value / windowSize) * windowSize + 1;
  const pages = [];
  for (
    let i = blockStart;
    i < blockStart + windowSize && i <= totalPages.value;
    i++
  ) {
    pages.push(i);
  }
  return pages;
});

const vacancies = ref([]);
const loading = ref(false);
const error = ref("");

//Pagination variables
const currentPage = ref(0);
const totalPages = ref(0);
const totalElements = ref(0);
const pageSize = ref(3);

const searchTerm = ref("");

const categories = ref([]);
const categoriesError = ref("");
const selectedCategoryId = ref(null);
const all = ref(false);

const sectionTitle = ref("Featured");

async function loadCategories() {
  categoriesError.value = "";

  try {
    const response = await fetch("http://localhost:8080/api/categories");

    if (!response.ok) {
      throw new Error("Categories filter could not be loaded.");
    }

    categories.value = await response.json();
  } catch (err) {
    categoriesError.value = err.message;
  }
}

async function loadVacancies(page = 0, size = pageSize.value) {
  loading.value = true;
  error.value = "";

  try {
    let url = `http://localhost:8080/api/home?&page=${page}&size=${size}`;

    if (searchTerm.value) {
      url += `&description=${searchTerm.value}`;
    }

    if (all.value) {
      url += `&all=true`;
    }

    if (selectedCategoryId.value !== null) {
      url += `&categoryId=${selectedCategoryId.value}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Vacancies could not be loaded.");
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

function daysAgo(dateString) {
  const published = new Date(dateString);
  const today = new Date();
  const diffMs = today - published;
  const days = Math.floor(diffMs / 86400000);
  return `${days} days ago`;
}

function goToPreviousPage() {
  if (currentPage.value === 0) {
    return;
  }
  loadVacancies(currentPage.value - 1);
}

function goToNextPage() {
  if (currentPage.value >= totalPages.value - 1) {
    return;
  }
  loadVacancies(currentPage.value + 1);
}

// Clear filters button
function clearFilters() {
  all.value = false;
  selectedCategoryId.value = null;
  searchTerm.value = "";
  pageSize.value = 3;
  sectionTitle.value = "Featured";
  loadVacancies();
}

// Search button
function searchVacancies() {
  all.value = false;

  if (selectedCategoryId.value === null) {
    sectionTitle.value = "Search Results";
  }

  loadVacancies();
}

onMounted(() => {
  loadVacancies();
  loadCategories();
});
</script>

<template>
  <section class="hero">
    <div class="container" style="max-width: 1320px">
      <div class="row g-4">
        <div class="col-12 text-center">
          <h1>Find the job you're <em>looking for.</em></h1>
        </div>

        <div class="col-12 hero-search-wrap">
          <div class="search-box">
            <div class="d-flex align-items-center gap-2">
              <input
                type="text"
                class="search-input form-control"
                placeholder="Enter single keyword (e.g developer, nurse, supervisor...)"
                v-model="searchTerm"
              />

              <button
                class="btn-search d-flex align-items-center gap-2"
                @click="searchVacancies()"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <div class="filter-row mt-3 justify-content-center">
            <span class="filter-label">Category:</span>
            <button
              class="f-pill"
              :class="{ active: all }"
              @click="
                all = true;
                searchTerm = '';
                selectedCategoryId = null;
                sectionTitle = 'All';
                pageSize = 10;
                loadVacancies();
              "
            >
              All
            </button>
            <button
              class="f-pill"
              :class="{ active: selectedCategoryId === category.id }"
              v-for="category in categories"
              :key="category.id"
              @click="
                selectedCategoryId = category.id;
                all = false;
                sectionTitle = category.name;
                pageSize = 3;
                loadVacancies();
              "
            >
              {{ category.name }}
            </button>
            <button
              v-if="all || selectedCategoryId !== null || searchTerm"
              class="f-pill clear-filter"
              @click="clearFilters()"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- VACANCY CARDS -->
  <main class="container py-4" style="max-width: 900px">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="section-title mb-0">
        <span class="section-bar"></span>
        {{ sectionTitle }}
        <span class="badge-count ms-2">{{ totalElements }} vacancies</span>
      </h2>
    </div>

    <div v-if="loading">Loading Vacancies...</div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else>
      <div class="d-flex flex-column gap-3">
        <a
          href="#"
          class="job-card card border p-3"
          v-for="vacancy in vacancies"
          :key="vacancy.id"
        >
          <div class="d-flex align-items-start gap-3">
            <div
              class="company-logo"
              style="background: linear-gradient(135deg, #0ea5e9, #0284c7)"
            >
              {{ vacancy.name[0] }}
            </div>

            <div class="flex-fill">
              <div class="d-flex flex-wrap gap-1 mb-2">
                <span class="jh-badge badge-cat">{{ vacancy.category }}</span>
              </div>

              <div class="job-title">{{ vacancy.name }}</div>

              <div class="d-flex flex-wrap gap-3 mt-1">
                <span
                  class="d-flex align-items-center gap-1"
                  :class="'status-' + vacancy.status.toLowerCase()"
                >
                  <span class="status-dot"></span>
                  <!--dynamic css class-->
                  {{
                    vacancy.status.charAt(0) +
                    vacancy.status.slice(1).toLowerCase()
                  }}
                </span>
              </div>

              <div class="job-desc">{{ vacancy.description }}</div>
            </div>

            <div
              class="d-none d-md-flex flex-column align-items-end gap-2 flex-shrink-0"
            >
              <router-link
                :to="`/vacancies/details/${vacancy.id}`"
                class="btn-view"
                >Details →</router-link
              >
              <span class="job-date">{{ daysAgo(vacancy.publishedDate) }}</span>
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- PAGINATION -->
    <nav class="pagination-nav" aria-label="Pagination">
      <ul class="pagination-list">
        <li
          class="pagination-item"
          :class="{ disabled: currentPage === 0 }"
          @click="goToPreviousPage"
        >
          <span class="pagination-link">« Previous</span>
        </li>

        <li
          class="pagination-item"
          :class="{ active: n - 1 === currentPage }"
          v-for="n in visiblePages"
          :key="n"
          @click="loadVacancies(n - 1)"
        >
          <span class="pagination-link">{{ n }}</span>
        </li>

        <li
          class="pagination-item"
          :class="{ disabled: currentPage === totalPages - 1 }"
          @click="goToNextPage"
        >
          <span class="pagination-link">Next »</span>
        </li>
      </ul>
    </nav>
  </main>
</template>
