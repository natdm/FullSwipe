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
  *  optional array of objects (see menuItem props)
* menuBackgroundColor
  *  optional int/string
* fontSize
  *  optional string
* opacity
  *  optional int (0 through 1)
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
import FullSwipeComponent from './FullSwipeComponent.ios'

const listOfItems = [
  {
    title: "Slide me >>",
    fontSize: 22,
    onPress: () => {
      console.log("Hello")
    },
    backgroundColor: 'green',
    menuBackgroundColor: 'pink',
    onSwipeOpenAction: () => {console.log("Open function ran!")},
    onSwipeCloseAction: () => {console.log("You swiped close and your function ran")},
    menuItems: [
      {
        title: "Open",
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      }
    ]
  },
  {
    title: "Slide me >>",
    iconSource: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
    fontSize: 22,
    onPress: () => {
      console.log("Hello")
    },
    backgroundColor: 'grey',
    onSwipeOpenAction: () => {console.log("Open function ran!")},
    onSwipeCloseAction: () => {console.log("You swiped close and your function ran")},
    menuItems: [
      {
        title: "Open",
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      }
    ]
  },
  {
    title: "Hello there!",
    iconSource: 'http://www.pd4pic.com/images/flat-right-arrow-line-theme-action-icon.png',
    fontSize: 22,
    opacity: .5,
    onPress: () => {
      console.log("Hello from the second one")
    },
    menuItems: [
      {
        title: "Item One",
        titleColor: 'red',
        onPress: () => {
          console.log(`Hello from item one`)
        }
      },
      {
        title: "Item Two",
        titleColor: 'blue',
        onPress: () => {
          console.log(`Hello from item two`)
        }
      },
      {
        title: "Item Three",
        titleColor: 'green',
        onPress: () => {
          console.log(`Hello from item two`)
        }
      },
      {
        title: "Item Four",
        titleColor: 'orange',
        onPress: () => {
          console.log(`Hello from item two`)
        }
      }
    ]
  }
];

var FullSwipe = React.createClass({
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
        opacity={item.opacity}
        onPress={item.onPress}
        onSwipeOpenAction={item.onSwipeOpenAction}
        onSwipeCloseAction={item.onSwipeCloseAction}
      />
    ));
    return (
      <Image style={styles.container}
             source={{uri:'http://static3.depositphotos.com/1000189/134/i/950/depositphotos_1340581-Green-Grass-Background.jpg'}}>
        <View style={styles.backdropView}>
          <Text style={styles.headline}>Example Full Swipe</Text>
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
    //backgroundColor: '#F5FCFF',
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