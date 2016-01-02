'use strict';
let Dimensions = require('Dimensions');
let window = Dimensions.get('window');
let React = require('react-native');
let {
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
    let {
      width, height, icon, title, titleColor,
      onPress, itemWidth, distance, opacity,
      borderTopLeftRadius, borderBottomLeftRadius,
      borderTopRightRadius, borderBottomRightRadius
      } = this.props;

    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    const component = (() => {
      if (this.props.icon) {
        return (
          <Image
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity}]}>
            <Image style={[styles.icon, {width: 50, opacity, height: height * .8}]} source={{uri: icon}}/>
            <Text style={[styles.underMenuItemText, {opacity, color: titleColor}]}>{checkedTitle}</Text>
          </Image>
        )
      } else {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity}]}>
            <Text
              style={[styles.underMenuItemText, {color: titleColor, height, opacity, paddingTop: height * .4}]}>{title}</Text>
          </View>
        )
      }
    })();

    var button = this.props.open ? (
      <TouchableOpacity onPress={onPress}
                        style={[styles.viewStyle, styles.underMenuItem, {opacity, borderTopRightRadius, borderBottomRightRadius, borderTopLeftRadius, borderBottomLeftRadius, width: itemWidth, left: distance,}]}>
      {component}
    </TouchableOpacity>) : null;

    return <View style={[{opacity}]}>{button}</View>;
  }
});


let styles = StyleSheet.create({
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
  underMenuItemGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  }
});