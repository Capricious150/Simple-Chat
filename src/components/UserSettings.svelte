<script>
    export let open;
</script>

<dialog class="settingsModal" {open}>
    <h1>MODAL IS OPEN</h1>
    <button on:click={() => open = !open}>Modal</button>
</dialog>

<style>
    .settingsModal {
        height: 20vh;
        width: 20vh;
        margin: 10rem;
        background-color: pink;
    }
</style>
