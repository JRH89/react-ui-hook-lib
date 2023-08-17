
##Installation

npm install ui-hook-react-lib

##ProgressBar
A customizable progress bar component.

function App() {
  return (
    <div>
      <h1>Progress Bar Example</h1>
      <ProgressBar />
    </div>
  );
}

export default App;

##Button
A set of customizable button components: default, search, menu, submit, and delete.

import React from 'react';
import { Button } from 'ui-hook-react-lib';

function App() {
  return (
    <div>
      <h1>Button Examples</h1>
      <Button text="Default Button" />
      <Button text="Search" className="search" />
      <Button text="Menu" className="menu" />
      <Button text="Submit" className="submit" />
      <Button text="Delete" className="delete" />
    </div>
  );
}

export default App;

##useLocalStorage
A custom hook for managing state in local storage.

import React from 'react';
import { useLocalStorage } from 'ui-hook-react-lib';

function App() {
  const [count, setCount] = useLocalStorage('count', 0);

  return (
    <div>
      <h1>useLocalStorage Example</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;

##Gallery
An autoplay image gallery component.

import React from 'react';
import { Gallery } from 'ui-hook-react-lib';

function App() {
  const items = [
    { imageSrc: 'image1.jpg', caption: 'Image 1' },
    { imageSrc: 'image2.jpg', caption: 'Image 2' },
    // Add more images...
  ];

  const options = {
    autoplay: true,
    interval: 3000,
  };

  return (
    <div>
      <h1>Image Gallery Example</h1>
      <Gallery items={items} options={options} />
    </div>
  );
}

export default App;
