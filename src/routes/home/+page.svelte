<script>
    //@ts-nocheck
    import PocketBase, { CollectionService } from 'pocketbase';
    import { authedWritable } from '../../store';
    import { afterUpdate, beforeUpdate, onDestroy, onMount } from 'svelte';

    const pb = new PocketBase('http://127.0.0.1:8090');
    let authedContent;
    const unsub = authedWritable.subscribe((value) => authedContent = value);
    let postLists = [];
    let textHomeDiv;

    onMount(() => {
        pb.collection('posts').subscribe('*', (event) => {
        // console.log(event.action)
        // console.log(event.record)
        postLists = [...postLists, event.record]
    })
    })
    async function getPosts() {
        const posts = await pb.collection('posts').getFullList({
            sort: 'created'
        })
        
        postLists = posts;
    }

    getPosts();
    let postBody = "";

    async function postMessage (string) {
        // console.log('posting');
        // console.log(postBody);
        if (typeof string !== "string" || string === "") {
            return null;
        }

        const response = await pb.collection('posts').create({
            recipient: 'main',
            body: string,
            poster: authedContent.user
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

    onDestroy(() => {
        unsub;
        pb.collection('posts').unsubscribe();
    });

</script>


<div class="chatWrapper">
    <div class="pageHead">
        <h1>Simple Chat App</h1>
    </div>
    <div bind:this={textHomeDiv} class = "textHome">
        {#each postLists as post}
            <p>{post.poster} ({
                new Date(post.created).toLocaleTimeString()
            }): &nbsp; {post.body}</p>
        {/each}
    </div>
    <br/>
    <input 
        class = "postBox" 
        type="text" 
        on:change={(event) => postBody = event.target.value} 
        on:keydown={(event) => {
            if (event.key === 'Enter') {
                postMessage(event.target.value)
            }
        }}
        value = {postBody}/>
    <div class="buttonBox">
        <!-- <button on:click={postMessage(postBody)}>Post</button> -->
        <!-- <button on:click={() => console.log(postLists)}>DEBUG BUTTON</button> -->
    </div>
</div>

<style>
    
    .chatWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .pageHead {
        width: 80vw;
    }

    .postBox {
        height: 4rem;
        width: 82vw;
        border-radius: 10px;
        margin-right: 1rem;
        overflow-y: auto;
    }

    .textHome {
        border: 2px darkgray solid;
        border-radius: 20px;
        height: 60vh;
        width: 80vw;
        overflow-y: auto;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    .buttonBox {
        margin: 1rem;
    }
</style>