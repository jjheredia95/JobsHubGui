<script setup>
  import {onMounted, ref, computed }   from "vue";
  import { useRoute, useRouter } from 'vue-router'

  const company = ref({
    name: "",
    description: "",
    website: "",
    headquarters: ""
  });

  const errors = ref([])
  const router = useRouter()
  const route = useRoute()

  const companyId = computed(() => route.params.id)
  const isEditing = computed(() => Boolean(companyId.value))

  async function loadCompany()  {
    if (!isEditing.value) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8080/api/companies/${companyId.value}`)

      if (!response.ok) {
        errors.value = [`There was error loading company ${companyId.value}`]
        return
      }

      company.value = await response.json()
    } catch (err) {
      errors.value = [err.message]
    }
  }

  async function handleSubmit() {
    errors.value = []

    const url = isEditing.value
        ? `http://localhost:8080/api/companies/update/${companyId.value}`
        : 'http://localhost:8080/api/companies/create'

    const method = isEditing.value ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(company.value)
      })

      if (!response.ok) {
        const body = await response.json()
        errors.value = typeof body?.message === 'object'
            ? Object.values(body.message)
            : [body?.message || `Error ${response.status}`]
        return
      }

      router.push(
          isEditing.value
              ? `/companies?updated=true&name=${encodeURIComponent(company.value.name)}`
              : '/companies?created=true'
      )
    } catch (err) {
      errors.value = [err.message]
    }
  }

  onMounted(() => {
    loadCompany()
  })


</script>

<template>

  <!-- ── PAGE HEADER ── -->
  <div class="page-header">
    <div class="container" style="max-width:700px;">
      <div class="breadcrumb-custom">
        <i class="fa-solid fa-building"></i>
        Companies / {{ isEditing ? 'Edit' : 'New' }}
      </div>
      <h1 class="page-title">{{ isEditing ? 'Edit Company' : 'New Company' }}</h1>
      <p class="page-subtitle">
        {{ isEditing ? 'Update the details for this company.' : 'Add a new company that can post vacancies on JobsHub.' }}
      </p>
    </div>
  </div>

  <!-- ── MAIN ── -->
  <main class="container py-4" style="max-width:700px;">

    <div v-if="errors.length" class="form-alert form-alert-error">
      <ul class="mb-0 ps-3">
        <li v-for="(msg, i) in errors" :key="i">{{ msg }}</li>
      </ul>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-card">
        <div class="form-card-title">
          <span class="section-bar"></span>Company details
        </div>

        <div class="row g-3">
          <div class="col-12">
            <label for="name" class="jh-label">Name</label>
            <input
                id="name"
                v-model="company.name"
                type="text"
                name="name"
                class="jh-input"
                placeholder="Enter the company name"
            />
          </div>

          <div class="col-12">
            <label for="description" class="jh-label">Description</label>
            <textarea
                id="description"
                v-model="company.description"
                name="description"
                class="jh-input"
                rows="3"
                placeholder="Enter a short description"
            ></textarea>
          </div>

          <div class="col-12">
            <label for="website" class="jh-label">Website</label>
            <input
                id="website"
                v-model="company.website"
                type="text"
                name="website"
                class="jh-input"
                placeholder="https://example.com"
            />
          </div>

          <div class="col-12">
            <label for="headquarters" class="jh-label">Headquarters</label>
            <input
                id="headquarters"
                v-model="company.headquarters"
                type="text"
                name="headquarters"
                class="jh-input"
                placeholder="City, State"
            />
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end gap-2 mt-3 mb-5">
        <button type="button" class="btn-cancel" @click="router.push('/companies')">Cancel</button>
        <button type="submit" title="Save company" class="btn-submit">
          {{ isEditing ? 'Update Company' : 'Save Company' }}
        </button>
      </div>
    </form>

  </main>
</template>