<script lang="ts">
    import BlogSection from "@components/layout/BlogSection.svelte";
    import HeroCard from "@components/layout/HeroCard.svelte";
    import LessonCard from "@components/layout/LessonCard.svelte";
    import type { PageProps } from "./$types";
    import type { Testimonial } from "@lib/server/schemas/testimonial";

    const { data }: PageProps = $props();

    let testimonial1: Testimonial | null = $state(null);
    let testimonial2: Testimonial | null = $state(null);
    let testimonial3: Testimonial | null = $state(null);

    if (data.testimonials) {
        data.testimonials.forEach((testimonial) => {
            if (testimonial.position === 1) {
                testimonial1 = testimonial;
            } else if (testimonial.position === 2) {
                testimonial2 = testimonial;
            } else if (testimonial.position === 3) {
                testimonial3 = testimonial;
            }
        });
    } else {
        // Backup
    }
</script>

<HeroCard />
<LessonCard />
<BlogSection />
<h2>Testimonials</h2>
<div class="testimonials row">
    {#if testimonial1}
        <div class="quote col">
            <p>
                {testimonial1.content}
            </p>
            <h3>- {testimonial1.name}</h3>
        </div>
    {/if}
    {#if testimonial2}
        <div class="quote col">
            <p>
                {testimonial2.content}
            </p>
            <h3>- {testimonial2.name}</h3>
        </div>
    {/if}
    {#if testimonial3}
        <div class="quote col">
            <p>
                {testimonial3.content}
            </p>
            <h3>- {testimonial3.name}</h3>
        </div>
    {/if}
</div>

<style lang="scss">
    .testimonials {
        align-self: center;
        gap: 2rem;

        max-width: 64rem;
        width: 100%;

        @include tablet-and-below {
            flex-direction: column;
        }
    }

    .quote {
        justify-content: space-between;
        flex-grow: 1;
        flex-basis: 0;
        gap: 1.5rem;

        box-shadow: 0rem 0.25rem 1rem 0.25rem rgba(black, 0.25);
        padding: 2rem;
    }

    p {
        color: $primary-1;
    }

    h2 {
        align-self: center;

        font-size: 2rem;
        color: $primary-1;
    }

    h3 {
        align-self: flex-end;

        color: $primary-1;
    }
</style>
