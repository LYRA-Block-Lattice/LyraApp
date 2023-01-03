function insertGlobalScript(url)
{
  var element = document.createElement('script');
  element.setAttribute('src', url);
  element.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(element);

  return new Promise((resolve) => {
    element.onload = () => {
      resolve();
    };
  });
}

window.lyraSetProxy = (dotnetHelper) => {
  window.lyraProxy = dotnetHelper;
};

let rrProxy;
export async function onInit(component) {

  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  rrProxy = await getAssemblyExports("ReactRazor.dll");

  await insertGlobalScript('_content/ReactRazor/static/js/main.js');

//    await insertGlobalScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js')
//    await insertGlobalScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js')
//    const hands = new mpHands.Hands({
//        locateFile: (file) => {
//          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}/${file}`;
//        }
//    });
//hands.setOptions({
//selfieMode: true,
//        maxNumHands: 2,
//        modelComplexity: 0,
//        minDetectionConfidence: 0.5,
//        minTrackingConfidence: 0.5
//    });
//hands.onResults(results => onResults(component, results));
//const camera = new Camera(videoElement, {

//    onFrame: async () => {
//    await hands.send({ image: videoElement });
//        },
//        width: 1280,
//        height: 720
//    });
//camera.start();
console.log("home.razor.js started.");
}