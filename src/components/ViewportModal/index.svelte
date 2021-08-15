<script>
  import { viewportModalOpen } from '../../store/index.js';

  import { viewport } from '../../constants/index.js';

  export const viewportInfo = viewport;

  function closeModal() {
    viewportModalOpen.update(() => false);
  }
</script>

<style>
  .viewport-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 2rem;
    background-color: black;
    color: white;
  }

  .viewport-modal__close {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    padding: 0;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .viewport-modal__title {
    margin: 0 0 1rem;
    font-size: 2rem;
  }

  .viewport-modal__size {
    font-size: 1.25rem;
  }
</style>

<div class="viewport-modal">
  <button class="viewport-modal__close" on:click={closeModal} title="Close modal">Close</button>

  <h4 class="viewport-modal__title" data-testid="viewport-name">
    viewport-name
  </h4>
  <p class="viewport-modal__size" data-testid="viewport-size">
    {viewportInfo.width} x {viewportInfo.height} (px)
  </p>
</div>