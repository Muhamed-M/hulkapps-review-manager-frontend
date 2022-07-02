<template>
    <v-chip :color="color" small />
</template>

<script>
export default {
    name: 'ChipFlag',

    props: {
        flag: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        color() {
            if (this.flag) {
                return 'success'
            } else {
                return 'grey lighten-2'
            }
        },
    },
}
</script>
