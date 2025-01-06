<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">HomePage</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="/habits">Habits</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/pixels">Year in Pixels</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/journal">Journal</a>
                  </li>
            </ul>
        </div>
    </div>
</nav>


<main class="container my-5"> <!-- main so that the footer shows at the end -->
    {@render children()}
</main>

<footer class="footer text-center py-3 bg-light mt-auto">
    <p>&copy; 2025 Habit Tracker. All rights reserved.</p>
</footer>
