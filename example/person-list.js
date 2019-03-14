class PersonList extends HTMLElement {

    static get observedAttributes() {
        return ['list'];
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
        switch(name){
            case 'list':
                 this.props[name] = JSON.parse(newValue);
                 break;
                 default:
                 this.props[name] = newValue;
                 break;
                }
                this.render();
    }
    getStyle() {
        return `
        :host {
            font-family: Arial, Helvetica, sans-serif;
        }
        `;
    }
    getPeople(){
        let template = ``;
        if(this.props.list){
            console.log(this.props.list);
    this.props.list.forEach(item => {
        template += `<x-person name="${item.name}" email="${item.email}" age="${item.age}"></x-person>`
    });
        }
        return template;
    }
    render(){
         this.styleElement.innerHTML = this.getStyle();
         this.element.innerHTML = this.getTemplate();
    }
    getTemplate() {
        return `
            <h1>Person List</h1>
            ${this.getPeople()}
        `;
    }
}
customElements.define('x-person-list', PersonList);