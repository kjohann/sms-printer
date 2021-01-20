import React from 'react';
import parser from 'fast-xml-parser';
import he from 'he';
import profilePic from './noprofile.png'

import MessageView from './MessageView';
import Message from './Message';



const messages = [
  { image: profilePic, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.' },
  { image: profilePic, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas. Nam quis neque hendrerit, dapibus lectus quis, commodo dui. Donec elementum justo sed elit porttitor, vitae commodo nibh fringilla. Nam sit amet sapien eget quam condimentum posuere at a elit.' },
  { image: profilePic, content: 'Nam euismod vulputate tellus in ullamcorper. Etiam ligula nisl, hendrerit eu urna sit amet, molestie lacinia sem.' },
  { image: profilePic, isYou: true, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas. Nam quis neque hendrerit, dapibus lectus quis, commodo dui.' },
  { image: profilePic, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { image: profilePic, isYou: true, content: 'Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.' },
  { image: profilePic, isYou: true, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex.' },
  { image: profilePic, content: 'Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas.' },
  { image: profilePic, content: 'Lorem ipsum.' },
  { image: profilePic, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.' },
  { image: profilePic, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas. Nam quis neque hendrerit, dapibus lectus quis, commodo dui. Donec elementum justo sed elit porttitor, vitae commodo nibh fringilla. Nam sit amet sapien eget quam condimentum posuere at a elit.' },
  { image: profilePic, content: 'Nam euismod vulputate tellus in ullamcorper. Etiam ligula nisl, hendrerit eu urna sit amet, molestie lacinia sem.' },
  { image: profilePic, isYou: true, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas. Nam quis neque hendrerit, dapibus lectus quis, commodo dui.' },
  { image: profilePic, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { image: profilePic, isYou: true, content: 'Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.' },
  { image: profilePic, isYou: true, content: 'Morbi sapien risus, cursus non enim eu, tempor suscipit ex.' },
  { image: profilePic, content: 'Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas.' },
  { image: profilePic, content: 'Lorem ipsum.' }
].map((message, index) => {
  return <Message 
    key={`Message-${index}`} 
    image={message.image}
    content={message.content}
    isYou={message.isYou}
    fallbackIdentifer={message.isYou ? 'G' : 'A'}
  />;
})

let fileReader: FileReader;

const handleFileRead = () => {
  const content = fileReader.result;
  const parsed = parser.parse(content as string, {
    parseAttributeValue: true,
    parseNodeValue: false,
    ignoreAttributes: false,
    parseTrueNumberOnly: true,
    attributeNamePrefix: '',
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),
    tagValueProcessor : (val, tagName) => he.decode(val)
  });

  console.log('done', parsed);
}

const handleFileChosen = (file: Blob) => {
  fileReader = new FileReader();
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);
}

function App() {
  return (
    <div className="App">
      <input
        type="file"
        accept=".xml"
        onChange={e => {
          if (e.target && e.target.files && e.target.files[0]) {
            handleFileChosen(e.target.files[0])
          }
        }}
      />
      {/* <MessageView>
        {messages}
      </MessageView> */}
    </div>
  );
}

export default App;
