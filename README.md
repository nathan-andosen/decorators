Collection of decorators.

# Getting started

Install:

```
npm install @thenja/decorators --save
```

Import the decorators you want to use:

```javascript
import { event, CustomEventEmitter } from '@thenja/decorators';
```

# Available Decorators

### event

Used to dispatch custom events. Useful when creating web components.

```javascript
import { event, CustomEventEmitter } from '@thenja/decorators';

class FancyButton extends HTMLElement {
  @event() close: CustomEventEmitter;

  closeClickHandler() {
    this.close.emit({ customData: 'here' });
  }
}
```

# Development

``npm run build`` - Compile the typscript files to javascript

``npm run build -- -v <version>`` - Create a distribution build

__-v__ - _(Optional)_ Either __patch__, __minor__ or __major__. Increases the version number in the package.json file.