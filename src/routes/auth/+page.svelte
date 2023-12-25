<script> 
//@ts-nocheck
import { logInAsUser } from "../../pocketbaseStuff";
import { authedWritable } from "../../store";
import { goto } from "$app/navigation";
import { onDestroy, onMount } from "svelte";


let authedContent;
const unsub = authedWritable.subscribe((value) => authedContent = value);

onMount(() => {
    // console.log(authedContent)
    if (authedContent?.token) {
        console.log("You're already authed")
        goto('home');
        // throw redirect(300, '/home')
    }
})

let username = ''
let password = ''



async function authUser (username, password) {
    let response = await logInAsUser(username, password);

    if (response.token) {
        $authedWritable.authed = true;
        $authedWritable.token = response.token;
        $authedWritable.user = username;
        goto('/home');
    }
}

onDestroy(unsub);
</script>

<div class="AuthWrapper">
    <h3> Please sign in </h3>
    <br />
    <input on:change ={(event) => {
        //@ts-ignore
        if (event.target && event.target.value) username = (event.target.value)}
    }
    
    on:keydown = {(event) => {
        if (event.key === 'Enter') {
            authUser(event.target.value, password)
        }
    }}
    />
    <input on:change ={(event) => {
        //@ts-ignore
        if (event.target && event.target.value) {
            password = (event.target.value)
        }}
    }
    on:keydown = {(event) => {
        if (event.key === 'Enter') {
            authUser(username, event.target.value)
        }
    }}
    />
    <br />
    <br />
    <!-- <button on:click={authUser(username, password)}>
        Sign In
    </button> -->
</div>

<style>
    h3 {
        color: white;
        margin: 0;
    }

    .AuthWrapper {
        padding-block: 20vh;
        padding-inline: 30vw;
    }

</style>