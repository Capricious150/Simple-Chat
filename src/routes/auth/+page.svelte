<script> 
//@ts-nocheck
import { logInAsUser } from "../../pocketbaseStuff";
import { authedWritable } from "../../store";
import { goto } from "$app/navigation";
import { onDestroy, onMount } from "svelte";


let authedContent;
let badAuth = false;
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
    try {
        let response = await logInAsUser(username, password);
        if (response.token) {
            $authedWritable.authed = true;
            $authedWritable.token = response.token;
            $authedWritable.user = username;
            goto('/home');
        }
    } catch {
        badAuth = true;
    }
}

onDestroy(unsub);
</script>

<div class="AuthWrapper">

    <div class="AuthCard">
        <h1> Please sign in </h1>
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
        {#if badAuth}
        <p style="color: red;">Incorrect username or password</p>
        {/if}
        </span>

        <button 
            id="submitButton"
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
        font-size: 100%;
    }

    .AuthWrapper {
        padding-block: 10vh;
        padding-inline: 30vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .AuthCard {
        background-color: rgba(0, 0, 0, 0.85);
        border: 2px darkgray solid;
        padding: 1rem;
        padding-block: 4rem;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 50vh;
        min-width: 20vw;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    }

    .AuthInput {
        border-radius: 10px;
        max-width: 16rem;
        height: 2rem;
        font-size: 120%;
        max-width: 100%;
        padding-left: 1rem;
        margin-top: 1rem;
        margin-bottom: 2px;
        border: none;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        background-color: rgba(255, 255, 255, 0.9);
    }

    #tallSpan {
        padding-block: 12vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        /* background-color: white; */
    }

    #submitButton {

        background-color: rgba(0, 89, 186, 0.85);
        border-radius: 10px;
        height: 2rem;
        width: 6rem;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        transition-duration: 250ms;

        &:hover {
            cursor: pointer;
        }

        &:active {
            background-color: rgba(0, 65, 135, 0.85);
        }
    }

</style>