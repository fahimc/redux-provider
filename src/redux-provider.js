class ReduxProvider extends HTMLElement {
    constructor(){
        super();
        this.onStateChangeHandler = this.onStateChange.bind(this);
        this.previousState = {};
        this.store = {};
        this.stateMapper = {};
        this.storeName = '';
        this.onDOMLoadedHandler = () => { this.onDOMLoaded()};
    }
    static get observedAttributes(){
        return ['store', 'map-state-to-props'];
    }
    connectedCallback(){
        document.addEventListener('DOMContentLoaded', this.onDOMLoadedHandler)
    }
    disconnectedCallback(){
        this.store.unsubscribe(this.onStateChangeHandler);
        document.removeEventListener('DOMContentLoaded', this.onDOMLoadedHandler)   
    }
    onDOMLoaded(){
        this.updateChildren();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'store':
            this.storeName = newValue;
                const arr = this.storeName.split('.');
                this.store = arr.reduce((o, i) => {return o ? o[i] : null}, window);
                this.store.subscribe(this.onStateChangeHandler);
                this.previousState = this.store.getState();
            break;
            case 'map-state-to-props' :
                let obj = newValue.replace(/\'/gm, '"').replace(/([a-zA-z0-9\_\-\$\s]+)\:/igm, '"$1":');
                this.stateMapper = JSON.parse(obj)
            break;
        }
    }
    updateChildren(){
        Array.from(this.children).forEach((child) => {
            if (child.attributeChangedCallback) {
                const childDispatch = child.dispatch;
                child.dispatch = (obj) => {
                    if (this.store) {
                        this.store.dispatch(obj);
                    } else {
                        childDispatch(obj)
                    }
                }
            }
        });
    }
    onStateChange(state){
      if(this.stateMapper) {
          const state = this.store.getState();
          Object.keys(this.stateMapper).forEach((key) =>{
            const obj = this.stateMapper[key];
              const previousValue = obj.split('.').reduce((o, i) => { return o ? o[i] : null }, this.previousState);
              const value = obj.split('.').reduce((o, i) => { return o ? o[i] : null }, state);
              Array.from(this.children).forEach((child )=> {
                  if (child.attributeChangedCallback) child.attributeChangedCallback(key, previousValue, JSON.stringify(value))
                });
            });
      }  
    }
}
customElements.define('redux-provider', ReduxProvider);