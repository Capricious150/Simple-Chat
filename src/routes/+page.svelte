<script>
    import { authedWritable } from '../store';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let authedValue = false;
    const unsub = authedWritable.subscribe((value) => authedValue = value);

    onMount(() => {
        if (authedValue === false) {
             goto('/auth');
        } else if (authedValue === true) {
            goto('/home')
        }
    })

    onDestroy(unsub);
</script>

<div>
    <h1>HOME</h1>
</div>

<style>
    h1 {
        padding: 0;
        margin: 0;
    }
</style>