<script>
  import parser from 'ua-parser-js';

  import Footer from './components/Footer/index.svelte';

  export let viewport = {
    width: window.outerWidth,
    height: window.outerHeight,
    pixelRatio: window.devicePixelRatio,
    secure: window.isSecureContext,
    online: window.navigator.onLine
  };

  export let page = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  export let screen = {
    width: window.screen.width * viewport.pixelRatio,
    height: window.screen.height * viewport.pixelRatio,
    orientation: window.screen?.orientation?.type
  };

  export const navigator = {
    userAgent: window.navigator.userAgent,
    vendor: window.navigator.vendor,
    platform: window.navigator.platform,
    language: window.navigator.language,
    logicalProcessors: window.navigator.hardwareConcurrency,
    cookies: window.navigator.cookieEnabled,
    tracking: window.navigator.doNotTrack
  }

  export const userAgentParser = parser(window.navigator.userAgent);

  export const storage = {
    localStorageHasData: window.localStorage.length > 0,
    sessionStorageHasData: window.sessionStorage.length > 0,
    cookieHasData: document.cookie !== ''
  }

  export const location = {
    ssl: window.location.protocol === 'https://'
  };

  function updateViewportSize() {
    viewport = {
      ...viewport,
      pixelRatio: window.devicePixelRatio
    };

    page = {
      ...page,
      width: window.innerWidth,
      height: window.innerHeight
    };

    screen = {
      ...screen,
      width: window.screen.width * viewport.pixelRatio,
      height: window.screen.height * viewport.pixelRatio,
      orientation: window.screen?.orientation?.type
    };
  }

  function updateConnectionStatus() {
    viewport = {
      ...viewport,
      online: window.navigator.onLine
    }
  }
</script>

<style>
  .section {
    padding: 4rem 0;
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
                <td>{viewport.width} x {viewport.height} (px)</td>
              </tr>
              <tr>
                <td>Screen resolution</td>
                <td>{screen.width} x {screen.height} (px)</td>
              </tr>

              {#if screen.orientation}
                <tr>
                  <td>Orientation</td>
                  <td>{screen.orientation}</td>
                </tr>
              {/if}

              <tr>
                <td>Pixel Ratio</td>
                <td>{viewport.pixelRatio}dppx ({viewport.pixelRatio * 100}%)</td>
              </tr>
              <tr>
                <td>Is this context secure?</td>
                <td>{viewport.secure === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Does this page uses SSL?</td>
                <td>{location.ssl === true ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Are you connected to the internet?</td>
                <td>{viewport.online === true ? 'Yes' : 'No'}</td>
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
                <td>{navigator.userAgent}</td>
              </tr>

              {#if navigator.vendor}
              <tr>
                <td>Browser Vendor</td>
                <td>{navigator.vendor}</td>
              </tr>
              {/if}

              <tr>
                <td>Browser Name</td>
                <td>{userAgentParser.browser.name} (v {userAgentParser.browser.major})</td>
              </tr>

              <tr>
                <td>Browser Engine</td>
                <td>{userAgentParser.engine.name} (v {userAgentParser.engine.version})</td>
              </tr>

              <tr>
                <td>Current language</td>
                <td>{navigator.language}</td>
              </tr>

              {#if navigator.logicalProcessors}
              <tr>
                <td>Logical Processors</td>
                <td>{navigator.logicalProcessors}</td>
              </tr>
              {/if}

              {#if navigator.tracking}
              <tr>
                <td>Is DNT (do not track) enabled?</td>
                <td>{navigator.tracking === '1' ? 'Yes' : navigator.tracking}</td>
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
                <td>{navigator.platform}</td>
              </tr>

              <tr>
                <td>Name and version</td>
                <td>{userAgentParser.os.name}, {userAgentParser.os.version}</td>
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
                <td>{navigator.cookies === true ? 'Yes' : 'No'}</td>
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
</div>