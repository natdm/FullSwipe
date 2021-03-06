'use strict';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const React = require('react-native');
const {
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

 TODO: Add unit tests
 TODO: Bug, fix swipe open and close functions to run when swiped fully open.
 TODO: Optimize for horizontal view.
 */

const menuWidth = window.width * .9;
const forceMin = menuWidth * .6;
const forceMinClose = menuWidth * .3;

let lastState = false;

import IconComponent from './components/IconComponent'

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    height: React.PropTypes.number,
    menuItems: React.PropTypes.arrayOf(React.PropTypes.object),
    menuBackgroundColor: React.PropTypes.string,
    fontSize: React.PropTypes.number,
    fontFamily: React.PropTypes.string,
    fontWeight: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    backgroundImage: React.PropTypes.string,
    icon: React.PropTypes.string,
    borderRadiusLeft: React.PropTypes.number,
    borderRadiusRight: React.PropTypes.number,
    onPress: React.PropTypes.func,
    onSwipeOpenAction: React.PropTypes.func,
    onSwipeCloseAction: React.PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      height: 100,
      menuBackgroundColor: '#F2F2F2',
      fontSize: 17,
      fontFamily: 'Avenir Next',
      backgroundColor: '#FFF',
      borderRadiusLeft: 0,
      borderRadiusRight: 0,
      letterSpacing: 2,
      onPress: function () {
        console.log("No onPress defined")
      },
      onSwipeOpenAction: function() {
        console.log("No onSwipeOpenAction defined")
      },
      onSwipeCloseAction: function() {
        console.log("No onSwipeCloseAction defined")
      }
    }
  },

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
    console.log(`Open: ${this.state.open}`);
  },

  handleMove: function (e, gestureState) {

    const panningRight = gestureState.dx > 10;
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
        let open = !this.state.open;
        this.setState({open});
        this.boxStyle.left = open ? menuWidth : 0;
      }
    }

    //If closing
    if (Math.abs(gestureState.dx) > forceMinClose) {
      this.boxStyle.left = this.prevLeft + gestureState.dx;
      let open = !this.state.open;
      this.setState({open});
      this.boxStyle.left = open ? menuWidth : 0;
    }
    this.updatePosition();

    //This is to make sure the onSwipeOpen and onSwipeClose actions run
    // when you've encountered a FULL swipe, not partial.
    if(this.state.open && lastState != this.state.open) {
      this.props.onSwipeOpenAction();
      lastState = !lastState
    } else if (!this.state.open && lastState === true) {
      this.props.onSwipeCloseAction();
      lastState = !lastState
    }
  },

  render: function () {
    const {
      title,height,onPress,fontFamily,icon,
      fontSize,backgroundColor,menuBackgroundColor,letterSpacing, fontWeight,
      borderRadiusLeft, borderRadiusRight, iconLeft
      } = this.props;
    const borderTopLeftRadius = borderRadiusLeft;
    const borderBottomLeftRadius = borderRadiusLeft;
    const borderTopRightRadius = borderRadiusRight;
    const borderBottomRightRadius = borderRadiusRight;

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

    const itemWidth = menuWidth / menuItems.length;

    function getDistance(width) {
      let i = 0;
      return function () {
        return width * i++
      }
    }


    const leftDistance = getDistance(itemWidth);

    return (
      <View style={[styles.underMenu, {backgroundColor: this.state.open ? menuBackgroundColor : 'rgba(0,0,0,0)', borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius}]}>

        {/*   Container component for menu items UNDER the cover   */}

        { menuItems.map((item, it) => {
            let distance = leftDistance();
            //Items under cover
            return (
              <IconComponent key={it}
                             onPress={item.onPress}
                             itemWidth={itemWidth}
                             height={height}
                             icon={item.icon}
                             title={item.title}
                             titleColor={item.titleColor}
                             backgroundColor={menuBackgroundColor}
                             distance={distance}
                             borderTopLeftRadius={borderTopLeftRadius}
                             borderBottomLeftRadius={borderBottomLeftRadius}
                             borderTopRightRadius={borderTopRightRadius}
                             borderBottomRightRadius={borderBottomRightRadius}
                             opacity={this.state.open ? 1 : 0}
                             open={this.state.open}
                             fontSize={item.fontSize}
              />
            )
          }
        )}
        <View ref="box"
              style={[styles.viewStyle, {height, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius, width: window.width, backgroundColor: this.state.open ? 'rgba(255,255,255,0.5)' : backgroundColor}]} {...this.panResponder.panHandlers}>
          {/*   Container for cover */}

          <TouchableOpacity
            style={[styles.backdroppable, styles.menuClickable,{height, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius}]}
            onPress={() => {
              if (!this.state.open) {
                onPress();
              }
            }}>

            <View style={[{width: menuWidth,  borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius}]}>
              {icon ?
                (<Image style={[styles.icon, {height: height * .9, paddingLeft: menuWidth}]} source={{uri:icon}}/>)
                :
                (<Text style={[{fontFamily, fontWeight, fontSize, letterSpacing, textAlign: 'center'}]}>{title}</Text>)
              }
            </View>

          </TouchableOpacity>

        </View>
      </View>
    );
  }
});


const styles = StyleSheet.create({
  menuClickable: {
    width: window.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
  underMenu: {
    flexDirection: 'row',
  },
  backdroppable: {
    backgroundColor: 'rgba(0,0,0,0)',
  }
});