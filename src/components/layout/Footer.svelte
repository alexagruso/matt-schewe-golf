<script lang="ts">
    import DarkButtonLink from "@components/interactive/DarkButtonLink.svelte";
    import { page } from "$app/stores";
</script>

<footer>
    <div class="col">
        <div class="row content">
            <div class="col title">
                <span>Matt Schewe - Director of Instruction</span>
                <span>Pearland Golf Club</span>
                <span>3123 Flower Field Lane</span>
                <span>Pearland, Texas</span>
            </div>
            <div class="col contact">
                <span>(713) 291-8861</span>
                <span>matt@mattschewegolf.com</span>
                <div class="row social">
                    <a href="https://twitter.com/mattschewegolf?lang=en" target="_blank">
                        <img src="images/footer/twitter.png" alt="twitter" />
                    </a>
                    <a href="https://www.facebook.com/matt.schewe.1" target="_blank">
                        <img src="images/footer/facebook.png" alt="facebook" />
                    </a>
                    <a href="https://www.instagram.com/golfpromattschewepga/" target="_blank">
                        <img src="images/footer/instagram.png" alt="instagram" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCLMlW7yX0chNKrdTu3hC5NA" target="_blank">
                        <img src="images/footer/youtube.png" alt="youtube" />
                    </a>
                </div>
                <DarkButtonLink href="/lessons">Schedule A Lesson</DarkButtonLink>
            </div>
        </div>
        <div class="row copyright">
            <span>Copyright &copy; 2023 Matt Schewe. All Rights Reserved.</span>
            {#if $page.data.currentSession}
                <DarkButtonLink href="/dashboard">Dashboard</DarkButtonLink>
            {:else}
                <DarkButtonLink href="/login">Admin Login</DarkButtonLink>
            {/if}
            <img src="images/navbar/PGALogoNew.webp" alt="pga logo" />
        </div>
    </div>
</footer>

<style lang="scss">
    footer {
        justify-content: space-between;
        align-items: center;

        padding: 0rem clamp(2rem, 10vw, 12rem);

        background-color: $accent-2;

        font-size: $header-6;
        color: $primary-6;

        @include tablet-and-below {
            padding-bottom: 1rem;
        }
    }

    .content {
        justify-content: space-between;

        padding: 1rem 0rem;

        @include tablet-and-below {
            flex-direction: column;

            padding-bottom: 0rem;
        }
    }

    .title {
        justify-content: center;
        align-items: start;
        gap: 0.25rem;

        @include tablet-and-below {
            padding: 1rem 0rem;
        }
    }

    .contact {
        align-items: end;
        gap: 0.5rem;

        @include tablet-and-below {
            align-items: start;

            border-top: 1px solid $primary-6;
            padding: 1rem 0rem;
        }
    }

    .social {
        gap: 0.5rem;
    }

    .copyright {
        justify-content: center;
        align-items: center;
        gap: 2rem;

        border-top: 1px solid $primary-6;
        padding: 1rem 0rem;

        color: $primary-6;

        img {
            max-height: 4rem;
            border-radius: 0.75rem;
        }

        @include tablet-and-below {
            flex-direction: column;
            align-items: start;
            justify-content: start;
            gap: 1rem;
        }
    }
</style>
