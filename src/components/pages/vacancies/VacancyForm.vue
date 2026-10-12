<script setup>
import "../../../assets/css/VacancyForm.css";
</script>

<template>
  <div class="create-vacancy-page">
    <div class="container-fluid px-3 px-lg-4 py-4">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#" class="breadcrumb-link">Dashboard</a>
          </li>
          <li class="breadcrumb-item">
            <a href="#" class="breadcrumb-link">Vacancies</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create vacancy
          </li>
        </ol>
      </nav>

      <!-- Page heading -->
      <div
        class="page-heading d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
      >
        <div>
          <div class="heading-icon mb-3">
            <i class="fa-solid fa-briefcase"></i>
          </div>

          <h1 class="page-title">Create a vacancy</h1>

          <p class="page-subtitle mb-0">
            Add a new job opportunity to the JobsHub platform.
          </p>
        </div>

        <div class="configuration-badge">
          <i class="fa-solid fa-sliders"></i>
          Configure before creating
        </div>
      </div>

      <div class="row g-4">
        <!-- Main form -->
        <div class="col-12 col-xl-8">
          <div class="form-card">
            <form>
              <!-- Section 1: Basic information -->
              <div class="form-section">
                <div class="section-heading">
                  <div class="section-icon">
                    <i class="fa-regular fa-rectangle-list"></i>
                  </div>

                  <div>
                    <h2 class="section-title">Basic information</h2>
                    <p class="section-description">
                      Start with the essential details of the position.
                    </p>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="vacancyName" class="form-label">
                    Vacancy title <span class="required">*</span>
                  </label>

                  <input
                    id="vacancyName"
                    name="name"
                    type="text"
                    class="form-control custom-input"
                    placeholder="e.g. Junior Java Developer"
                    required
                  />

                  <div class="form-text">
                    Use a clear title that candidates will recognize.
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="company" class="form-label">
                      Company <span class="required">*</span>
                    </label>

                    <select
                      id="company"
                      name="companyId"
                      class="form-select custom-input"
                      required
                    >
                      <option value="" selected disabled>
                        Select a company
                      </option>
                    </select>

                    <div class="form-text">
                      Choose the company offering the position.
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="category" class="form-label">
                      Category <span class="required">*</span>
                    </label>

                    <select
                      id="category"
                      name="categoryId"
                      class="form-select custom-input"
                      required
                    >
                      <option value="" selected disabled>
                        Select a category
                      </option>
                    </select>

                    <div class="form-text">
                      Select the most relevant job category.
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-divider"></div>

              <!-- Section 2: Job description -->
              <div class="form-section">
                <div class="section-heading">
                  <div class="section-icon">
                    <i class="fa-solid fa-align-left"></i>
                  </div>

                  <div>
                    <h2 class="section-title">Job description</h2>
                    <p class="section-description">
                      Explain the role and what the candidate will do.
                    </p>
                  </div>
                </div>

                <div class="mb-4">
                  <label for="description" class="form-label">
                    Description <span class="required">*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    class="form-control custom-input description-input"
                    rows="6"
                    placeholder="Describe the responsibilities, requirements, and expectations for this position..."
                    required
                  ></textarea>

                  <div class="form-text">
                    Include the responsibilities and qualifications candidates
                    should know about.
                  </div>
                </div>

                <div class="mb-0">
                  <label for="details" class="form-label">
                    Additional details
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    class="form-control custom-input"
                    rows="3"
                    placeholder="Add any other relevant information..."
                  ></textarea>
                </div>
              </div>

              <div class="section-divider"></div>

              <!-- Section 3: Job conditions -->
              <div class="form-section">
                <div class="section-heading">
                  <div class="section-icon">
                    <i class="fa-solid fa-location-dot"></i>
                  </div>

                  <div>
                    <h2 class="section-title">Job conditions</h2>
                    <p class="section-description">
                      Specify where the job is located, its salary, and the type
                      of employment.
                    </p>
                  </div>
                </div>

                <div class="row g-3">
                  <!-- Location -->
                  <div class="col-md-7">
                    <label for="location" class="form-label">
                      Job location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      class="form-control custom-input"
                      placeholder="e.g. New York, NY"
                    />

                    <div class="form-text">
                      Enter the job location, not the company's headquarters.
                    </div>
                  </div>

                  <!-- Salary -->
                  <div class="col-md-5">
                    <label for="salary" class="form-label"> Salary </label>

                    <div class="input-group salary-group">
                      <span class="input-group-text">$</span>

                      <input
                        id="salary"
                        name="salary"
                        type="number"
                        min="0"
                        step="0.01"
                        class="form-control custom-input"
                        placeholder="65000"
                      />
                    </div>

                    <div class="form-text">Enter the salary amount.</div>
                  </div>

                  <!-- Work Mode -->
                  <div class="col-md-6">
                    <label for="workMode" class="form-label">
                      Work mode <span class="required">*</span>
                    </label>

                    <select
                      id="workMode"
                      name="workMode"
                      class="form-select custom-input"
                      required
                    >
                      <option value="" selected disabled>
                        Select work mode                  
                      </option>
                      <option value="ON_SITE">On-site</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="REMOTE">Remote</option>
                    </select>

                    <div class="form-text">
                      Specify where the employee will work.
                    </div>
                  </div>

                  <!-- Employment Type -->
                  <div class="col-md-6">
                    <label for="employmentType" class="form-label">
                      Employment type <span class="required">*</span>
                    </label>

                    <select
                      id="employmentType"
                      name="employmentType"
                      class="form-select custom-input"
                      required
                    >
                      <option value="" selected disabled>
                        Select employment type
                      </option>
                      <option value="FULL_TIME">Full-time</option>
                      <option value="PART_TIME">Part-time</option>
                      <option value="CONTRACT">Contract</option>
                      <option value="TEMPORARY">Temporary</option>
                      <option value="INTERNSHIP">Internship</option>
                      <option value="FREELANCE">Freelance</option>
                    </select>

                    <div class="form-text">
                      Specify the employment arrangement.
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-divider"></div>

              <!-- Section 4: Publication schedule -->
              <div class="form-section">
                <div class="section-heading">
                  <div class="section-icon">
                    <i class="fa-regular fa-calendar-days"></i>
                  </div>

                  <div>
                    <h2 class="section-title">Publication schedule</h2>
                    <p class="section-description">
                      Set the dates associated with this opportunity.
                    </p>
                  </div>
                </div>

                <div class="row g-3">
                  <div class="col-md-6">
                    <label for="openDate" class="form-label">
                      Opening date <span class="required">*</span>
                    </label>

                    <input
                      id="openDate"
                      name="openDate"
                      type="date"
                      class="form-control custom-input"
                      required
                    />

                    <div class="form-text">When the vacancy becomes open.</div>
                  </div>

                  <div class="col-md-6">
                    <label for="closeDate" class="form-label">
                      Closing date
                    </label>

                    <input
                      id="closeDate"
                      name="closeDate"
                      type="date"
                      class="form-control custom-input"
                    />

                    <div class="form-text">
                      Leave empty if no closing date is specified.
                    </div>
                  </div>
                </div>

                <div class="schedule-notice mt-4">
                  <i class="fa-solid fa-circle-info"></i>

                  <p class="mb-0">
                    Make sure the opening date does not come after the closing
                    date.
                  </p>
                </div>
              </div>

              <div class="section-divider"></div>

              <!-- Section 5: Publication settings -->
              <div class="form-section">
                <div class="section-heading">
                  <div class="section-icon">
                    <i class="fa-solid fa-sliders"></i>
                  </div>

                  <div>
                    <h2 class="section-title">Publication settings</h2>
                    <p class="section-description">
                      Choose the initial status and decide whether to feature
                      this vacancy.
                    </p>
                  </div>
                </div>

                <div class="row g-3">
                  <!-- Status -->
                  <div class="col-md-6">
                    <label for="status" class="form-label">
                      Vacancy status <span class="required">*</span>
                    </label>

                    <select
                      id="status"
                      name="status"
                      class="form-select custom-input"
                      required
                    >
                      <option value="" selected disabled>
                        Select initial status
                      </option>
                      <option value="PUBLISHED">Published</option>
                      <option value="OPEN">Open</option>
                      <option value="CLOSED">Closed</option>
                    </select>

                    <div class="form-text">
                      Choose the initial status for this vacancy.
                    </div>
                  </div>

                  <!-- Featured -->
                  <div class="col-md-6">
                    <label class="form-label" for="featured">
                      Featured vacancy
                    </label>

                    <div class="featured-option">
                      <div class="form-check form-switch">
                        <input
                          id="featured"
                          name="featured"
                          class="form-check-input featured-switch"
                          type="checkbox"
                          role="switch"
                        />

                        <label
                          class="form-check-label featured-label"
                          for="featured"
                        >
                          <i class="fa-solid fa-star me-2"></i>
                          Mark as featured
                        </label>
                      </div>

                      <p class="featured-description mb-0">
                        Highlight this vacancy to give it more visibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="settings-notice mt-4">
                  <i class="fa-solid fa-circle-info"></i>

                  <p class="mb-0">
                    Review the status and featured setting before creating the
                    vacancy.
                  </p>
                </div>
              </div>

              <!-- Form actions -->
              <div class="form-footer">
                <button type="button" class="btn btn-cancel">Cancel</button>

                <button type="button" class="btn btn-create">
                  <i class="fa-solid fa-plus me-2"></i>
                  Create vacancy
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-12 col-xl-4">
          <div class="sidebar-sticky">
            <!-- Tips card -->
            <div class="sidebar-card mb-4">
              <div class="sidebar-heading">
                <div class="sidebar-heading-icon tips-icon">
                  <i class="fa-regular fa-lightbulb"></i>
                </div>

                <h3>Helpful tips</h3>
              </div>

              <div class="tip-item">
                <div class="tip-number">01</div>

                <div>
                  <h4>Be specific</h4>
                  <p>
                    Choose a clear title that accurately describes the position.
                  </p>
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-number">02</div>

                <div>
                  <h4>Write a useful description</h4>
                  <p>
                    Explain the role, responsibilities, and qualifications
                    candidates need.
                  </p>
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-number">03</div>

                <div>
                  <h4>Check your dates</h4>
                  <p>
                    Review the opening and closing dates before creating the
                    vacancy.
                  </p>
                </div>
              </div>

              <div class="tip-item">
                <div class="tip-number">04</div>

                <div>
                  <h4>Review publication settings</h4>
                  <p>
                    Confirm the initial status and whether this vacancy should
                    be featured.
                  </p>
                </div>
              </div>
            </div>

            <!-- Publication settings card -->
            <div class="sidebar-card publication-card">
              <div class="sidebar-heading">
                <div class="sidebar-heading-icon settings-icon">
                  <i class="fa-solid fa-sliders"></i>
                </div>

                <h3>Publication settings</h3>
              </div>

              <div class="sidebar-setting">
                <div class="setting-icon">
                  <i class="fa-solid fa-circle-dot"></i>
                </div>

                <div>
                  <h4>Initial status</h4>
                  <p>
                    Select the status in the form before creating the vacancy.
                  </p>
                </div>
              </div>

              <div class="sidebar-setting">
                <div class="setting-icon featured-setting-icon">
                  <i class="fa-solid fa-star"></i>
                </div>

                <div>
                  <h4>Featured visibility</h4>
                  <p>
                    Decide whether this opportunity should receive featured
                    placement.
                  </p>
                </div>
              </div>

              <div class="sidebar-note">
                <i class="fa-solid fa-shield-halved"></i>

                <span>
                  Review all information carefully before creating the vacancy.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
