import React from 'react';

const Examples = props => (
  <div>
    <div className="section-one">
      <b>Default Settings</b>
      <div>
        <label>
          {' '}
          <input type="checkbox" />
          Checkbox
        </label>
      </div>
      <div>
        <label>
          {' '}
          <input name="a" type="radio" />
          Radio 1
        </label>
        <label>
          {' '}
          <input name="b" type="radio" />
          Radio 2
        </label>
      </div>
      <div>
        <button>Button</button>
      </div>
      <div>
        <input type="submit" defaultValue="Submit button" />
      </div>
      <div>
        <a href="#">Regular Link</a>
      </div>
      <h3 tabIndex={0}>Editable text</h3>
      <div>
        <input placeholder="Single line" />
      </div>
      <div>
        <textarea placeholder="Multi line" defaultValue={''} />
      </div>
      <h3>Transitions</h3>
      <div>
        <a href="#" className="transition-test">
          Link with focus transition
        </a>
      </div>
      <div>
        <a href="#" className="transition-test perm">
          Link with permanent focus transition
        </a>
      </div>
      <div tabIndex={0}>
        <a href="#" className="transition-test inner">
          Link with focus transition and outer element that's focusable
        </a>
      </div>
      <div>
        <a href="#" className="transition-test inner">
          Link with focus transition and inner element with focus transition
          <span>&nbsp;</span>
        </a>
      </div>
      <h3>Iframe</h3>
      <iframe
        title="Inline Frame Example"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
        width={300}
        height={200}
      ></iframe>
      <div>
        <div>
          <a href="#" className="transition-test">
            Transitioned link after iframe focus
          </a>
        </div>
      </div>
      <div>
        <a href="#">Regular link before iframe</a>
      </div>
      <iframe
        src="//mdn-samples.mozilla.org/snippets/html/iframe-simple-contents.html"
        width={100}
        height={100}
        frameBorder={0}
      />
      <div>
        <input type="text" placeholder="Regular input after iframe" />
      </div>
      <video controls width={250}>
        <source
          src="//interactive-examples.mdn.mozilla.net/media/examples/flower.webm"
          type="video/webm"
        />
        <source
          src="//interactive-examples.mdn.mozilla.net/media/examples/flower.mp4"
          type="video/mp4"
        />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div>
        <input type="text" placeholder="Item after video" />
      </div>
    </div>
    <div className="section-two">
      <b>
        <i>alwaysActive</i> set to true
      </b>
      <div>
        <div contentEditable="true">Contenteditable explicitly set to true</div>
      </div>
      <div>
        <div contentEditable>Contenteditable</div>
      </div>
      <div>
        <div role="textbox" contentEditable="true">
          Contenteditable with textbox role
        </div>
      </div>
      <h3>
        Focusable <code>&lt;div&gt;</code>s
      </h3>
      <div tabIndex={0}>
        <code>tabindex="0"</code>
      </div>
      <div tabIndex={-1}>
        <code>tabindex="-1"</code>
      </div>
      <div tabIndex={0}>
        <code>tabindex="0"</code>
      </div>
      <h3>Selects</h3>
      <label>
        Select one from drop-down:
        <br />
        <select>
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <label>
        Select one from list:
        <br />
        <select size={5}>
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <label>
        Select multiple:
        <br />
        <select multiple>
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <h3>Other</h3>
      <label>
        data-focus-label with no <i>for</i> attribute:
        <br />
        <input
          data-focus-label
          type="range"
          min={-20}
          max={20}
          defaultValue={0}
        />
      </label>
      <label>
        Bowling score from 0 to 300:
        <br />
        <input type="range" min={0} max={300} defaultValue={0} />
      </label>
      <div>
        <input type="date" defaultValue="2008-09-01" />
      </div>
      <div>
        <input type="time" defaultValue="00:00:00" />
      </div>
      <div>
        <input type="number" placeholder="Number" />
      </div>
      <div>
        <input type="color" title="Color" defaultValue="#00ff00" />
      </div>
      <div>
        <input type="file" title="File" />
      </div>
    </div>
    <h3>FocusOverlay is not called on the elements below</h3>
    <div>
      <label>
        {' '}
        <input type="checkbox" />
        Checkbox
      </label>
    </div>
    <div>
      <label>
        {' '}
        <input name="a" type="radio" />
        Radio 1
      </label>
      <label>
        {' '}
        <input name="b" type="radio" />
        Radio 2
      </label>
    </div>
    <div>
      <button>Button</button>
    </div>
  </div>
);

export default Examples;
