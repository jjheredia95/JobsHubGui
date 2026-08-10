<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const companies = ref([])
const loading = ref(true)
const error = ref('')
const route = useRoute()
const created = ref(route.query.created === 'true')
const updated = ref(route.query.updated === 'true')
const updatedName = ref(route.query.name || '')

function truncateDescription(description) {
  if (!description) {
    return 'No description'
  }

  return description.length > 96 ? `${description.slice(0, 96)}...` : description
}

async function loadCompanies() {
  try {
    const response = await fetch('http://localhost:8080/api/companies')
    if (!response.ok) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("There was an error loading the companies.")
    }
    companies.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCompanies()
})

</script>

<template>

  <!-- ── PAGE HEADER ── -->
  <div class="page-header">
    <div class="container" style="max-width:1100px;">
      <div class="breadcrumb-custom">
        <i class="fa-solid fa-building"></i>
        Companies
      </div>
      <h1 class="page-title">Company List</h1>
      <p class="page-subtitle">Manage the organizations that post vacancies on JobsHub.</p>

      <RouterLink class="btn-new" to="/companies/new">
        <i class="fa-solid fa-plus"></i>
        New Company
      </RouterLink>
    </div>
  </div>

  <!-- ── MAIN ── -->
  <main class="container py-4" style="max-width:1100px;">

    <!-- Transient success alerts -->
    <div v-if="created" class="alert alert-success" role="alert">
      Company created successfully.
    </div>
    <div v-if="updated" class="alert alert-success" role="alert">
      Company <strong>{{ updatedName }}</strong> updated successfully.
    </div>

    <div class="d-flex align-items-center mb-3">
      <h2 class="section-title mb-0">
        <span class="section-bar"></span>All Companies
        <span v-if="!loading && !error" class="badge-count">{{ companies.length }} results</span>
      </h2>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="admin-table-wrap">
      <div class="empty-cell">Loading companies...</div>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- EMPTY -->
    <div v-else-if="companies.length === 0" class="admin-table-wrap">
      <div class="empty-cell">No companies found.</div>
    </div>

    <!-- SUCCESS -->
    <div v-else class="admin-table-wrap">
      <table class="admin-table">
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Headquarters</th>
          <th>Website</th>
          <th>Description</th>
          <th style="text-align:right;">Actions</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="company in companies" :key="company.id">
          <td class="id-cell">#{{ company.id }}</td>
          <td class="name-cell">{{ company.name }}</td>
          <td>{{ company.headquarters || 'N/A' }}</td>
          <td>
            <a v-if="company.website" :href="company.website" target="_blank" rel="noopener noreferrer" class="site-link">
              {{ company.website }}
            </a>
            <span v-else>N/A</span>
          </td>
          <td class="desc-cell">{{ truncateDescription(company.description) }}</td>
          <td style="text-align:right;">
            <RouterLink
                :to="`/companies/edit/${company.id}`"
                class="action-btn action-edit"
                title="Edit"
            >
              <i class="fas fa-pencil-alt"></i>
            </RouterLink>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </main>
</template>