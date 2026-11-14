<script>
    import { asset } from '$app/paths';

    let {
        /** @prop {string} file Path to the file to use */
        file,
        /** @prop {string} identifier Identifier for the object in the SVG file (needed for Firefox) */
        identifier="root",
        /** @prop {import("svelte").ComponentProps} props Other props are passed to the <svg> element */
        ...props
    } = $props()
</script>

<svg 
    class=icon
    {...props}
>
    <use href="{asset(file)}#{identifier}" />
</svg>

<style>
    svg {
        align-self: center;
        justify-self: center;
    }
</style>