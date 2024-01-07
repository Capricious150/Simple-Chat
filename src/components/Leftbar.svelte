<script>
    import UserSettings from "./UserSettings.svelte";
    export let authedContent;
    let open = false;

</script>


<UserSettings open={open}/>
<div class="leftBarBody">
    <div class="userIcon">
        <h1 class="userInitial">{authedContent.user[0]}</h1>
    </div>
    <button on:click = {() => open = !open}>Modal</button>
</div>



<style>
    .leftBarBody {
        min-height: 100svh;
        height: 100%;
        width: 15vw;
        min-width: 10rem;
        padding-left: 1vw;
        border-right: solid lightgray 2px;
    }

    .userIcon {
        background-color: purple;
        border-radius: 100%;
        height: 4rem;
        width: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        margin-top: 2rem;
    }

    .userIcon:hover {
        cursor: pointer;
    }

    .userInitial {
        font-size: 3rem;
    }
</style>