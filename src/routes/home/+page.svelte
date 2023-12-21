<script>
    import PocketBase, { CollectionService } from 'pocketbase';

    const pb = new PocketBase('http://127.0.0.1:8090');
    let postLists = [];
    async function getPosts() {
        const posts = await pb.collection('posts').getFullList({
            sort: 'created'
        })
        
        postLists = posts;
    }

    getPosts();
    
    pb.collection('posts').subscribe('*', (event) => {
        // console.log(event.action)
        console.log(event.record)
        postLists = [...postLists, event.record]
        // posts = [...posts, event.record]

    })

    let postBody = "";

    function postMessage (string) {
        if (typeof string !== "string") {
            return null;
        }

        pb.collection('posts').create({
            recipient: 'main',
            body: string
        })

        
    }


</script>


<div>
    <h1>Simple Chat App</h1>
    <p>For learning</p>
    <div class = "textHome">
        {#each postLists as post}
            <p>{post.body}</p>
        {/each}}
    </div>
    <br/>
    <input class = "postBox" type="text" on:change={(event) => postBody = event.target.value}/>

    <button on:click={postMessage(postBody)}>Post</button>
    <button on:click={() => console.log(postLists)}>Read Posts</button>
</div>

<style>
    .postBox {
        height: 4rem;
        width: 90vw;
        border-radius: 10px;
        margin-right: 1rem;
        overflow-y: auto;
    }

    .textHome {
        border: 2px darkgray solid;
        border-radius: 20px;
        height: 60vh;
        width: 90vw;
        padding: 2rem;
        }
</style>