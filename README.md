#Full Swipe React-Native Component

![alt tag](https://raw.githubusercontent.com/natdm/FullSwipe/master/images/FullSwipe_resize.gif)


###Props:
* title
  *  optional string/int
* iconSource
  *  optional uri (overrides 'title')
* height
  *  optional int
* backgroundColor
  *  optional int/string
* menuItems
  *  optional array of objects (see menuItem props) (use rgba for opacity)
* menuBackgroundColor
  *  optional int/string (use rgba for opacity)
* fontSize
  *  optional string
* fontFamily
  *  optional string
* borderRadiusRight
  * optional string
* borderRadiusLeft
  * optional string
* onPress
  *  optional function
* onSwipeOpenAction
  *  optional function - preformed on 'open' swipe
* onSwipeCloseAction
  *  optional function - preformed on 'close' swipe

###menuItem props:

* title
  *  optional string/int
* titleColor
  * optional string
* icon
  *  optional uri
* onPress
  *  optional function

###Example:

```javascript
import FullSwipeComponent from './FullSwipe/FullSwipeComponent.ios'

const wallpaper = 'http://wallpaper.pickywallpapers.com/1280x1024/clean-blurry.jpg';
const reactIcon = 'http://frostney.github.io/talks/react-native/slides/images/react-logo.png';
const gitIcon = 'https://fleep.io/blog/wp-content/uploads/2014/07/github_icon.png';

const listOfItems = [
  {
    iconSource: gitIcon,
    alignIconLeft: true,
    title: "Hello",
    fontSize: 45,
    borderRadiusLeft: 55,
    backgroundColor: 'rgba(255,255,255,.5)',
    menuBackgroundColor: 'rgba(255,255,255,.2)',
    fontFamily: 'Verdana',
    onPress: () => {
      console.log("Hello")
    },
    onSwipeOpenAction: () => {
      console.log("Open function ran!")
    },
    onSwipeCloseAction: () => {
      console.log("You swiped close and your function ran")
    },
    menuItems: [
      {
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      }
    ]
  },
  {
    iconSource: gitIcon,
    alignIconLeft: true,
    title: "Hello",
    fontSize: 45,
    backgroundColor: 'rgba(0,0,0,0)',
    menuBackgroundColor: 'rgba(255,255,255,.2)',
    fontFamily: 'Verdana',
    onPress: () => {
      console.log("Hello")
    },
    onSwipeOpenAction: () => {
      console.log("Open function ran!")
    },
    onSwipeCloseAction: () => {
      console.log("You swiped close and your function ran")
    },
    menuItems: [
      {
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      }
    ]
  },
  {
    title: "Welcome!",
    fontSize: 45,
    backgroundColor: 'rgba(0,0,0,.5)',
    menuBackgroundColor: 'rgba(255,255,255,.5)',
    fontFamily: 'Verdana',
    onPress: () => {
      console.log("Hello")
    },
    onSwipeOpenAction: () => {
      console.log("Open function ran!")
    },
    onSwipeCloseAction: () => {
      console.log("You swiped close and your function ran")
    },
    menuItems: [
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        icon: reactIcon,
        title: "Test",
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      }
    ]
  }
];

var FullSwipe = React.createClass ({
  getInitialState: function () {
    return {
      text: 'Hello from FullSwipe!',
    }
  },

  onPress: function () {
    console.log("Button pressed");
  },

  swipeOpenUpdate: function () {
    this.setState({text: "onSwipeOpenAction worked"})
  },

  swipeCloseUpdate: function () {
    this.setState({text: "onSwipeCloseAction worked"})
  },

  render: function () {
    const CompiledList = listOfItems.map((item, it) => (
      <FullSwipeComponent
        key={it}
        title={item.title}
        height={item.height}
        menuItems={item.menuItems}
        menuBackgroundColor={item.menuBackgroundColor}
        fontSize={item.fontSize}
        fontFamily={item.fontFamily}
        backgroundColor={item.backgroundColor}
        backgroundImage={item.backgroundImage}
        iconSource={item.iconSource}
        alignIconLeft={item.alignIconLeft}
        borderRadiusLeft={item.borderRadiusLeft}
        borderRadiusRight={item.borderRadiusRight}
        onPress={item.onPress}
        onSwipeOpenAction={this.swipeOpenUpdate}
        onSwipeCloseAction={this.swipeCloseUpdate}
      />
    ));
    return (
      <Image style={styles.container}
             source={{uri:wallpaper}}>
        <View style={styles.backdropView}>
          <Text style={styles.headline}>{this.state.text}</Text>
        </View>
        <View style={[{position: 'absolute', bottom: 0}]}>
          {CompiledList}
        </View>
      </Image>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: "cover",
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backdrop: {
    paddingTop: 60,
    width: 320,
    height: 120
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }
});
```

TODO: Unit tests and background image