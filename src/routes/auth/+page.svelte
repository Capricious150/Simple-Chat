<script> 
    import { logInAsUser } from "../../pocketbaseStuff";
    let username = ''
    let password = ''

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
<button on:click={async () => console.log(await logInAsUser(username, password))}>
    Test
</button>
<style>
    h1 {
        color: white;
    }
</style>