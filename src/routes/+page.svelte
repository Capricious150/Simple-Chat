<script>
    import { authedWritable } from '../store';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let authedValue;
    const unsub = authedWritable.subscribe((value) => authedValue = value);

    onMount(() => {
        if (authedValue.authed === false) {
             goto('auth');
        } else if (authedValue.authed === true) {
            goto('home')
        }
    })

    onDestroy(unsub);
</script>

<div>
    <h1>HOME</h1>
    <h3>Please wait to be redirected</h3>
</div>

<style>
    h1 {
        padding: 0;
        margin: 0;
    }
</style>