<script>
    //@ts-nocheck
    import { initializePb } from '../../pocketbaseStuff';
    import { authedWritable } from '../../store';
    import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';
    import Leftbar from '../../components/Leftbar.svelte';

    let authedContent;
    const unsub = authedWritable.subscribe((value) => authedContent = value);
    let postLists = [];
    let textHomeDiv;
    let shiftDown = false;



    onMount(async () => {
        const pb = await initializePb();
        if (pb === null) return null;
        pb.collection('posts').subscribe('*', (event) => {
            // console.log(event.record)
            postLists = [...postLists, event.record]
        })
    })
    async function getPosts() {
        
        const pb = await initializePb();
        if (pb === null) return null;
        const posts = await pb.collection('posts').getFullList({
            sort: 'created'
        })
        
        postLists = posts;
    }

    getPosts();
    let postBody = "";

    function postProcessor (string) {
        // console.log(string);
        return string;
    }
    
    async function postMessage (string) {
        // console.log('posting');
        // console.log(authedContent);
        if (typeof string !== "string" || string === "") {
            return null;
        }

        // console.log(string)
        const pb = await initializePb();
        if (pb === null) return null;
        const response = await pb.collection('posts').create({
            recipient: 'home',
            body: string,
            poster: authedContent.user,
            read: true
        })

        postBody = "";
        return response;        
    }

    function checkScrollPosition (element) {
        // console.log(element.scrollHeight - element.clientHeight <= element.scrollTop + 1)
        return element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
    }
    
    function handleScrolling(element) {
        element.scrollTop = element.scrollHeight;
    }

    
    $: if (postLists.length > 0) {
        
        let scroll = false;
        beforeUpdate(() => {
            scroll = checkScrollPosition(textHomeDiv);
        })
        afterUpdate(() => {
            if (scroll) {
                handleScrolling(textHomeDiv);
            }
        });
    }
    
    onDestroy(async () => {
        unsub;
        const pb = await initializePb();
        if (pb === null) return null;
        pb.collection('posts').unsubscribe();
    });
    
</script>

<div class="pageWrapper">
<Leftbar authedContent = {authedContent} />
<div class="chatWrapper">
    <div class="pageHead">
        <h1>Simple Chat App</h1>
    </div>
    <div bind:this={textHomeDiv} class = "ChatWindow">
        {#each postLists as post}
            <p class="post">{post.poster} ({
                new Date(post.created).toLocaleTimeString()
            }): &nbsp; {postProcessor(post.body)}</p>
        {/each}
    </div>
    <br/>
    <textarea 
        class = "textInput" 
        on:change={(event) => postBody = event.target.value} 
        on:keydown={(event) => {
            if (event.key === "Shift") shiftDown = true

            if (event.key === 'Enter' && shiftDown === false) {
                postMessage(event.target.value)
            }
        }}
        on:keyup={(event) => {
            if (event.key === "Shift") {
                shiftDown = false
            }
        }}
        bind:value = {postBody}
        />
    <div class="buttonBox">
        <!-- <button on:click={postMessage(postBody)}>Post</button> -->
        <!-- <button on:click={() => console.log(postLists)}>DEBUG BUTTON</button> -->
    </div>
</div>
</div>

<style>
    .pageWrapper {
        display: flex;
    }    
    .chatWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-left: 4rem;
    }

    .pageHead {
        width: 65vw;
    }

    .textInput {
        height: 4rem;
        padding: 0.5rem;
        width: 64vw;
        border-radius: 10px;
        margin-right: 1rem;
        margin-left: 1rem;
        overflow-y: auto;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        border: #1F1F1F solid 2px;
    }

    .ChatWindow {
        border: 2px darkgray solid;
        background-color: rgba(0, 0, 0, 0.85);
        border-radius: 20px;
        height: 60vh;
        width: 62vw;
        overflow-y: auto;
        padding-left: 2rem;
        padding-right: 2rem;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    .buttonBox {
        margin: 1rem;
    }

    .post {
        transition-duration: 500ms;
        white-space: pre-line;
    }
    
    .post:hover {
        cursor: pointer;
        transition-delay: 1000ms;
        font-size: 1.5rem;
    }
</style>