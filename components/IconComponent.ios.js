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
    fontFamily: React.PropTypes.string,
    fontWeight: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    backgroundImage: React.PropTypes.string,
    iconSource: React.PropTypes.string,
    opacity: React.PropTypes.number,
    onPress: React.PropTypes.func,
    onSwipeOpenAction: React.PropTypes.func,
    onSwipeCloseAction: React.PropTypes.func
  },
  //width, height, icon, title, titleColor, opacity,
  //onPress, itemWidth, distance, menuBackgroundColor,

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

    const thisOpacity = opacity ? 0 : 1;
    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    const component = (() => {
      if (this.props.icon) {
        return (
          <Image
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity: thisOpacity}]}>
            <Image style={[styles.icon, {width: 50, height: height * .8, opacity: 1}]} source={{uri: icon}}/>
            <Text style={[styles.underMenuItemText, {color: titleColor}]}>{checkedTitle}</Text>
          </Image>
        )
      } else {
        return (
          <View
            ref={component => this._root = component}
            style={[styles.underMenuItemGroup, {width, opacity: thisOpacity}]}>
            <Text
              style={[styles.underMenuItemText, {color: titleColor, height, paddingTop: height * .4}]}>{title}</Text>
          </View>
        )
      }
    })();

    return (
      <TouchableOpacity onPress={onPress}
                        style={[styles.viewStyle, styles.underMenuItem, {borderTopRightRadius, borderBottomRightRadius, borderTopLeftRadius, borderBottomLeftRadius, width: itemWidth, left: distance,}]}>
        {component}
      </TouchableOpacity>
    )
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