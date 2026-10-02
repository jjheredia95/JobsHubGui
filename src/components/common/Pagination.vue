<script setup>
import { computed } from "vue";
import "../../assets/css/pagination.css";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);

const visiblePages = computed(() => {
  const windowSize = 3;

  const blockStart =
      Math.floor((props.currentPage - 1) / windowSize) * windowSize + 1;

  const pages = [];

  for (
      let i = blockStart;
      i < blockStart + windowSize && i <= props.totalPages;
      i++
  ) {
    pages.push(i);
  }

  return pages;
});

function goToPage(page) {
  if (page < 1 || page > props.totalPages) return;

  emit("page-change", page);
}
</script>

<template>
  <nav class="pagination-nav" aria-label="Pagination">
    <ul class="pagination-list">

      <li
          :class="[
          'pagination-item',
          currentPage === 1 ? 'disabled' : ''
        ]"
      >
        <span
            class="pagination-link"
            @click="goToPage(currentPage - 1)"
        >
          &laquo; Previous
        </span>
      </li>

      <li
          v-for="page in visiblePages"
          :key="page"
          :class="[
          'pagination-item',
          page === currentPage ? 'active' : ''
        ]"
      >
        <span
            class="pagination-link"
            @click="goToPage(page)"
        >
          {{ page }}
        </span>
      </li>

      <li
          :class="[
          'pagination-item',
          currentPage === totalPages ? 'disabled' : ''
        ]"
      >
        <span
            class="pagination-link"
            @click="goToPage(currentPage + 1)"
        >
          Next &raquo;
        </span>
      </li>

    </ul>
  </nav>
</template>