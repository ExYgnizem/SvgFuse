<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay
                class="bg-black/40 data-[state=open]:animate-fadeIn fixed inset-0 z-30"
            />
            <DialogContent
                class="data-[state=open]:animate-slideIn fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl focus:outline-none z-50"
            >
                <DialogTitle class="text-lg font-semibold text-gray-900">
                    <slot name="title">Modal title</slot>
                </DialogTitle>
                <DialogDescription class="text-gray-600 mt-2 mb-4 text-sm">
                    {{ description }}
                </DialogDescription>
                <slot name="content" :close="close" />
                <slot :close="close" />
                <div class="mt-6 flex justify-end">
                    <DialogClose as-child>
                        <slot name="actions" :close="close" />
                    </DialogClose>
                </div>
                <DialogClose
                    class="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close"
                >
                    <X />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { X } from "lucide-vue-next";

export default defineComponent({
    name: "DialogWindow",
    components: { X },
    props: {
        description: {
            type: String,
            default: "This is a modal.",
        },
    },
    setup(_, { expose }) {
        const isOpen = ref(false);
        const close = () => {
            isOpen.value = false;
        };

        expose({ close });

        return {
            isOpen,
            close,
        };
    },
});
</script>
