<script>
  import * as Bowser from "bowser";

  import { viewportModalOpen } from './store/index.js';

  import Footer from './components/Footer/index.svelte';
  import ViewportModal from './components/ViewportModal/index.svelte';

  import { viewport, screen, navigator } from './constants/index.js';

  let isModalOpen;

  viewportModalOpen.subscribe(value => {
    isModalOpen = value;
  });

  export let viewportInfo = viewport;
  export let screenInfo = screen;
  export const navigatorInfo = navigator;

  export let page = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  export const userAgentParser = Bowser.parse(window.navigator.userAgent);

  export const storage = {
    localStorageHasData: window.localStorage.length > 0,
    sessionStorageHasData: window.sessionStorage.length > 0,
    cookieHasData: document.cookie !== ''
  }

  export const location = {
    ssl: window.location.protocol === 'https://'
  };

  function openModal() {
    viewportModalOpen.update(() => true);
  }

  function updateViewportSize() {
    viewportInfo = {
      ...viewport,
      pixelRatio: window.devicePixelRatio
    };

    page = {
      ...page,
      width: window.innerWidth,
      height: window.innerHeight
    };

    screenInfo = {
      ...screen,
      width: window.screen.width * viewportInfo.pixelRatio,
      height: window.screen.height * viewportInfo.pixelRatio,
      orientation: window.screen?.orientation?.type
    };
  }

  function updateConnectionStatus() {
    viewportInfo = {
      ...viewport,
      online: window.navigator.onLine
    }
  }
</script>

<style>
  .section {
    padding: 4rem 0;
  }

  .section__button {
    padding: 1rem;
    background-color: black;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    color: white;
    cursor: pointer;
  }

  .section--headline {
    background-color: #337cbd;
    color: white;
  }

  .section--headline img {
    display: block;
    width: 7.5rem;
    margin-bottom: 2rem;
    object-fit: contain;
  }

  .section--headline a {
    color: white;
    font-weight: bold;
  }

  .section--headline button {
    margin-top: 2rem;
  }

  .section--info .section__grid {
    margin: 0 -1rem;
  }

  .section--info .section__panel {
    padding: 1rem;
  }

  @media screen and (min-width: 48rem) {
    .section--headline .section__text {
      max-width: 80%;
    }
  }
</style>

<svelte:window
  on:resize={updateViewportSize}
  on:online={updateConnectionStatus}
  on:offline={updateConnectionStatus}
/>

<div class="page">
  <div class="section section--headline">
    <div class="container">
      <div class="section__text">
        <img src="jlozovei.svg" alt="jlozovei" />
        <h1>What is my viewport?</h1>

        <p>Some useful information about your current viewport, browser and OS.</p>
        <p>These data is already inside your browser, and it's collected using the <code>window</code>, <code>navigator</code>, <code>screen</code>, <code>localStorage</code>, <code>sessionStorage</code> and <code>document.cookie</code> objects.</p>
        <p>For more information about these objects, take a look on <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window" target="_blank" rel="noopener noreferrer">MDN documentation</a>.</p>

        <button class="section__button" on:click={openModal}>See viewport size</button>
      </div>
    </div>
  </div>

  <div class="section section--info">
    <div class="container">
      <div class="section__grid">
        <div class="section__panel">
          <h2>Viewport info</h2>
          <table>
            <tbody>
              <tr>
                <td>Page size</td>
                <td>{page.width} x {page.height} (px)</td>
              </tr>
              <tr>
                <td>Window total size</td>
                <td>{viewportInfo.width} x {viewportInfo.height} (px)</td>
              </tr>
              <tr>
                <td>Screen resolution</td>
                <td>{screenInfo.width} x {screenInfo.height} (px)</td>
              </tr>

              {#if screenInfo.orientation}
                <tr>
                  <td>Orientation</td>
                  <td>{screenInfo.orientation}</td>
                </tr>
              {/if}

              <tr>
                <td>Pixel Ratio</td>
                <td>{viewportInfo.pixelRatio}dppx ({viewportInfo.pixelRatio * 100}%)</td>
              </tr>
              <tr>
                <td>Is this context secure?</td>
                <td>{viewportInfo.secure === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Does this page uses SSL?</td>
                <td>{location.ssl === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Are you connected to the internet?</td>
                <td>{viewportInfo.online === true ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section__panel">
          <h2>General Browser info</h2>
          <table>
            <tbody>
              <tr>
                <td>User Agent</td>
                <td>{navigatorInfo.userAgent}</td>
              </tr>

              {#if navigatorInfo.vendor}
              <tr>
                <td>Browser Vendor</td>
                <td>{navigatorInfo.vendor}</td>
              </tr>
              {/if}

              <tr>
                <td>Browser Name</td>
                <td>{userAgentParser.browser.name} (v {userAgentParser.browser.version})</td>
              </tr>

              <tr>
                <td>Browser Engine</td>
                <td>{userAgentParser.engine.name}</td>
              </tr>

              <tr>
                <td>Current language</td>
                <td>{navigatorInfo.language}</td>
              </tr>

              {#if navigatorInfo.logicalProcessors}
              <tr>
                <td>Logical Processors</td>
                <td>{navigatorInfo.logicalProcessors}</td>
              </tr>
              {/if}

              {#if navigatorInfo.tracking}
              <tr>
                <td>Is DNT (do not track) enabled?</td>
                <td>{navigatorInfo.tracking === '1' ? 'Yes' : navigatorInfo.tracking}</td>
              </tr>
              {/if}
            </tbody>
          </table>
        </div>

        <div class="section__panel">
          <h2>OS info</h2>
          <table>
            <tbody>
              <tr>
                <td>Platform</td>
                <td>
                  {userAgentParser.platform.vendor}&nbsp;

                  {#if userAgentParser.platform.type === 'desktop'}
                    <span role="img" data-label="Desktop" title="Desktop">🖥️</span>
                  {:else}
                    <span role="img" data-label="Mobile" title="Mobile">📱</span>
                  {/if}
                </td>
              </tr>

              <tr>
                <td>Name and version</td>
                <td>
                  {userAgentParser.os.name}
                  {userAgentParser.os.version}
                  {#if userAgentParser.os.versionName}
                    {userAgentParser.os.versionName}
                  {/if}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section__panel">
          <h2>Browser storage info</h2>
          <table>
            <tbody>
              <tr>
                <td>Can use cookies?</td>
                <td>{navigatorInfo.cookies === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Is there any cookie stored?</td>
                <td>{storage.cookieHasData === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Is there some data in localStorage?</td>
                <td>{storage.localStorageHasData === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Is there some data in sessionStorage?</td>
                <td>{storage.sessionStorageHasData === true ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Footer />

  {#if isModalOpen}
    <ViewportModal />
  {/if}
</div>