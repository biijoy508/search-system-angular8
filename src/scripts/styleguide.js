function laddaNerStyleguide() {
  if (location) {
    const utvmiljo = location.host.includes('farmenutv');
    const mobilityguard_utvmiljo = location.host.includes('mgutv');
    const testmiljo = location.host.includes('farmentest');
    const mobilityguard_testmiljo = location.host.includes('mgtest');
    const volymmiljo = location.host.includes('farmenvol');
    const mobilityguard_volymmiljo = location.host.includes('mgvolym');
    const localhost = location.host.includes('localhost');

    if (utvmiljo === true || localhost === true || mobilityguard_utvmiljo === true) {
      console.log('Styleguide laddas från utv');
      const jsUrl = 'https://cdnutv.jordbruksverket.se/designsystem/10.0.11-SNAPSHOT/package/dist/release/sjv-komponentbibliotek.js';
      const cssUrl = 'https://cdnutv.jordbruksverket.se/designsystem/10.0.11-SNAPSHOT/package/dist/release/sjv-komponentbibliotek.css';
      addCSSAndJSToHeadElement(jsUrl, cssUrl, null, null);
    } else if (testmiljo === true || mobilityguard_testmiljo === true) {
      console.log('Styleguide laddas från test');
      const jsUrl = 'https://cdntest.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.js';
      const cssUrl = 'https://cdntest.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.css';
      const jsIntegrity = 'sha384-LE/LIDeIs3wtuGN7qz449hm12WrA/gUYjkrEyH8v1cYfq9Gj9UbzqpkToYMBr5BE';
      const cssIntegrity = 'sha384-jY+pwCnz9yvbAEzJhZHp9DPB1goGCA5iwEYUb8JXyf9+7jKcs+lH5Zz7+qAT0HxM';
      addCSSAndJSToHeadElement(jsUrl, cssUrl, jsIntegrity, cssIntegrity);
    } else if (volymmiljo === true || mobilityguard_volymmiljo === true) {
      console.log('Styleguide laddas från volym');
      const jsUrl = 'https://cdnvolym.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.js';
      const cssUrl = 'https://cdnvolym.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.css';
      const jsIntegrity = 'sha384-LE/LIDeIs3wtuGN7qz449hm12WrA/gUYjkrEyH8v1cYfq9Gj9UbzqpkToYMBr5BE';
      const cssIntegrity = 'sha384-jY+pwCnz9yvbAEzJhZHp9DPB1goGCA5iwEYUb8JXyf9+7jKcs+lH5Zz7+qAT0HxM';
      addCSSAndJSToHeadElement(jsUrl, cssUrl, jsIntegrity, cssIntegrity);
    } else {
      console.log('Styleguide laddas från prod');
      const jsUrl = 'https://cdn.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.js';
      const cssUrl = 'https://cdn.jordbruksverket.se/designsystem/9.1.1/package/dist/release/sjv-komponentbibliotek.css';
      const jsIntegrity = 'sha384-LE/LIDeIs3wtuGN7qz449hm12WrA/gUYjkrEyH8v1cYfq9Gj9UbzqpkToYMBr5BE';
      const cssIntegrity = 'sha384-jY+pwCnz9yvbAEzJhZHp9DPB1goGCA5iwEYUb8JXyf9+7jKcs+lH5Zz7+qAT0HxM';
      addCSSAndJSToHeadElement(jsUrl, cssUrl, jsIntegrity, cssIntegrity);
    }
  }
}

function addCSSAndJSToHeadElement(jsUrl, cssUrl, jsIntegrity, cssIntegrity) {
  const js = document.createElement("script");
  js.type = "text/javascript";
  js.async = false;
  js.defer = true;
  js.src = jsUrl;
  js.innerHTML = null;
  js.id = "styleguideJS";

  const css = document.createElement("link");
  css.rel = "stylesheet"
  css.href = cssUrl;
  css.innerHTML = null;
  css.async = false;
  css.defer = true;
  css.id = "styleguideCSS";

  if (jsIntegrity && cssIntegrity) {
    js.integrity = jsIntegrity;
    js.setAttribute('crossorigin', 'anonymous');

    css.integrity = cssIntegrity;
    css.setAttribute('crossorigin', 'anonymous');
  }

  const headElement = document.getElementsByTagName('head')[0];
  const bodyElement = document.getElementsByTagName('body')[0];
  bodyElement.appendChild(js);
  headElement.appendChild(css);
}

laddaNerStyleguide();
