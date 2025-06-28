<template>
    <div v-if="items.length > 0">
        <PaginationRoot
        :total="items.length"
        :items-per-page="itemsPerPage"
        :sibling-count="siblingCount"
        :page="currentPage"
        :show-edges="showEdges"
        @update:page="onPageUpdate"
        >
            <slot name="prepend" :page="paginatedItems" :index="(currentPage - 1) * itemsPerPage" />
            <PaginationList v-slot="{ items }" class="w-full flex items-center justify-center gap-1">
                <PaginationFirst class="button">
                    <ChevronFirst />
                </PaginationFirst>

                <PaginationPrev class="button">
                    <ChevronLeft />
                </PaginationPrev>

                <template v-for="(page, index) in items" :key="index">
                <PaginationListItem v-if="page.type === 'page'" :value="page.value" :class="['justify-center w-9 button', { 'active': page.value === currentPage }]">
                    {{ page.value }}
                </PaginationListItem>
                <PaginationEllipsis v-else :index="index" class="justify-center button">
                    <Ellipsis />
                </PaginationEllipsis>
                </template>

                <PaginationNext class="button">
                    <ChevronRight />
                </PaginationNext>

                <PaginationLast class="button">
                    <ChevronLast />
                </PaginationLast>
            </PaginationList>
        </PaginationRoot>
        <slot name="append" :page="paginatedItems" :index="(currentPage - 1) * itemsPerPage" />
    </div>
    <div class="p-20 select-none" v-else>
        <Panda class="w-12 h-12 text-gray-500 mx-auto" />
        <p class="text-center text-gray-500">No items to display...</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Ellipsis, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast, Panda } from 'lucide-vue-next';

export default defineComponent({
  name: 'Pagination',
  components: {
    Ellipsis,
    ChevronLeft,
    ChevronRight,
    ChevronFirst,
    ChevronLast,
    Panda,
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    siblingCount: {
      type: Number,
      default: 1
    },
    defaultPage: {
      type: Number,
      default: 1
    },
    showEdges: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPage: this.defaultPage
    }
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.items.slice(start, end)
    }
  },
  methods: {
    onPageUpdate(newPage : any) {
      this.currentPage = newPage
    }
  }
});
</script>
