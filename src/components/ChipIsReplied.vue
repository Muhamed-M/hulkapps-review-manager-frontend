<template>
    <v-chip :color="color" small />
</template>

<script>
export default {
    name: 'ChipStatus',
    props: {
        isReplied: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        color() {
            if (this.isReplied) {
                return 'success'
            } else {
                return 'grey lighten-2'
            }
        },
    },
}
</script>
