'use strict';
var Dimensions = require('Dimensions');
var window = Dimensions.get('window');
var React = require('react-native');
var {
  StyleSheet,
  View,
  PanResponder,
  LayoutAnimation,
  Text,
  Image,
  TouchableOpacity
  } = React;

/*
 FullSwipe takes these attributes:
 text (title)
 menuItems(array of objects...)
 onPress (action when pressed)
 fontFamily
 fontSize,
 backgroundColor,
 menuBackgroundColor (background color of underlying menu)

 menuItem Objects have these attributes:
 title (displayed below icon, if icon - must be 14 or less characters)
 icon (link to image)
 onPress (action when pressed)

 menuItems will only show the first items four in an array. Not able to scroll yet.
 If it has more than four, it errors and shows 0.

 TODO: for cover: add  backgroundImage
 */
//Example:

//<FullSwipeComponent
//  title={"Test Full Swipe"}
//  height={item.height}
//  menuItems={menuItems}
//  menuBackgroundColor={item.menuBackgroundColor}
//  fontSize={item.fontSize}
//  fontFamily={item.fontFamily}
//  backgroundColor={item.backgroundColor}
//  backgroundImage={item.backgroundImage}
//  onPress={() => {
//                    console.table(list);
//                  }}/>

let menuWidth = window.width * .9;
let forceMin = menuWidth * .6;
let forceMinClose = menuWidth * .3;

export default React.createClass({
  getInitialState: function () {
    return {
      open: false
    }
  },

  componentWillMount: function () {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStart,
      onPanResponderGrant: this.handleGrant,
      onMoveShouldSetPanResponder: this.handleStart,
      onPanResponderMove: this.handleMove,
      onPanResponderRelease: this.handleEnd

    });
    this.prevLeft = 0;
    this.boxStyle = {
      left: this.prevLeft,
    };
    this.arrowStyle = {
      opacity: 0,
    };
  },

  componentDidMount: function () {
    this.updatePosition();
  },

  handleStart: function (e, gestureState) {
    return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10
  },

  handleGrant: function () {
  },

  handleEnd: function (e, gestureState) {
    this.boxStyle.left = this.state.open ? menuWidth : 0;
    this.updatePosition();
    this.prevLeft += this.boxStyle.left;
  },

  updatePosition: function () {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.refs.box.setNativeProps({
      style: this.boxStyle
    });
    //this.refs.arrow.setNativeProps({
    //  style: this.arrowStyle
    //})
  },

  handleMove: function (e, gestureState) {

    var panningRight = gestureState.dx > 10;
    if (panningRight && this.state.open) {
      return;
    }
    if (!panningRight && !this.state.open) {
      return;
    }

    if (panningRight && !this.state.open) {
      //If opening
      this.boxStyle.left = this.prevLeft + gestureState.dx;
      if (Math.abs(gestureState.dx) > forceMin) {
        var open = !this.state.open;
        this.setState({open});
        this.boxStyle.left = open ? menuWidth : 0;
        //this.arrowStyle.opacity = open ? 1 : 0;
      }
    }

    //If closing
    if (Math.abs(gestureState.dx) > forceMinClose) {
      this.boxStyle.left = this.prevLeft + gestureState.dx;
      var open = !this.state.open;
      this.setState({open});
      this.boxStyle.left = open ? menuWidth : 0;
      //this.arrowStyle.opacity = open ? 1 : 0;
    }
    this.updatePosition();
  },

  render: function () {
    let {
      title,
      height,
      onPress,
      fontFamily,
      fontSize,
      backgroundColor,
      backgroundImage,
      menuBackgroundColor,
      letterSpacing,
      } = this.props;

    height = height || 100;
    fontFamily = fontFamily || 'Avenir Next';
    fontSize = fontSize || 17;
    letterSpacing = letterSpacing || 2;
    backgroundColor = backgroundColor || '#FFF';
    menuBackgroundColor = menuBackgroundColor || '#F2F2F2';

    backgroundImage = backgroundImage || 'http://public.media.smithsonianmag.com/legacy_blog/dirt_threeboy.jpg';
    //TODO: BackgroundImage not working. {/*  <Image source={{uri:backgroundImage}} style={[{resizeMode: 'cover'}]}/> */}
    const menuItems = (() => {
      if (!this.props.menuItems) {
        return [];
      } else if (this.props.menuItems.length > 4) {
        return this.props.menuItems.filter((item, it) => it <= 3)
      } else {
        return this.props.menuItems
      }
    })();

    let itemWidth = menuWidth / menuItems.length;

    function getDistance(width) {
      var i = 0;
      return function () {
        return width * i++
      }
    }

    let leftDistance = getDistance(itemWidth);

    return (
      //TODO: If you delete one, the one below it becomes 'swiped'. Create an swiped bool value to stop this?
      <View style={[styles.underMenu, {backgroundColor: menuBackgroundColor}]}>

        {/*   Container component for menu items UNDER the cover   */}

        { menuItems.map((item, it) => {
          let distance = leftDistance();
          //Items under cover
          return (
            <TouchableOpacity key={it} onPress={item.onPress}
                              style={[styles.viewStyle, styles.underMenuItem, {width: itemWidth, left: distance}]}>
              <IconComponent width={itemWidth} height={height} icon={item.icon} title={item.title}/>
            </TouchableOpacity>
          )
        })}
        <View
          ref="box"
          style={[styles.viewStyle, {height, width: window.width}]} {...this.panResponder.panHandlers}>
          {/*   Container for cover */}

          <TouchableOpacity
            style={[styles.viewStyle,styles.menuClickable,{height, backgroundColor}]}
            onPress={() => {
      if(this.state.open) {
        console.log("State open");
      } else if (!this.state.open) {
        onPress();
      }
    }}>
            <View>
              <Text style={[{fontFamily,fontSize,letterSpacing, opacity: 1}]}>{title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var IconComponent = React.createClass({

  setNativeProps: function (nativeProps) {
    //This is needed to use a component within a touchable component. Using it in IconComponent
    this._root.setNativeProps(nativeProps);
  },

  render: function () {
    const {width, height, icon, title} = this.props;

    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    const layout = (() => {
      if (this.props.icon) {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width}]}>
            <Image style={[styles.icon, {width: 50, height: height * .8}]} source={{uri: icon}}/>
            <Text style={styles.underMenuItemText}>{checkedTitle}</Text>
          </View>
        )
      } else {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width}]}>
            {/*<Text style={styles.underMenuItemText}>{item.title}</Text>*/}
            <Text style={[styles.underMenuItemText, {marginTop: height * .4}]}>{title}</Text>
          </View>
        )
      }
    })();
    return layout;
  }
});

var styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  underMenu: {
    flexDirection: 'row',
  },
  underMenuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  underMenuItemText: {
    textAlign: 'center',
    flex: 1
  },
  underMenuItemGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuClickable: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftArrow: {
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    left: 1,
    height: 189 / 5,
    width: 98 / 5
  },
  icon: {
    resizeMode: 'contain',

  }
});
