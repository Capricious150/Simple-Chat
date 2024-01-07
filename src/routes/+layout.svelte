<div class = 'PageBody'> 
    <slot />
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

    .PageBody {
        font-family: 'Open Sans', sans-serif;
        color: white;
        margin: 0;
        height: 100svh;
        /* height: 100%; */
        width: auto;
        background-color: black;
        background-size: 200% 100%;
        background-position: right bottom;

        /* The nightmare below was a happy accident, the result of trying to use ChatGPT to teach me how to make a two-color background with a curved vertical divide */
        background-image: repeating-radial-gradient(circle at top left, transparent 0, transparent 24px, blue 25px, blue 26px, transparent 27px, transparent 50px),
                          repeating-radial-gradient(circle at bottom right, transparent 0, transparent 24px, darkblue 25px, darkblue 26px, transparent 27px, transparent 50px);
    }
    
    @media (max-width: 800px) {
        .PageBody {
            background-color: black;
            background-size: 100% 200%;
            background-position: center right;
            background-image: repeating-radial-gradient(circle at top left, transparent 0, transparent 24px, blue 25px, blue 26px, transparent 27px, transparent 50px),
                              repeating-radial-gradient(circle at bottom right, transparent 0, transparent 24px, darkblue 25px, darkblue 26px, transparent 27px, transparent 50px);
        }
    }

</style>