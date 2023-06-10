export class DomElement {
  static from(selector: string): DomElement | null {
    const el = document.querySelector(selector) as HTMLElement;
    if (el) {
      return new DomElement(el);
    }
    return null;
  }

  private htmlElement: HTMLElement;
  private parentDom?: DomElement;

  get nativeElement(): HTMLElement {
    return this.htmlElement;
  }

  constructor(tagOrElement: string | HTMLElement) {
    if (tagOrElement instanceof HTMLElement) {
      this.htmlElement = tagOrElement;
    } else {
      this.htmlElement = document.createElement(tagOrElement);
    }
  }

  newChild(childTag: string): DomElement {
    const child = new DomElement(childTag);
    this.htmlElement.appendChild(child.htmlElement);
    this.parentDom = this;
    return child;
  }

  addChild(domElement: DomElement): DomElement {
    domElement.appendTo(this.nativeElement);
    return this;
  }

  clearChildren(): DomElement {
    this.htmlElement.innerHTML = '';
    return this;
  }

  setAttribute(name: string, value?: string | number | null): DomElement {
    if (typeof value !== 'undefined' && value !== '') {
      this.htmlElement.setAttribute(name, value as string);
    }
    return this;
  }

  setStyle(name: string, value?: string | number | null): DomElement {
    if (typeof value !== 'undefined' && value !== '') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (<any>this.htmlElement.style)[name] = value;
    }
    return this;
  }

  addClass(...tokens: string[]): DomElement {
    this.htmlElement.classList.add(...tokens);
    return this;
  }

  removeClass(...tokens: string[]): DomElement {
    this.htmlElement.classList.remove(...tokens);
    return this;
  }

  setText(text: string): DomElement {
    this.htmlElement.innerText = text;
    return this;
  }

  setHtml(html: string): DomElement {
    this.htmlElement.innerHTML = html;
    return this;
  }

  parent(): DomElement | undefined {
    return this.parentDom;
  }

  appendTo(element: HTMLElement): DomElement {
    element.appendChild(this.htmlElement);
    return this;
  }

  appendToBody(): DomElement {
    this.appendTo(document.body);
    return this;
  }

  transform(value: string): DomElement {
    this.setStyle('transform', value);
    return this;
  }

  transition(valueOrDurationInSecond: string | number): DomElement {
    if (typeof valueOrDurationInSecond === 'string') {
      this.setStyle('transition', valueOrDurationInSecond);
    } else if (typeof valueOrDurationInSecond === 'number') {
      this.setStyle('transition', `all ${valueOrDurationInSecond}s`);
    }
    return this;
  }
}
