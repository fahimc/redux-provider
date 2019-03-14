# redux-provider
custom elements implementation of a redux provider. Works with any custom element. No need to modify your custom elements. 

It's a wrapper which provides state changes to and custom element inside its tag. It will call `attributeChangedCallback` when a state changes. 

You can also dispatch actions from your component.

# Basic usage

```html
<redux-provider store="store" map-state-to-props="{list:'peopleList'}">
        <x-person-list></x-person-list>
</redux-provider>
```

## Dependencies

You will need to add `redux` to your project or bundle and include or bundle the `redux-provider` script.

```HTML
<script src="../node_modules/redux/dist/redux.js"></script>
<script src="redux-provider.js"></script>
```

## Setup
The custom element redux provider works with having a `redux` store globally available on the `window`. 

Provide the store's global name into the `store` attribute.

```html
<script>
  window.store = Redux.createStore({});
</script>
<body>
    <redux-provider store="store">
    </redux-provider>
</body>
```

The `store` attribute supports dot notation.

```html
<script>
  window.myApp = {
      store: Redux.createStore({})
  }
</script>
<body>
    <redux-provider store="myApp.store">
    </redux-provider>
</body>
```

## Wrapping a Custom Element Component

You can pass in as many elements you wish inside the `redux-provider` tag. These will all have their props/observable attributes updated when the state changes.  

```html
<redux-provider store="store">
        <x-person-list></x-person-list>
</redux-provider>
```

## State Changes  

The `redux-provider` subscribes to the store and upon updates it executes `attributeChangedCallback` on its children with the state prop name as the name of the attribute changed.

## Mapping States to Props
The component allows for mapping states to properties. To do this you can use the `map-state-to-props` attribute. It takes in a json object of mapped properties. The JSON should be escaped. It can automatically add double quotes around prop names and values.

This example below shows how you can map `peopleList` state to the internal state of `x-person-list` which has a observable attribute called `list`

```html
<redux-provider store="store" map-state-to-props="{list:'peopleList'}">
        <x-person-list></x-person-list>
</redux-provider>
```

## Dispatching Actions from Components
You components which sit inside the  `redux-provider` don't require any special changes. The `redux-provider` element will replace or create a `dispatch` method on its children elements. 

You should create a dispatch method in you component which dispatches a custom event. Ensure the `dispatch` argument is compatible as an action. For example:

```js
dispatch(action) {
    /*action = {
        type: string,
        data1,    
        data2,   
        ... 
    }*/
}

//Implementation
dispatch(action){
    const event = new CustomEvent(action.type,{
        detail: action
    });
    this.dispatchEvent(event);
}
```