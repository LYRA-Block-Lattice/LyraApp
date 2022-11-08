// ver 20221022-1

function invokeServiceWorkerUpdateFlow(registration) {
    if (confirm("New version available, reload?") == true) {
        if (registration.waiting) {
            console.info(`Service worker registrator: Post skip_waiting...`);

            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    }
}

function checkServiceWorkerUpdate(registration) {
    setInterval(() => {
        console.info(`Service worker registrator: Checking for update... (scope: ${registration.scope})`);

        registration.update();
    }, 120 * 1000); // 60000ms -> check each minute
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('/service-worker.js', { updateViaCache: 'none' });

        window.reg = registration; // call update manually later

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration);
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            invokeServiceWorkerUpdateFlow(registration);
                        } else {
                            // otherwise it's the first install, nothing to do
                            console.log('Service worker registrator: Initialized for the first time.')
                        }
                    }
                });
            }
        });

        checkServiceWorkerUpdate(registration);

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.info(`Service worker registrator: Refreshing app... (refreshing: ${refreshing})`);

            if (!refreshing) {
                window.location.reload();
                refreshing = true
            }
        });
    });
}
else {
    console.error(`Service worker registrator: This browser doesn't support service workers.`);
}