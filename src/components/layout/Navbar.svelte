<script>
    import Hamburger from "@components/interactive/Hamburger.svelte";
    import HighlightLink from "@components/interactive/HighlightLink.svelte";
    import { page } from "$app/stores";

    let show = false;
</script>

<!-- TODO: tweak z-index to have dropdown behind navbar -->

<nav class="col" data-sveltekit-reload>
    <div class="row hamburger" class:shadow={!show}>
        <div class="row pga">
            {#if $page.data.currentSession}
                <h1>Logged in as {$page.data.currentSession.user}</h1>
            {:else}
                <img src="images/navbar/pga.png" alt="pga logo" />
                <h1>Matt Schewe</h1>
            {/if}
        </div>
        <div class="icon">
            <Hamburger bind:active={show} />
        </div>
    </div>
    <div class="row content">
        <div class="row logo">
            {#if $page.data.currentSession}
                <h1>Logged in as {$page.data.currentSession.user}</h1>
            {:else}
                <img src="images/navbar/pga.png" alt="pga logo" />
                <div class="col text">
                    <span class="title">Matt Schewe</span>
                    <span class="subtitle">School of Golf</span>
                </div>
            {/if}
        </div>
        <div class="row links" class:hide={!show}>
            <div class="row link center">
                <HighlightLink href="/">Home</HighlightLink>
            </div>
            <div class="row link center">
                <HighlightLink href="/about">About</HighlightLink>
            </div>
            <div class="row link center">
                <HighlightLink href="/lessons">Lessons</HighlightLink>
            </div>
            <div class="row link center">
                <HighlightLink href="/testimonials">Testimonials</HighlightLink>
            </div>
            <div class="row link center">
                <HighlightLink href="/blog">Blog</HighlightLink>
            </div>
        </div>
    </div>
</nav>

<style lang="scss">
    nav {
        position: sticky;
        // HACK: about page card is forcing this hack, please fix
        z-index: 3;
        top: 0rem;

        display: block;

        box-shadow: 0rem 0.125rem 0.25rem 0rem $primary-1;
        padding: 0.5rem 0rem;

        background-color: $accent-2;

        color: $primary-6;

        @include tablet-and-below {
            box-shadow: none;
            padding: 0rem;
        }
    }

    .shadow {
        box-shadow: 0rem 0.125rem 0.25rem 0rem $primary-1;
    }

    .hamburger {
        justify-content: space-between;

        display: none;

        transition: all 150ms;

        padding: 0.5rem;

        @include tablet-and-below {
            display: flex;
        }
    }

    .pga {
        align-self: center;
        align-items: center;
        gap: 0.5rem;

        h1 {
            text-transform: uppercase;
        }

        img {
            max-height: 3rem;
        }
    }

    .content {
        justify-content: space-between;
        align-items: center;

        position: relative;

        padding: 0rem clamp(2rem, 10vw, 12rem);

        @include tablet-and-below {
            justify-content: center;
        }

        @include tablet-portrait {
            padding: 0rem 0.5rem;
        }
    }

    .logo {
        align-items: center;
        gap: 1rem;

        @include tablet-and-below {
            display: none;
        }
    }

    .links {
        transition: all 500ms cubic-bezier(0.98, 0, 0.1, 0.98);

        @include tablet-and-below {
            position: absolute;
            top: 0rem;
            flex-direction: column;

            opacity: 0.9;

            box-shadow: 0rem 0.125rem 0.25rem 0rem $primary-1;
            padding: 1rem 0rem;
            width: 100%;

            background-color: $accent-2;
        }
    }

    .hide {
        @include tablet-and-below {
            top: -50vh;
        }
    }

    .text {
        gap: 1rem;

        // HACK: this is a janky way to vertically center the text, please find a better way to do this
        padding-top: 0.5rem;

        line-height: 100%;
    }

    .title {
        font-size: $header-3;
        text-transform: uppercase;

        @include tablet-portrait {
            font-size: $header-4;
        }
    }
</style>
