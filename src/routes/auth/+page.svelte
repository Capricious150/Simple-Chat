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

    <div class="AuthCard">
        <h2> Please sign in </h2>
        <span id="tallSpan">

        <input 
            class="AuthInput"
            id="userInput"
            on:change ={(event) => {
                //@ts-ignore
                if (event.target && event.target.value) username = (event.target.value)}
            }
            on:keydown = {(event) => {
                if (event.key === 'Enter') {
                    authUser(event.target.value, password)
                }
            }}
        />
        <label for="userInput">Username</label>
        <input 
            class="AuthInput"
            id="passInput"
            type="password"
            on:change ={(event) => {
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
        <label for="passInput">Password</label>
        </span>
        <button 
            on:click={authUser(username, password)}
        >
            Submit
        </button>
    </div>
</div>

<style>

    button {
        text-decoration: none;
        box-shadow: none;
        border: none;
        background-color: inherit;
    }

    .AuthWrapper {
        padding-block: 20vh;
        padding-inline: 30vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .AuthCard {
        background-color: gray;
        padding: 1rem;
        padding-block: 4rem;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 50vh;
        min-width: 20vw;
    }

    .AuthInput {
        border-radius: 15px;
        width: 16rem;
        height: 2rem;
        font-size: 120%;
        max-width: 100%;
        padding-left: 1rem;
        margin-top: 1rem;
    }

    #tallSpan {
        padding-block: 12vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        /* background-color: white; */
    }

</style>