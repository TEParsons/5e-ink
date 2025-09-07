<script>
    import { marked } from "marked";

    let {
        value=$bindable()
    } = $props();
</script>

<div class=markdown>
    {@html marked(value)}
</div>