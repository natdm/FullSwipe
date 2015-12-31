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
* onPress
  *  optional function

###menuItem props:

* title
  *  optional string/int
* icon
  *  optional uri
* onPress
  *  optional function

###Example:

```javascript
import FullSwipeComponent from './FullSwipeComponent.ios'

const listOfItems = [
  {
    title: "Crazy options",
    iconSource: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
    fontSize: 22,
    backgroundColor: 'pink',
    onPress: () => {
      console.log("Hello")
    },
    menuItems: [
      {
        title: "Icons",
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        title: "Or text",
        onPress: () => {
          console.log(`Hello from Whats up`)
        }
      },
      {
        title: "Cover colors",
        icon: 'https://cdn0.iconfinder.com/data/icons/large-black-icons/512/Windows_window_interface_microsoft.png',
        onPress: () => {
          console.log(`Hello from Whats up`)
        }
      },
      {
        title: "Functions",
        icon: 'https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w300',
        onPress: () => {
          console.log(`Hello from Whats up`)
        }
      },
    ]
  },
  {
    title: "Customize almost anything..",
    onPress: () => {
      console.log("Hello")
    },
    //iconSource: 'http://web.bilecik.edu.tr/murat-ozalp/files/2015/08/GoLang.png',
    opacity: .7,
    menuItems: [
      {
        title: "Opacity",
        icon: 'http://saqibsomal.com/wp-content/uploads/2015/08/Facebook-icon-5.png',
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        title: "Font Fam",
        icon: 'http://saqibsomal.com/wp-content/uploads/2015/08/Facebook-icon-5.png',
        onPress: () => {
          console.log(`Hello from Hello`)
        }
      },
      {
        title: "Spacing",
        icon: 'http://www.digitalartsonline.co.uk/cmsdata/features/3626921/medium-m-color-688.png',
        onPress: () => {
          console.log(`Hello from Whats up`)
        }
      },
      {
        title: "Font Size",
        icon: 'https://pbs.twimg.com/profile_images/614583061448036352/CBpFkPaz.png',
        onPress: () => {
          console.log("Hello from Linkedin")
        }
      },

    ]
  },
  {
    title: "Just One Item",
    backgroundColor: 'red',
    menuBackgroundColor: 'orange',
    menuItems: [
      {
        title: "Or just have one item that takes up all the space.... Maybe have Info or an About me. Still clickable.",
        onPress: () => {
          console.log(`Hello from Hello`)
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
        onPress={item.onPress}/>
    ));
    return (
      <Image style={styles.container}
             source={{uri:'http://static3.depositphotos.com/1000189/134/i/950/depositphotos_1340581-Green-Grass-Background.jpg'}}>
        <View style={styles.backdropView}>
          <Text style={styles.headline}>Example Full Swipe</Text>
        </View>

        {CompiledList}
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