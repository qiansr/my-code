const template = document.createElement('template');

template.innerHTML = `
  <h2 style="background:#eee;padding:20px">Hello: <span>World</span></h2>
`

class HelloWorld extends HTMLElement {
  //组件生命周期1
  constructor() {
  	console.log('1-constructor:元素还没填加到document时执行，通常用来初始化状态，事件监听，创建影子DOM')
    super();
    // 将模版内容作为一个子dom添加到 shadow
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector('h2');
    this.$span = this._shadowRoot.querySelector('span');
  }
  
  //组件生命周期 2
  connectedCallback() {
  	console.log('2-connectedCallback:元素被插入到DOM时执行，通常用来获取数据，设置默认属性')
    if(!this.hasAttribute('color')) {
      this.setAttribute('color', 'orange');
    }

    if(!this.hasAttribute('text')) {
      this.setAttribute('text', '1234');
    }

    this._render();
  }
  
  //组件生命周期 3
  disconnectedCallback(){
  	console.log('3-disconnectedCallback:元素从DOM移除时执行，通常用来做清理工作，例如取消事件监听和定时器')
  }

  //组件生命周期 4
  attributeChangedCallback(name, oldVal, newVal) {
  	console.log(`4-attributeChangedCallback:${name}元素监听的属性变化时执行`)
    switch(name) {
      case 'color':
        this._color = newVal;
        break;
      case 'text':
        this._text = newVal;
        break;
    };

    this._render(name);
  }

  //组件生命周期 5
  adoptedCallback(){
  	console.log('5-adoptedCallback:自定义元素被移动到新的document时执行。')
  }


  // 监听属性变化 的方法
  static get observedAttributes() {
    return ['color', 'text'];
  }

  

  _render(name) {
  	console.log(`重渲染${name}操作`)
    this.$headline.style.color = this._color;
    this.$span.innerHTML = this._text;
  }
}

//注册组件
window.customElements.define('hello-world', HelloWorld);