#### 自定义组件相关最佳实践


<div class="s-prose js-post-body" itemprop="text">
  <h1>Best practices and rules for custom element constructors</h1>

  <h2>What's safe to do in the constructor</h2>

  <p>In the <code>constructor</code>, it's safe to</p>

  <ul>
    <li>create the <strong>shadow root</strong>;</li>
    <li>create and append <strong>elements</strong> *;</li>
    <li>
      attach event listeners <em>to those elements</em> (scoped to your own
      ShadowDOM);
    </li>
    <li><strong>create</strong> attributes *.</li>
  </ul>

  <h2>What you cannot do in the constructor</h2>

  <p>
    In the <code>constructor</code>, you are
    <strong>not allowed</strong> (amongst other things)
  </p>

  <ul>
    <li>to read any attributes you haven't created beforehand...</li>
    <li>to access child elements...</li>
  </ul>

  <p>
    ...because those might not be present in the non-upgrade case, and
    definitely won't be present when you dynamically create your custom element
    using either <code>document.createElement('my-custom-element')</code> or
    <code>new MyCustomElement</code>.
  </p>

  <h2>What's unwise to do in the <code>constructor</code></h2>

  <p>In the <code>constructor</code>, you probably don't want to</p>

  <ul>
    <li>
      attach event listeners to
      <em>elements outside of the component's shadow DOM</em> (like e.g.
      <code>document</code>, <code>window</code>), because these are the kind of
      listeners you should clean up in your component's
      <code>disconnectedCallback</code> (which will be called when e.g. your
      component is moved in the DOM).
    </li>
  </ul>

  <p>
    Attaching these listeners in the constructor and properly cleaning them up
    in the <code>disconnectedCallback</code> results in missing listeners once
    your component gets removed from (and later re-added) or moved in the DOM.
  </p>

  <h2>*Pitfalls and things to be aware of</h2>

  <p>
    You need to be aware of the custom element lifecycle to not fall into
    otherwise obvious pitfalls, which include:
  </p>

  <ul>
    <li>
      If you add attributes in the <code>constructor</code> and have included
      those in your component's <code>observedAttributes</code>, remember this
      will immediately trigger the <code>attributeChangedCallback</code> for
      those attributes, even if you element is not yet connected (a.k.a.
      <em>in the DOM</em>).
    </li>
    <li>
      If you create and append other custom elements into your component's
      shadow DOM, remember this will trigger those components'
      <code>connectedCallback</code>.
    </li>
  </ul>

  <p>
    In part, these best practices and rules follow
    <a
      href="https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance"
      rel="nofollow noreferrer"
      >https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance</a
    >, in other parts they deviate from recommendations done there in the spec.
  </p>

  <p>
    Specifically <strong>I disagree on the following</strong> (given the scope
    for the listeners is outside the component), for the reasons I gave above.
  </p>

  <blockquote>
    <p>
      <em
        >In general, the constructor should be used to set up initial state and
        default values, <strong>and to set up event listeners</strong> and
        possibly a shadow root.</em
      >
    </p>
  </blockquote>
</div>

