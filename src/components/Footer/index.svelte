<script>
  export const currentYear = new Date().getFullYear();
</script>

<style>
  footer {
    margin-top: 2rem;
    text-align: center;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
    border-top: 1px solid #ccc;
  }

  p {
    margin: 0;
  }

  a {
    color: #337cbd;
  }
</style>

<footer>
  <div class="container">
    <p>See on <a href="https://github.com/jlozovei/viewport" target="_blank" rel="noopener noreferrer">GitHub</p>

    <p>By <a href="https://jlozovei.dev" target="_blank" rel="noopener noreferrer">jlozovei</a> | {currentYear}</p>
  </div>
</footer>