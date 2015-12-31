#Full Swipe React-Native Component

![alt tag](https://raw.githubusercontent.com/natdm/FullSwipe/master/images/FullSwipe_resize.gif)


Props:
* title               (optional)(string/int)
* iconSource          (optional)(uri)(overrides 'title')
* height              (optional)(int)
* menuItems           (optional)(array of objects (see menuItem props))
* menuBackgroundColor (optional)(int/string)
* fontSize            (optional)(string)
* fontFamily          (optional)(string)
* backgroundColor     (optional)(int/string)
* onPress             (optional)(function)

menuItem props:

* title   (optional)(string/int)
* icon    (optional)(uri)
* onPress (optional)(function)

###Example:

```javascript
import FullSwipeComponent from './FullSwipeComponent.ios'

const listOfItems = [
  {
    title: "Crazy options",
    iconSource:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
    fontSize: 22,
    fontFamily: '',
    backgroundColor: 'pink',
    onPress: () => {console.log("Hello")},
    menuItems: [
      {
        title: "Linux",
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/2000px-Tux.svg.png',
        onPress: () => {console.log(`Hello from Hello`)}
      },
      {
        title: "OS X!",
        icon: 'http://www.clipartbest.com/cliparts/KTj/e86/KTje86yAc.png',
        onPress: () => {console.log(`Hello from Whats up`)}
      },
      {
        title: "Windows",
        icon: 'https://cdn0.iconfinder.com/data/icons/large-black-icons/512/Windows_window_interface_microsoft.png',
        onPress: () => {console.log(`Hello from Whats up`)}
      },
      {
        title: "Unix",
        icon: 'http://megaicons.net/static/img/icons_sizes/8/178/512/operating-sysytems-unix-icon.png',
        onPress: () => {console.log(`Hello from Whats up`)}
      },
      {
        title: "Chromebook",
        icon: 'https://lh3.ggpht.com/O0aW5qsyCkR2i7Bu-jUU1b5BWA_NygJ6ui4MgaAvL7gfqvVWqkOBscDaq4pn-vkwByUx=w300',
        onPress: () => {console.log(`Hello from Whats up`)}
      },
    ]
  },
  {
    title: "Default Options",
    onPress: () => {console.log("Hello")},
    menuItems: [
      {
        title: "Facebook",
        icon: 'http://saqibsomal.com/wp-content/uploads/2015/08/Facebook-icon-5.png',
        onPress: () => {console.log(`Hello from Hello`)}
      },
      {
        title: "Medium",
        icon: 'http://www.digitalartsonline.co.uk/cmsdata/features/3626921/medium-m-color-688.png',
        onPress: () => {console.log(`Hello from Whats up`)}
      },
      {
        title: "LinkedIn",
        icon: 'https://pbs.twimg.com/profile_images/614583061448036352/CBpFkPaz.png',
        onPress: () => {console.log("Hello from Linkedin")}
      },

    ]
  },
  {
    title: "Just One Item",
    menuItems: [
      {
        title: "Something else",
        onPress: () => {console.log(`Hello from Hello`)}
      }
    ]
  }
];

var FullSwipe = React.createClass({
  render: function() {
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
      onPress={item.onPress}/>
    ));
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Example Full Swipe
        </Text>
        {CompiledList}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
```

TODO: Unit tests and background image