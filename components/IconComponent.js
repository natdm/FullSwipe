'use strict';
const Dimensions = require('Dimensions');
const window = Dimensions.get('window');
const React = require('react-native');
const {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
  } = React;

export default React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    height: React.PropTypes.number,
    menuItems: React.PropTypes.arrayOf(React.PropTypes.object),
    fontSize: React.PropTypes.number,
    opacity: React.PropTypes.number,
    fontFamily: React.PropTypes.string,
    fontWeight: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    backgroundImage: React.PropTypes.string,
    iconSource: React.PropTypes.string,
    onPress: React.PropTypes.func,
    onSwipeOpenAction: React.PropTypes.func,
    onSwipeCloseAction: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      title: '',
      opacity: 1,
      onPress: () => {
        console.log("onPress pressed!");
      }
    }
  },

  setNativeProps: function (nativeProps) {
    //This is needed to use a component within a touchable component. Using it in IconComponent
    this._root.setNativeProps(nativeProps);
  },


  render: function () {
    const {
      width, height, icon, title, titleColor,
      onPress, itemWidth, distance, opacity, fontSize,
      borderTopLeftRadius, borderBottomLeftRadius,
      borderTopRightRadius, borderBottomRightRadius
      } = this.props;

    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    const component = (() => {
      if (icon && title) {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity}]}>
            <Image style={[styles.icon, {width: 50, opacity, height: height * .8}]} source={{uri: icon}}/>
            <Text style={[styles.underMenuItemText, {opacity, color: titleColor}]}>{checkedTitle}</Text>
          </View>
        )
      } else if (!icon && title)  {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, styles.justTitleGroup, {width, opacity}]}>
            <Text
              style={[styles.underMenuItemText,styles.justTitle, {opacity, fontSize, color: titleColor, height}]}>{title}</Text>
          </View>
        )
      } else if (icon && !title) {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity}]}>
            <Image style={[styles.icon, {width: 50, opacity, height}]} source={{uri: icon}}/>
          </View>
        )
      } else {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity}]}>
          </View>
        )
      }
    })();

    let button = this.props.open ? (
      <TouchableOpacity onPress={onPress}
                        style={[styles.viewStyle, styles.underMenuItem, {opacity, borderTopRightRadius, borderBottomRightRadius, borderTopLeftRadius, borderBottomLeftRadius, width: itemWidth, left: distance,}]}>
        {component}
      </TouchableOpacity>) : null;

    return( <View>{button}</View>);
  }
});


const styles = StyleSheet.create({
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
    flex: 1,
  },
  justTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  justTitleGroup: {
    alignItems: 'center'
  },
  underMenuItemGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});