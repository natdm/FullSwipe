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

  setNativeProps: function (nativeProps) {
    //This is needed to use a component within a touchable component. Using it in IconComponent
    this._root.setNativeProps(nativeProps);
  },

  render: function () {
    let {
      width, height, icon, title, menuBackgroundColor,
      onPress, itemWidth, distance, opacity
      } = this.props;

    const thisOpacity = opacity ? 0 : 1;

    const checkedTitle = title.length < 14 ? title : 'TRUNCATED';

    const component = (() => {
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

    return (
      <TouchableOpacity onPress={onPress}
                        style={[styles.viewStyle, styles.underMenuItem, {width: itemWidth, left: distance}]}>
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
    flex: 1
  },
  underMenuItemGroup: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  }
});