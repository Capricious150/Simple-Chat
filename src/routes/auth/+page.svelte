<script> 
import { logInAsUser } from "../../pocketbaseStuff";
import { authedWritable } from "../../store";
import { goto } from "$app/navigation";
import { onDestroy, onMount } from "svelte";
import { redirect } from "@sveltejs/kit";
import { base } from "$app/paths"


let authedContent;
const unsub = authedWritable.subscribe((value) => authedContent = value);

onMount(() => {
    // console.log(authedContent)
    if (authedContent?.token) {
        console.log("You're already authed")
        goto(base + '/home');
        // throw redirect(300, '/home')
    }
})

let username = ''
let password = ''



async function authUser () {
    let response = await logInAsUser(username, password);

    if (response.token) {
        $authedWritable.authed = true;
        $authedWritable.token = response.token;

        goto(base + '/home');
    }
}

onDestroy(unsub);
</script>

<h1> AUTH </h1>
<input on:change ={(event) => {
    //@ts-ignore
    if (event.target && event.target.value) username = (event.target.value)}
}/>
<input on:change ={(event) => {
    //@ts-ignore
    if (event.target && event.target.value) password = (event.target.value)}
}/>
<button on:click={authUser}>
    Test
</button>

<style>
    h1 {
        color: white;
    }
</style>