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

export async function onInit(component) {
  window.rrComponent = component;

  const { getAssemblyExports } = await globalThis.getDotnetRuntime(0);
  window.rrProxy = await getAssemblyExports("ReactRazor.dll");

  await insertGlobalScript('_content/ReactRazor/static/js/main.js');

  console.log("home.razor.js started.");
}