const createCode = function() {
    const newEle = document.createElement('div');
    newEle.innerHTML = '<div class="comp-code" id="codeRoot">' +
      ' <div class="comp-code-title">' +
      '   <span>HTML</span>' +
      '   <button type="button" class="comp-code-btn" onclick="closeCode()"><span class="blind">Close</span></button>' +
      ' </div>' +
      ' <pre class="comp-code-pre"><code id="codeCanvas" class="html"></code></pre>' +
      '</div>';
    document.querySelector('body').appendChild(newEle);
  };

  createCode();

  const root = document.querySelector('#codeRoot');
  const container = document.querySelector('#codeCanvas');
  let contents;
  let codeData;

  const openCode = function() {
    root.classList.add('visible');
    contents = document.querySelector('#compContents').innerHTML;
    codeData = hljs.highlightAuto(contents).value;
    container.innerHTML = codeData;
    console.log(codeData);
  };

  const closeCode = function() {
    root.classList.remove('visible');
  }; 
