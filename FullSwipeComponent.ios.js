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
 TODO: Add unit tests
 */

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
      left: this.prevLeft
    };
    this.arrowStyle = {
      opacity: 0
    };
    this.iconOpacity = {
      opacity: 1
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
    this.iconOpacity.opacity = this.state.open ? 1 : 0;
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
      opacity,
      height,
      onPress,
      fontFamily,
      iconSource,
      fontSize,
      backgroundColor,
      menuBackgroundColor,
      letterSpacing,
      } = this.props;

    height = height || 100;
    opacity = opacity || 1;
    fontFamily = fontFamily || 'Avenir Next';
    fontSize = fontSize || 17;
    letterSpacing = letterSpacing || 2;
    backgroundColor = backgroundColor || '#FFF';
    menuBackgroundColor = menuBackgroundColor || '#F2F2F2';
    onPress = onPress || function () {
        console.log("No onPress defined")
      };

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
    let thisOpacity = this.state.open ? 1 : opacity;

    return (
      //TODO: If you delete one, the one below it becomes 'swiped'. Create an swiped bool value to stop this?
      <View style={[styles.underMenu, {backgroundColor: menuBackgroundColor, opacity: thisOpacity}]}>

        {/*   Container component for menu items UNDER the cover   */}

        { menuItems.map((item, it) => {
          let distance = leftDistance();
          //Items under cover
          return (
            <TouchableOpacity key={it} onPress={item.onPress}
                              style={[styles.viewStyle, styles.underMenuItem, {width: itemWidth, left: distance}]}>
              <IconComponent width={itemWidth} height={height} icon={item.icon} title={item.title} backgroundColor={menuBackgroundColor}
                             opacity={this.iconOpacity.opacity}/>
            </TouchableOpacity>
          )}
        )}
        <View
          ref="box"
          style={[styles.viewStyle, {opacity, height, width: window.width}]} {...this.panResponder.panHandlers}>
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
            <View style={[{width: menuWidth, justifyContent: 'center', alignItems: 'center'}]}>

              {iconSource ? (<Image style={[styles.icon, {width: 50, height: height * .8, paddingLeft: menuWidth}]}
                                    source={{uri:iconSource}}/>) : (
                <Text style={[{fontFamily,fontSize,letterSpacing, textAlign: 'center'}]}>{title}</Text>)}
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
    const {width, height, icon, title, opacity, menuBackgroundColor} = this.props;

    let thisOpacity = opacity ? 0 : 1;

    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    return (() => {
      if (this.props.icon) {
        return (
          <Image
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, backgroundColor: menuBackgroundColor, opacity: thisOpacity}]}>
            <Image style={[styles.icon, {width: 50, height: height * .8, opacity: 1}]} source={{uri: icon}}/>
            <Text style={styles.underMenuItemText}>{checkedTitle}</Text>
          </Image>
        )
      } else {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity: thisOpacity}]}>
            <Text
              style={[styles.underMenuItemText, {height, justifyContent: 'center', alignItems: 'center', paddingTop: height * .4}]}>{title}</Text>
          </View>
        )
      }
    })();
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