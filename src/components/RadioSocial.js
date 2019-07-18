import React, { memo } from "react";
import { TouchableOpacity, View, StyleSheet, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from "prop-types";

const RadioSocial = props => {
  const { facebook, whatsapp, instagram, twitter } = props;

  const whatsParam =
    "?text=Ol%C3%A1%2C%20venho%20da%2099radios.&phone=" + whatsapp;

  const links = [
    ["fb://profile/" + facebook, "https://www.facebook.com/n/?" + facebook],
    [
      "whatsapp://send" + whatsParam,
      "https://api.whatsapp.com/send" + whatsParam
    ],
    [
      "instagram://user?username=" + instagram,
      "https://instagram.com/_u/" + instagram
    ],
    [
      "twitter://user?screen_name=" + twitter,
      "https://www.twitter.com/" + twitter
    ]
  ];

  // try to open app or url
  const open = i => {
    const link = links[i];
    Linking.canOpenURL(link[0])
      .then(supported => {
        if (supported) {
          Linking.openURL(link[0]);
        } else {
          Linking.openURL(link[1]);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  return (
    <View style={styles.social}>
      {!!facebook && (
        <TouchableOpacity onPress={() => open(0)} style={styles.socialItem}>
          <Icon name="facebook" size={24} color="#c54134" />
        </TouchableOpacity>
      )}
      {!!twitter && (
        <TouchableOpacity onPress={() => open(3)} style={styles.socialItem}>
          <Icon name="twitter" size={24} color="#c54134" />
        </TouchableOpacity>
      )}
      {!!whatsapp && (
        <TouchableOpacity onPress={() => open(1)} style={styles.socialItem}>
          <Icon name="whatsapp" size={24} color="#c54134" />
        </TouchableOpacity>
      )}
      {!!instagram && (
        <TouchableOpacity onPress={() => open(2)} style={styles.socialItem}>
          <Icon name="instagram" size={24} color="#c54134" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  social: {
    height: 50,
    width: "100%",
    paddingHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  socialItem: {
    backgroundColor: "#8a2517",
    borderRadius: 40,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

RadioSocial.propTypes = {
  facebook: PropTypes.string,
  whatsapp: PropTypes.string,
  instagram: PropTypes.string,
  twitter: PropTypes.string
};

export default memo(RadioSocial);
