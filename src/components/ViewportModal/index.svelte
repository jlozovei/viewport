<script>
  import { viewportModalOpen } from '../../store/index.js';

  import { viewport, screen, viewportNames } from '../../constants/index.js';

  export const viewportInfo = viewport;
  export const screenInfo = screen;

  const matchingViewport = Object.values(viewportNames).filter(key => {
    const { minWidth, maxWidth } = key;

    if (maxWidth) {
      return minWidth <= viewportInfo.width && maxWidth > viewportInfo.width;
    } else {
      return minWidth <= viewportInfo.width;
    }
  });

  export const currentViewport = matchingViewport[matchingViewport.length - 1];

  let isModalOpen;

  viewportModalOpen.subscribe(value => {
    isModalOpen = value;
  });

  function closeModal() {
    viewportModalOpen.update(() => false);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
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

<svelte:window on:keydown={handleKeydown}/>

<div class="viewport-modal">
  <button class="viewport-modal__close" on:click={closeModal} title="Close modal">Close</button>

  <h4 class="viewport-modal__title" data-testid="viewport-name">
    {currentViewport.name}
  </h4>
  <p class="viewport-modal__size" data-testid="viewport-size">
    Size: {viewportInfo.width} x {viewportInfo.height} (px)
  </p>
  <p class="viewport-modal__size" data-testid="viewport-resolution">
    Resolution: {screenInfo.width} x {screenInfo.height} (px)
  </p>
</div>