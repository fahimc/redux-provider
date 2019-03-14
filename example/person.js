class Person extends HTMLElement {
    
    static get observedAttributes(){
        return ['name','age','email'];
    }
    constructor() {
        super();
        this.element = document.createElement('div');
        this.styleElement = document.createElement('style');
        this.styleElement.innerHTML = this.getStyle();
        this.props = {};
        this.element.innerHTML = this.getTemplate();
    }
    connectedCallback() {
        const shadow = this.attachShadow({
            mode: 'open'
        });
        shadow.appendChild(this.styleElement);
        shadow.appendChild(this.element);

         this.render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
       this.props[name] = newValue;
        this.render();
    }
    getStyle() {
        return `
        :host{
            border:1px solid #333;
            display:block;
            width: 100%;
            height: 100%;
            font-family:Arial, Helvetica, sans-serif;
        }
            `;
    }
    render() {
        this.styleElement.innerHTML = this.getStyle();
        this.element.innerHTML = this.getTemplate();
    }
    getTemplate() {
        return `
            <h1>Person</h1>
            <p>name: ${this.props.name}</p>
            <p>age: ${this.props.age}</p>
            <p>email: ${this.props.email}</p>
        `;
    }
}
customElements.define('x-person', Person);