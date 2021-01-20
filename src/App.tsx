import React from 'react';
import styles from './App.module.scss';
import profilePic from './noprofile.png'

function App() {
  return (
    <div className="App">
      <div className={styles['Message-View']}>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi.
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Nam quis neque hendrerit, dapibus lectus quis, commodo dui
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>

        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi.
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Nam quis neque hendrerit, dapibus lectus quis, commodo dui
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>

        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi.
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Nam quis neque hendrerit, dapibus lectus quis, commodo dui
          </div>
        </div>
        <div className={styles.Message}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div>
          <div className={styles['Message-content']}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tortor sapien, rutrum et turpis eu, congue dapibus mi. Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada.
          </div>
        </div>
        <div className={`${styles.Message} ${styles['Message--right']}`}>
          <div className={styles['Message-sender']}>
            <img src={profilePic} alt="profile pic" />
          </div> 
          <div className={styles['Message-content']}>
          Ut non justo blandit, sollicitudin tellus in, porttitor nunc. Integer volutpat et tellus quis malesuada. Morbi sapien risus, cursus non enim eu, tempor suscipit ex. Pellentesque nunc lorem, ullamcorper id arcu vel, vulputate vestibulum augue. Vestibulum mollis sem vitae nibh egestas mollis. Sed non ligula non purus iaculis egestas
          </div>
        </div>        
      </div>
    </div>
  );
}

export default App;
