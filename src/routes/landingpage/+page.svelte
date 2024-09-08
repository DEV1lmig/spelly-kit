<script>
    import { onMount } from 'svelte';
    import { spring } from 'svelte/motion';
    import { CheckCircle, MessageCircle, Zap } from 'lucide-svelte';

    let inputText = '';
    let correctedText = '';
    let y;
    let innerWidth;
    let innerHeight;

    const cursor = spring({ x: 0, y: 0 }, {
      stiffness: 0.1,
      damping: 0.25
    });

    function correctGrammar() {
      correctedText = inputText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    let mounted = false;
    onMount(() => {
      mounted = true;
    });

    function handleMousemove(event) {
      cursor.set({ x: event.clientX, y: event.clientY });
    }
  </script>

  <svelte:window bind:scrollY={y} bind:innerWidth bind:innerHeight on:mousemove={handleMousemove}/>

  <main class="flex-1">
    <!-- Hero Section with Animations -->
    <section
      class="hero min-h-screen w-full overflow-hidden relative bg-base-200 -z-10"
    >
      <div
        class="absolute inset-0 overflow-hidden"
        style="
          background: radial-gradient(circle at {$cursor.x}px {$cursor.y}px, var(--gradient-start) 0%, var(--gradient-end) 10%);
        "
      >
        {#if mounted}
          {#each Array(50) as _, i}
            <div
              class="absolute rounded-full bg-primary opacity-20"
              style="
                left: {Math.random() * 100}%;
                top: {Math.random() * 100}%;
                width: {Math.random() * 50 + 10}px;
                height: {Math.random() * 50 + 10}px;
                animation: float {Math.random() * 10 + 5}s infinite ease-in-out;
                animation-delay: -{Math.random() * 10}s;
                transform: translateY({y * 0.2 * (i % 5 - 2)}px);
              "
            ></div>
          {/each}
        {/if}
      </div>
      <div class="hero-content text-center relative z-10">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold mb-4" style="transform: translateY({-y * 0.2}px);">
            Perfect Your English with Spelly
          </h1>
          <p class="py-6" style="transform: translateY({-y * 0.1}px); opacity: {1 - y / 500};">
            Spelly uses advanced AI to correct your grammar in real-time. Chat naturally and improve your English effortlessly.
          </p>
          <button class="btn btn-primary mr-2" style="transform: translateY({-y * 0.05}px);">Get Started</button>
          <button class="btn btn-outline" style="transform: translateY({-y * 0.05}px);">Learn More</button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-base-100 -z-10">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div class="grid gap-8 md:grid-cols-3 -z-10">
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <figure class="px-10 pt-10">
              <Zap class="h-24 w-24 text-primary" />
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-2xl">Real-time Corrections</h3>
              <p class="text-lg">Get instant feedback on your grammar as you type.</p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <figure class="px-10 pt-10">
              <MessageCircle class="h-24 w-24 text-primary" />
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-2xl">Natural Conversations</h3>
              <p class="text-lg">Chat naturally while improving your English skills.</p>
            </div>
          </div>
          <div class="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <figure class="px-10 pt-10">
              <CheckCircle class="h-24 w-24 text-primary" />
            </figure>
            <div class="card-body items-center text-center">
              <h3 class="card-title text-2xl">AI-Powered Accuracy</h3>
              <p class="text-lg">Benefit from advanced AI for precise grammar corrections.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="py-20 bg-base-200 -z-10">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">See Spelly in Action</h2>
        <div class="flex flex-col items-center space-y-6 max-w-md mx-auto">
          <p class="text-center text-lg">
            Type a sentence with grammatical errors and watch Spelly correct it in real-time.
          </p>
          <input
            type="text"
            placeholder="Enter a sentence with errors"
            class="input input-bordered w-full text-lg"
            bind:value={inputText}
          />
          <button on:click={correctGrammar} class="btn btn-primary w-full text-lg">Correct Grammar</button>
          <div class="alert alert-success w-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span class="text-lg">{correctedText || 'Corrected sentence will appear here.'}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call-to-Action Section -->
    <section class="py-20 bg-primary text-primary-content w-full -z-10">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4">Ready to Perfect Your English?</h2>
          <p class="mb-8 max-w-md mx-auto text-xl">
            Join thousands of users who are improving their English grammar with Spelly.
          </p>
          <button class="btn btn-secondary btn-lg text-xl">Sign Up for Free</button>
        </div>
      </div>
    </section>
  </main>

  <style>
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
  </style>
