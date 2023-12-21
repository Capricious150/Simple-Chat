<script>
    import { authedWritable } from '../store';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    
    let authedValue;
    const unsub = authedWritable.subscribe((value) => authedValue = value);

    onMount(() => {
        if (authedValue.authed === false) {
             goto(base + '/auth');
        } else if (authedValue.authed === true) {
            goto(base + '/home')
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