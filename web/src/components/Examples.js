import React from 'react';

const Examples = props => (
  <div className="examples">
    <div className="section-one">
      <h2>Common controls</h2>
      <div>
        <label>
          {' '}
          <input type="checkbox" id="control-1" />
          Checkbox
        </label>
      </div>
      <div>
        <label>
          {' '}
          <input name="a" type="radio" id="control-2" />
          Radio 1
        </label>
        <label>
          {' '}
          <input name="b" type="radio" id="control-3" />
          Radio 2
        </label>
      </div>
      <div>
        <button id="control-4">Button</button>
      </div>
      <div>
        <input type="submit" value="Submit button" id="control-5" />
      </div>
      <div>
        <a href="#" id="control-6">
          Regular Link
        </a>
      </div>
      <h2 tabIndex={0} id="control-7">
        Editable text
      </h2>
      <div>
        <input placeholder="Single line input" id="control-8" />
      </div>
      <div>
        <textarea placeholder="Multi line input" id="control-9" value={''} />
      </div>
      <h2>Transitions</h2>
      <div>
        <a href="#" className="transition-test" id="control-10">
          Link with focus transition
        </a>
      </div>
      <div tabIndex={0} id="control-12">
        <a href="#" className="transition-test inner" id="control-13">
          Link with focus transition and outer element that's focusable
        </a>
      </div>
      <div>
        <a href="#" className="transition-test inner" id="control-14">
          Link with focus transition and inner element with focus transition
          <span>&nbsp;</span>
        </a>
      </div>
      <h2>Iframe</h2>
      <iframe
        width={320}
        height={200}
        src="https://www.youtube.com/embed/fEErySYqItI"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        id="control-15"
        title="Inline Frame Example"
      ></iframe>
      <div>
        <a href="#" className="transition-test" id="control-16">
          Transitioned link after iframe focus
        </a>
      </div>
      <div>
        <a href="#">Regular link before iframe</a>
      </div>
      <iframe
        width={320}
        height={200}
        src="https://www.youtube.com/embed/fEErySYqItI"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        id="control-18"
        title="Inline Frame Example"
      ></iframe>
      <div>
        <input
          type="text"
          placeholder="Regular input after iframe"
          id="control-19"
        />
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
        <input type="text" placeholder="Input after video" id="control-20" />
      </div>
    </div>
    <div className="section-two">
      <h2>Content Editables</h2>
      <div>
        <div id="control-21" contentEditable="true">
          Contenteditable explicitly set to true
        </div>
      </div>
      <div>
        <div id="control-22" contentEditable>
          Contenteditable
        </div>
      </div>
      <div>
        <div role="textbox" id="control-23" contentEditable="true">
          Contenteditable with textbox role
        </div>
      </div>
      <h2>
        Focusable <code>&lt;div&gt;</code>s
      </h2>
      <div tabIndex={0} id="control-24">
        <code>tabindex="0"</code>
      </div>
      <div tabIndex={-1} id="control-25">
        <code>tabindex="-1"</code>
      </div>
      <div tabIndex={0} id="control-26">
        <code>tabindex="0"</code>
      </div>
      <h2>Selects</h2>
      <label>
        Select one from drop-down:
        <br />
        <select id="control-27">
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <label>
        Select one from list:
        <br />
        <select size={5} id="control-28">
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <label>
        Select multiple:
        <br />
        <select multiple id="control-29">
          <option>Apple</option>
          <option>Orange</option>
          <option>Banana</option>
        </select>
      </label>
      <h2>Other</h2>
      <div className="same-line">
        <input data-focus-label type="checkbox" id="control-30" />
        <label htmlFor="control-30">data-focus-label checkbox</label>
      </div>
      <div>
        <label>
          data-focus-label with no <code>for</code> attribute:
          <br />
          <input
            data-focus-label
            type="range"
            min={-20}
            max={20}
            value={0}
            id="control-31"
          />
        </label>
      </div>
      <div>
        <label>
          Bowling score from 0 to 300:
          <br />
          <input type="range" min={0} max={300} value={0} id="control-32" />
        </label>
      </div>
      <div>
        <input type="date" value="2008-09-01" id="control-33" />
      </div>
      <div>
        <input type="time" value="00:00:00" id="control-34" />
      </div>
      <div>
        <input type="number" placeholder="Number" id="control-35" />
      </div>
      <div>
        <input type="color" title="Color" value="#00ff00" id="control-36" />
      </div>
      <div>
        <input type="file" title="File" id="control-37" />
      </div>
    </div>
  </div>
);

export default Examples;
