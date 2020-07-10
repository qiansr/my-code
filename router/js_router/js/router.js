class Router {
  constructor(options) {
    this.currentUrl = '';
    this.routes = options.routes;
    this.routeCallback = {};
    this.$el = document.getElementById(options.el)
    this.base = options.base;
    this.init()
  }

  updateView(url) {
    console.log(url)
    if(this.base!='hash'&&url){
      this.currentUrl=url;
    }else{
      this.currentUrl = location.hash.slice(1) || '/';
    }
    this.routeCallback[this.currentUrl] && this.routeCallback[this.currentUrl](); 
  }

  routeInit(){
    this.routes.map((e=>{
       this.routeCallback[e.path] =function(){
         this.$el.innerHTML = e.component;
       }.bind(this)
    }))
  }

  bindLink() {
    const allLink = document.querySelectorAll('a[href]');
    for (let i = 0, len = allLink.length; i < len; i++) {
      const current = allLink[i];
      current.addEventListener(
        'click',
        e => {
          e.preventDefault();
          const url = current.getAttribute('href');
          history.pushState({}, null, url);
          this.updateView(url);
        },
        false
      );
    }
  }

  init() {
    console.log(this.$el)
    this.routeInit()
    if(this.base=='hash'){
      window.addEventListener('load', this.updateView.bind(this), false);
      window.addEventListener('hashchange', this.updateView.bind(this), false);
    }else{
      this.bindLink();
      window.addEventListener('popstate', e => {
        this.updateView(window.location.pathname);
      });
      window.addEventListener('load', () => this.updateView('/'), false);
    }
  }
}
